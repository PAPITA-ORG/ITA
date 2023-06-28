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

###

from vowpalwabbit import pyvw
import random

class ContextualBanditModel:
    def __init__(self, num_actions):
        self.model = pyvw.vw("--cb_explore_adf --quiet --epsilon 0.2 --power_t 0.6")
        self.num_actions = num_actions

    def format_example(self, user_id, context, actions):
        example = []
        for action in actions:
            formatted_example = f"|{user_id} {action} {context} :"
            example.append(formatted_example)
        return example

    def train(self, user_id, context, actions, probabilities, reward):
        examples = self.format_example(user_id, context, actions)
        self.model.learn(examples, probabilities, labels)

    def choose_action(self, user_id, context):
        examples = self.format_example(user_id, context, range(1, self.num_actions + 1))
        predictions = self.model.predict(examples)
        chosen_action = predictions[0].action + 1
        return chosen_action

# Example usage
model = ContextualBanditModel(num_actions=3)

# Training phase
training_data = [
    {"user_id": 1, "context": "age:25 gender:male", "actions": [1, 2, 3], "probabilities": [0.4, 0.3, 0.3], "reward": 1},
    {"user_id": 2, "context": "age:30 gender:female", "actions": [1, 2, 3], "probabilities": [0.2, 0.6, 0.2], "reward": 0},
    # Add more training examples
]

for example in training_data:
    model.train(example["user_id"], example["context"], example["actions"], example["probabilities"], example["reward"])

# Inference phase
user_id = 1
user_context = "age:25 gender:male"
chosen_action = model.choose_action(user_id, user_context)
print(f"User {user_id}: Recommended action: {chosen_action}")

user_id = 2
user_context = "age:30 gender:female"
chosen_action = model.choose_action(user_id, user_context)
print(f"User {user_id}: Recommended action: {chosen_action}")
