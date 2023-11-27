
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

class StudentLogin(Resource):
    def post(self):
        data = request.get_json()
        
        email=data.get('email')
        password_hash=data.get('password')

        studentinst= Student.query.filter(Student.email==email).first()

        if not email and not password_hash:
            return{'message':'email and password required'},400
        
        if studentinst and studentinst.authenticate(password_hash):
             return {'message':'login successful', 'student':studentinst.to_dict(), 'status':200  }
        else:
            return {'message':'invalid password or email'},402
    
api.add_resource(StudentLogin, '/studentlogin',endpoint='studentlogin') 



if __name__=='__main__':
    app.run(debug=True, port=5000)
