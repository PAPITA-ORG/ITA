import simpy
import random
import statistics
import time
import numpy as np
import pandas as pd
import multiprocessing as mp
from joblib import Parallel, delayed

# simple rating simulation

#constants
class g:
    #constants
    max_cycles = 100 
    n_raters = 50
    run_number = 1   
    runs = 1
    sim_time = simpy.core.Infinity 
    
class raters:
    def __init__(self, rater_id):
        self.rater_id = rater_id
        self.cycle = 0
        self.edad = random.randint(20, 65)
        self.educ = random.randint(1, 5)
        self.genero = random.randint(0, 1)
        self.bias = random.randint(0, 1)

class projects:
    def __init__(self, proy_id):
        self.proy_id = proy_id
        self.teval = 2*random.randint(1, 4)-1
        self.reval = 0
        self.edad = random.randint(20, 65)
        self.educ = random.randint(1, 5)
        self.genero = random.randint(0, 1)
        
class Model:
    def __init__(self, run_number):
        self.env = simpy.Environment()
        self.rater_counter = 0
        self.proy_counter = 1
        self.run_number = run_number
       
    def gen_raters(self):
        yield self.env.timeout(0)
        self.run_number += 1
        while self.env.now < g.sim_time and self.rater_counter < g.n_raters:
            self.rater_counter += 1
            rater = raters(rater_id=self.rater_counter)

            while rater.cycle < g.max_cycles:
                rater.cycle += 1
                self.proy_counter += 1
                proy = projects(proy_id = self.proy_counter)
                if rater.bias == 1:
                    proy.reval = round(proy.teval/2 + rater.genero + rater.educ/5 + proy.edad/100)
                    proy.reval = proy.reval + proy.genero
                    if (proy.reval == 2 or proy.reval == 4 or proy.reval == 6):
                        proy.reval = proy.reval + 1
                else:
                    proy.reval = proy.teval
                #SAVE
                output_list.append(
                    [rater.rater_id, rater.cycle, rater.bias, rater.genero, rater.edad, rater.educ, proy.proy_id, proy.educ, 
                        proy.genero, proy.edad, proy.teval, proy.reval, self.run_number])
            
    def run(self):
        self.env.process(self.gen_raters())
        self.env.run(until=g.sim_time)
    
#WRAPPER
    
def run_model_wrapper(run):
    print(f"Run {run} started.")
    my_model = Model(run_number = run)
    my_model.run()

output_df = pd.DataFrame(columns=['rater_id', 'cycle', 'bias', 'r_genero', 'r_edad', 'r_educ', 'proy_id', 'p_educ', 
                                    'p_genero', 'p_edad', 'teval', 'reval', 'run_number'])

if (__name__ == '__main__'):
    output_list = mp.Manager().list()
    results = Parallel(n_jobs = mp.cpu_count())(delayed(run_model_wrapper)(run) for run in range(g.runs))
    output_list_pure = list(output_list)
    output_df = pd.DataFrame(output_list_pure, columns=['rater_id', 'cycle', 'bias', 'r_genero', 'r_edad', 'r_educ', 'proy_id', 'p_educ', 
                                    'p_genero', 'p_edad', 'teval', 'reval', 'run_number'])
output_df.to_csv('C:/Users/juanc/OneDrive/Documentos/ITA/ML/ratersim.csv')               
