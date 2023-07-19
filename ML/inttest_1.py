# Integration Sim Test 1

# Housekeeping

import simpy
import vowpalwabbit
import random
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import multiprocessing as mp
from joblib import Parallel, delayed
from xgboost import XGBRegressor
from sklearn.metrics import mean_squared_error

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
        self.treat = self.action*0.25 + self.action*0.25*(5-random.randint(1,4)+(self.educ*0.25)-(self.mage*0.1)+self.gender)
        self.i0 = round(random.randint(1,5)*(1+(self.educ*0.15)+(self.mage*0.05))+self.gender*5) + round(random.randint(1,5)*(1+(self.educ*0.15)-(self.mage*0.05))+self.gender*5)*self.treat 
        self.s0 = round(random.randint(1,5)*(1+(self.educ*0.15)-(self.mage*0.05))+self.gender*5) + round(random.randint(1,5)*(1+(self.educ*0.15)+(self.mage*0.05))+self.gender*5)*self.i0
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