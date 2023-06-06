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

# create python model - this stores the model parameters in the python vw object; here a contextual bandit with four possible actions
vw = vowpalwabbit.Workspace("--cb 5", quiet=True)

for i in train_df.index:
    ## provide data to cb in requested format
    action = train_df.loc[i, "dificulty"]
    cost = train_df.loc[i, "cost"]
    probability = train_df.loc[i, "prob"]
    feature1 = train_df.loc[i, "af0"]
    feature2 = train_df.loc[i, "gender"]
    feature3 = train_df.loc[i, "age"]
    feature4 = train_df.loc[i, "topic"]
        
    ## do the actual learning
    vw.learn(
        str(action)
        + ":"
        + str(cost)
        + ":"
        + str(probability)
        + " | "
        + str(feature1)
        + " "
        + str(feature2)
        + " "
        + str(feature3)
        + " "
        + str(feature4)
    )
    
for j in test_df.index:
    feature1 = test_df.loc[j, "af0"]
    feature2 = test_df.loc[j, "gender"]
    feature3 = test_df.loc[j, "age"]
    feature4 = test_df.loc[j, "topic"]
    choice = vw.predict(
        "| " + str(feature1) + " " + str(feature2) + " " + str(feature3) + " " + str(feature4)
    )
    print(j, choice)