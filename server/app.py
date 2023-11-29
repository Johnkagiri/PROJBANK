# from dotenv import load_dotenv
# load_dotenv()
from flask import Flask, jsonify, request, make_response, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_cors import CORS
from models import *
import os


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://njoro:4EoZ1J1LN5LrG2vUy2wlegPiaJrEfNNk@dpg-cliarb58td7s73bucja0-a.singapore-postgres.render.com/projbank_app"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['JSONIFY_PRETTYPRINT_REGULAR']= True
migrate = Migrate(app, db )

CORS(app)

db.init_app(app)
api= Api(app)

app.secret_key = os.urandom(16)

class Home(Resource):
    def get(self):
        allstudent=Student.query.all()
        response = make_response(jsonify([allstudents.to_dict() for allstudents in allstudent] ))
        response.content_type='application/json'

        return response
    
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
             session['userid']= studentinst.id
             return {'message':'login successful', 'student':studentinst.to_dict(), 'status':200  }
        else:
            return {'message':'invalid password or email'},402
    
api.add_resource(StudentLogin, '/studentlogin',endpoint='studentlogin') 

class AdminLogin(Resource):
    def post(self):
        data = request.get_json()
        
        name=data.get('name')
        password_hash=data.get('password')

        admininst= Admin.query.filter(Admin.name==name).first()

        if not name and not password_hash:
            return{'message':'name and password required'},400
        
        if admininst and admininst.authenticate(password_hash):
             session['userid']= admininst.id
             return {'message':'login successful', 'student':admininst.to_dict(), 'status':200  }
        else:
            return {'message':'invalid password or admin'},402
    
api.add_resource(AdminLogin, '/adminlogin',endpoint='adminlogin')

class Studentres(Resource):
    def get(self):
        allstudent=Student.query.all()
        return jsonify([allstudents.to_dict() for allstudents in allstudent] ) 

    def post(self):
        data = request.get_json()

        name = data.get('name')
        email = data.get('email')
        cohort_id = data.get('cohort')
        # password_hash = data.get('password')

        stud_exist = Student.query.filter(Student.email == email).first()
        if not stud_exist:
            return {'message':'Student already exists'}
        newstudent=Student(name=name, email=email, cohort_id=cohort_id, password_hash=email )

        db.session.add(newstudent)
        db.commit()

        response = make_response(jsonify(newstudent.to_dict()))
        response.content_type='application/json'

        return response

api.add_resource(Studentres, '/student', endpoint='student' )

class Projectres(Resource):
    def get(self):
        allprojects = Project.query.all()
        return jsonify([project for project in allprojects  ])
    
    def post(self):
        data = request.get_json()

        name = data.get('name')
        description = data.get('description')
        githublink = data.get('githublink') 
        languages = data.get('languages')

        projexist= Project.query.filter(Project.name==name).first()
#d
        if projexist:
            return {'message':'project exists'}
        newproj = Project(name=name, description=description, githublink=githublink, languages=languages) 
        session.add(newproj)
        session.commit()
        response = make_response(jsonify(newproj.to_dict()))
        response.content_type='application/json'
        return response
api.add_resource(Projectres, '/project', endpoint='project')   

class Cohortres(Resource):
    def get(self):
        allcohort = Project.query.all()
        return jsonify([cohort.to_dict() for cohort in allcohort] )
api.add_resource(Cohortres, '/cohort', endpoint='cohort')

class Adminres(Resource):
    def get(self):
        alladmin=Admin.query.all()
        return jsonify([admin.to_dict() for admin in alladmin])
api.add_resource(Adminres, '/admin', endpoint='admin')



if __name__=='__main__':
    app.run(debug=True, port=5000)
