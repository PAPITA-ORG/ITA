import vowpalwabbit 
import random
import matplotlib.pyplot as plt
import pandas as pd
import itertools

# Processing CSV data to vowpal format
df = pd.read_csv('C:\\Users\\juanc\\OneDrive\\Documentos\\ITA\\ML\\sim1.csv') 
df.drop(columns=df.columns[0], axis=1, inplace=True)
df['cost'] =  df['af1'] - df['af2'] 
train_df = df[df.index < 70000]
test_df = df[df.index >= 70000]
test_df.reset_index
    
def to_vw_example_format(context, actions, cb_label=None):
    if cb_label is not None:
        chosen_action, cost, prob = cb_label
    example_string = ""
    example_string += "shared |User user={} time_of_day={}\n".format(
        context["user"], context["time_of_day"]
    )
    for action in actions:
        if cb_label is not None and action == chosen_action:
            example_string += "0:{}:{} ".format(cost, prob)
        example_string += "|Action article={} \n".format(action)
    # Strip the last newline
    return example_string[:-1]    


for i in train_df.index:
    ## provide data to cb in requested format
    action = train_df.loc[i, "dificulty"]
    cost = train_df.loc[i, "cost"]
    probability = train_df.loc[i, "prob"]
    feature1 = train_df.loc[i, "af0"]
    feature2 = train_df.loc[i, "gender"]
    feature3 = train_df.loc[i, "age"]
    feature4 = train_df.loc[i, "topic"]

# create python model - this stores the model parameters in the python vw object; here a contextual bandit with four possible actions
#vw -d --cb_explore --first 2