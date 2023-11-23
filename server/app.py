from flask import Flask, jsonify, request, make_response, session
from flask_migrate import Migrate
from flask_restful import Api, Resource

app = Flask(__name__)

api= Api(app)

class Home(Resource):
    def get(self):

        return {'message': 'Username already in use. Please choose a different one.'},200
    
api.add_resource(Home, '/',endpoint='home')  

class Sign(Resource):
    def get(self):

        return {'message': 'Username already in use. Please choose a different one.'},200
    
api.add_resource(Sign, '/sign',endpoint='sign') 

# if __name__=='__main__':
#     app.run(debug=True, port=5000)
