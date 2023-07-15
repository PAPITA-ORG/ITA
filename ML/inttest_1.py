# Integration Sim Test 1

# Housekeeping

import simpy
import vowpalwabbit
import random
import matplotlib.pyplot as plt
import statistics
import time
import numpy as np
import pandas as pd
import multiprocessing as mp
from joblib import Parallel, delayed

# Baseline simulation: 1000 families in 20 villages and different expected treatment levels.

#constants
class g:
    #constants
    max_cycles = 10 
    n_users = 1000
    run_number = 1   
    runs = 1
    sim_time = simpy.core.Infinity 

#families (s0 indicates baseline skill, i0 indicates baseline investment)
class users:
    def __init__(self, user_id):
        self.user_id = user_id
        self.cycle = 0
        self.mage = random.randint(20, 60)
        self.educ = random.randint(1, 5)
        self.gender = random.randint(0, 1)
        self.village = random.randint(1, 20)
        self.action = random.randint(1,4)
        self.treat = random.normalvariate(0,0.2)*self.action
        self.i0 = round(random.randint(0,10)*(1+(self.educ*0.15)+(self.mage*0.05))+self.gender*5)*self.treat 
        self.s0 = round(random.randint(15,20)*(1+(self.educ*0.15)+(self.mage*0.05))+self.gender*5) + self.i0
        self.prob = 0.25 

class Model:
    def __init__(self, run_number):
        self.env = simpy.Environment()
        self.user_counter = 0
        self.run_number = run_number
       
    def gen_users(self):
        yield self.env.timeout(0)
        self.run_number += 1
        while self.env.now < g.sim_time and self.user_counter < g.n_users:
            self.user_counter += 1
            user = users(user_id=self.user_counter)
            #SAVE
            output_list.append(
                [user.user_id, user.s0, user.i0, user.treat, user.action, user.village, user.educ, user.gender, user.mage, user.prob])
                
    def run(self):
        self.env.process(self.gen_users())
        self.env.run(until=g.sim_time)
        
def run_model_wrapper(run):
    print(f"Run {run} started.")
    my_model = Model(run_number = run)
    my_model.run()

output_df = pd.DataFrame(columns=['user_id', 's0', 'i0', 'treat', 'action', 'village', 'educ', 'gender', 'mage', 'prob'])

if (__name__ == '__main__'):
    output_list = mp.Manager().list()
    results = Parallel(n_jobs = mp.cpu_count())(delayed(run_model_wrapper)(run) for run in range(g.runs))
    output_list_pure = list(output_list)
    output_df = pd.DataFrame(output_list_pure, columns=['user_id', 's0', 'i0', 'treat', 'action', 'village', 'educ', 'gender', 'mage', 'prob'])
output_df.to_csv('inttest1.csv')             

# Learning simulation (40 rounds each household with impact level given on baseline)

df=pd.read_csv('inttest1.csv')
# reward (impact) must enter as cost (negative)
df['treat'] = -df['treat']
dfcb = df

from xgboost import XGBRegressor
from sklearn.metrics import mean_squared_error

def train_xgboost_regressor(train_data, train_labels, test_data, test_labels):
    # Define the XGBoost regressor
    reg = XGBRegressor(
        objective='reg:squarederror',
        eval_metric='rmse',
        max_depth=4,
        learning_rate=0.18793869,
        gamma=0.03805912,
        min_child_weight=4.9259686,
        subsample=0.89705926,
        colsample_bytree=0.9011847,
        seed=42
    )
    # Train the XGBoost model
    reg.fit(train_data, train_labels)
    # Evaluate the model on the test data
    predictions = reg.predict(test_data)
    mse = mean_squared_error(test_labels, predictions)
    # Return the trained model and the mean squared error
    return reg, mse

#construct data for estimation
train_df = df[df.index < 700]
test_df = df[df.index >= 700]
test_df.reset_index 
X_train=train_df.drop(columns=['treat', 'prob', 'user_id'], axis=1, inplace=False)
y_train=train_df['treat']
X_test=test_df.drop(columns=['treat', 'prob', 'user_id'], axis=1, inplace=False)
y_test=test_df['treat']
# Train xgboost
model, mse = train_xgboost_regressor(X_train, y_train, X_test, y_test)
# Print the MSE
print('MSE:', mse) 
     
def get_cost(s0, educ, gender, mage, i0, village, action, model):
    
    usuario=pd.DataFrame({'s0':s0, 'educ':educ, 'gender':gender, 'mage':mage, 'i0':i0, 'action':action, 'village':village}, index=[1])
    costo=model.predict(usuario)
    return costo[0]

#Treatment menu (in-person short, in-person long, hybrid-short, hybrid-long)
actions=[1,2,3,4]     

#Update sample probabilities
def sample_custom_pmf(pmf):
    total = sum(pmf)
    scale = 1 / total
    pmf = [x * scale for x in pmf]
    draw = random.random()
    sum_prob = 0.0
    for index, prob in enumerate(pmf):
        sum_prob += prob
        if sum_prob > draw:
            return index, prob
        
# This function modifies (context, action, cost, probability) to VW friendly format
def to_vw_example_format(context, actions, cb_label=None):
    if cb_label is not None:
        chosen_action, cost, prob = cb_label
    example_string = ""
    example_string += "shared |User user:{} mage:{} gender:{} i0:{} s0:{} educ:{} village{} \n".format(
        context["user"], context["mage"], context["gender"], context["i0"], context["s0"], context["educ"], context["village"], 
    )   
    for action in actions:
        if cb_label is not None and action == chosen_action:
            example_string += "0:{}:{} ".format(cost, prob)
        example_string += "|Action:{} \n".format(action)
    # Strip the last newline
    #print(example_string[:-1])
    return example_string[:-1]

# Suggest action based on learned reward value
def get_action(vw, context, actions):
    vw_text_example = to_vw_example_format(context, actions)
    pmf = vw.predict(vw_text_example)
    chosen_action_index, prob = sample_custom_pmf(pmf)
    return actions[chosen_action_index], prob

#Simulation setup for users over time
def run_simulation(vw, dfcb, num_iterations, actions, get_action, get_cost, label):
  
    # das= Dificultad a Sugerir
    das = []
    act = []
    
    for j in range(len(dfcb)):
        cost_sum = 0.0
        cost_us = []
        act_us = []
        for i in range(1, num_iterations + 1):
            
            datos_vw=[]   
            user = dfcb.iloc[j]['user_id']
            gender=dfcb.iloc[j]['gender']
            mage=dfcb.iloc[j]['mage']
            s0=dfcb.iloc[j]['s0']
            i0=dfcb.iloc[j]['i0']
            educ=dfcb.iloc[j]['educ']
            village=dfcb.iloc[j]['village']

            contextos = {"user": user, "mage": mage, "gender":gender, "s0":s0, "i0":i0, "educ":educ, "village":village}
            action, prob = get_action(vw, contextos, actions)
            cost = get_cost(int(s0), int(educ), int(gender), int(float(mage)), int(i0), int(action), int(village), model)
            cost_sum += float(cost)

            if label:
                vw_format=vw.parse(
                    to_vw_example_format(contextos, actions, (action, cost, prob)),
                    vowpalwabbit.LabelType.CONTEXTUAL_BANDIT)
                vw.learn(vw_format)

            else:
                datos_vw.append(to_vw_example_format(contextos, actions))

            cost_us.append(-1 * cost_sum / i)
            act_us.append(action)
        das.append(cost_us)
        act.append(act_us)
        
        
    return das, act   

# Output plot
def plot_das(num_iterations, das):
    plt.plot(range(1, num_iterations + 1), das)
    plt.xlabel("num_iterations", fontsize=14)
    plt.ylabel("das", fontsize=14)

vw = vowpalwabbit.Workspace("--cb_explore_adf -q UA --quiet --epsilon 0.2")
num_iterations=40
das, act = run_simulation(vw, dfcb, num_iterations, actions, get_action, get_cost, label=True)
plot_das(num_iterations, das[40])        