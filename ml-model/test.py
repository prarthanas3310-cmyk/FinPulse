import traceback 
try: 
    from flask import Flask 
    import pickle 
    model = pickle.load(open('finpulse_model.pkl','rb')) 
    print('ALL OK') 
except Exception as e: 
    traceback.print_exc() 
