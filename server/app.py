from dotenv import load_dotenv
load_dotenv()
from flask import Flask, jsonify, request, make_response, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_cors import CORS
from models import *
import os


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['JSONIFY_PRETTYPRINT_REGULAR']= True
migrate = Migrate(app, db )

CORS(app)

db.init_app(app)
api= Api(app)

class Home(Resource):
    def get(self):

        return {'message': 'Username already in use. Please choose a different one sighhhh.'},200
    
api.add_resource(Home, '/',endpoint='home')  

class Sign(Resource):
    def get(self):

        return {'message': 'Username already in use. Please choose a different one.'},200
    
api.add_resource(Sign, '/sign',endpoint='sign') 

if __name__=='__main__':
    app.run(debug=True, port=5000)
