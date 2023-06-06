import simpy
import random
import statistics
import time
import numpy as np
import pandas as pd
import multiprocessing as mp
from joblib import Parallel, delayed

#ITA data structure simulation


#constants
class g:
    #constants
    max_cycles = 20 
    n_users = 5000
    n_activities = 250
    run_number = 1   
    runs = 1
    sim_time = simpy.core.Infinity 

class activities:
    def __init__(self, activity_id):
        self.activity_id = activity_id
        self.Topico = random.randint(1, 3)
        self.Dificultad = random.randint(1, 5)
        self.EdadDesde = random.randint(1, 9)
        self.EdadHasta = self.EdadDesde + random.randint(2, 4)
        self.Duracion = 5*random.randint(1, 36)
        self.prob = 0.33 

class users:
    def __init__(self, user_id):
        self.user_id = user_id
        self.cycle = 0
        self.edad = random.randint(20, 60)
        self.educ = random.randint(1, 5)
        self.genero = random.randint(0, 1)
        self.af0 = round(random.randint(15,20)*(1+(self.educ*0.15)+(self.edad*0.05))+self.genero*5) - 20
        
class histories:
    def __init__(self, record_id):
        self.af1 = 0
        self.af2 = 0
        self.activity_id = 0
        self.Dificultad = 0
        self.Topico = 0
        self.record_id = record_id
        
class Model:
    def __init__(self, run_number):
        self.env = simpy.Environment()
        self.user_counter = 0
        self.record_counter = 1
        self.run_number = run_number
       
    def gen_users(self):
        yield self.env.timeout(0)
        self.run_number += 1
        while self.env.now < g.sim_time and self.user_counter < g.n_users:
            self.user_counter += 1
            user = users(user_id=self.user_counter)

            while user.cycle < g.max_cycles:
                user.cycle += 1
                self.record_counter += 1
                history = histories(record_id = self.record_counter)
                if user.af0 > 90:
                    user.af0 = 90
            
                # AF random at start 
                self.afmax = round(100-user.af0)
                history.af1 = round(user.af0 + 0.15*random.randrange(0, self.afmax) - 0.15*random.randrange(0, self.afmax))
                if history.af1 < 0:
                    history.af1 = 0
                
                # choose random activity
                self.rndact = random.randint(1, g.n_activities)
                activity = activities(activity_id = self.rndact)
                history.activity_id = activity.activity_id
                history.Dificultad = activity.Dificultad
                history.Topico = activity.Topico

                # AF random at end 
                self.afmaxpost = round(100-history.af1)
                history.af2 = history.af1 + 0.15*random.randrange(0, self.afmaxpost) - 0.15*random.randrange(0, self.afmaxpost)
                                               
                if (history.Dificultad-1)*20 < history.af1:
                    history.af2 = history.af2 + 0.15*random.randrange(0, self.afmaxpost)*(5-history.Dificultad)
                else:
                    history.af2 = history.af2 + 0.15*random.randrange(0, self.afmaxpost)*(5-history.Dificultad)

                if history.af2 < 0:
                    history.af2 = 0
                history.af2 = round(history.af2)
                                    
                #SAVE
                output_list.append(
                    [user.user_id, user.af0, user.cycle, user.educ, user.genero, user.edad, history.activity_id, history.af1, 
                        history.af2, history.Dificultad, history.Topico, activity.prob, self.run_number])
            
    def run(self):
        self.env.process(self.gen_users())
        self.env.run(until=g.sim_time)
    
#WRAPPER
    
def run_model_wrapper(run):
    print(f"Run {run} started.")
    my_model = Model(run_number = run)
    my_model.run()

output_df = pd.DataFrame(columns=['user_id', 'af0', 'cycle', 'educ', 'gender', 'age', 'activity_id', 
                                    'af1', 'af2', 'dificulty', 'topic', 'prob', 'run_number'])

if (__name__ == '__main__'):
    output_list = mp.Manager().list()
    results = Parallel(n_jobs = mp.cpu_count())(delayed(run_model_wrapper)(run) for run in range(g.runs))
    output_list_pure = list(output_list)
    output_df = pd.DataFrame(output_list_pure, columns=['user_id', 'af0', 'cycle', 'educ', 'gender', 'age', 'activity_id', 
                                    'af1', 'af2', 'dificulty', 'topic', 'prob', 'run_number'])
output_df.to_csv('ML\sim1.csv')               