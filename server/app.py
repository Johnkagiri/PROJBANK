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
migrate = Migrate(app,db,render_as_batch=True)


app.config['SECRET_KEY'] = os.urandom(24)

CORS(app, supports_credentials=True)

db.init_app(app)
api= Api(app)



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
             response=make_response(studentinst.to_dict(),200)
             return response
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
            #  session['userid']= admininst.id
             return make_response(admininst.to_dict(),200)
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
        if stud_exist:
            return {'message':'Student already exists'}
        newstudent=Student(name=name, email=email, cohort_id=cohort_id, password_hash=email )

        db.session.add(newstudent)
        db.session.commit()

        response = make_response(jsonify(newstudent.to_dict()))
        response.content_type='application/json'

        return response

api.add_resource(Studentres, '/student', endpoint='student' )

class Studentbyid(Resource):
    def delete(self, id):
        student= Student.query.filter(Student.id==id).first()
        if not student:
            return{'message':'student doesn\'t exist'}
        Project.query.filter(Project.student_id==student.id).delete()
        db.session.delete(student)
        db.session.commit()
api.add_resource(Studentbyid, '/student/<int:id>', endpoint='studentid')

class Projectres(Resource):
    def get(self):
        allprojects = Project.query.all()
        return jsonify([project.to_dict() for project in allprojects  ])
    
    def post(self):
        data = request.get_json()

        name = data.get('name')
        description = data.get('description')
        githublink = data.get('githublink') 
        languages = data.get('languages')
        studentid = data.get('studentId')
        image = data.get('image')

        projexist= Project.query.filter(Project.name==name).first()

        if projexist:
            return {'message':'project exists'}
        newproj = Project(name=name, description=description, githublink=githublink, languages=languages, student_id=studentid, image=image ) 
        db.session.add(newproj)
        db.session.commit()
        response = make_response(jsonify(newproj.to_dict()))
        response.content_type='application/json'
        return response
api.add_resource(Projectres, '/project', endpoint='project') 

class Projectbyid(Resource):
    def get(self,id):
        project=Project.query.filter_by(id=id).first()

        if not project:
            return{'error':'Project nit found'}
        
        project_dict=project.to_dict()

        response=make_response(jsonify(project_dict),200)
        return response
    
    def patch(self,id):
        project=Project.query.filter_by(id=id).first()
        if not project:
            return{'error':'Project not found'}

        for attr in request.get_json():
            setattr(project,attr,request.get_json()[attr])

            db.session.add(project)
            db.session.commit()

            project_dict=project.to_dict()
            response=make_response(jsonify(project_dict),200)
            return response
        
    def delete(self,id):
        project= Project.query.filter_by(id=id).first()

        if not project:
            return {'message':'project doesnt exit'},403
        
        StudentProject.query.filter(StudentProject.student_id==project.id).delete()

        db.session.delete(project)
        db.session.commit()
        
        return {'Message':'Deleted'},200
api.add_resource(Projectbyid, '/project/<int:id>',endpoint='projectid')


class Cohortres(Resource):
    def get(self):
        allcohort = Cohort.query.all()
        return jsonify([cohort.to_dict() for cohort in allcohort] )
    
    def post(self):
        data = request.get_json()

        name = data.get('name')
        startdate = data.get('startdate') 
        enddate = data.get('enddate')
        adminid = data.get('adminId')

        cohortexist= Cohort.query.filter(Cohort.name==name).first()

        if cohortexist:
            return {'message':'project exists'}
        newcohort = Cohort(name=name, start_date=startdate, end_date=enddate, admin_id=adminid ) 
        db.session.add(newcohort)
        db.session.commit()
        response = make_response(jsonify(newcohort.to_dict()))
        response.content_type='application/json'
        return response

api.add_resource(Cohortres, '/cohort', endpoint='cohort')

class Cohortbyid(Resource):
    def get(self,id):
        cohort= Cohort.query.filter(Cohort.id==id).first()
        
        if not cohort:
            return { 'message': 'cohort doesnt exist' }

        cohort_dict= cohort.to_dict()
        response = make_response(jsonify(cohort_dict),200)
        return response
api.add_resource(Cohortbyid, '/cohort/<int:id>', endpoint='cohortid')    

class Adminres(Resource):
    def get(self):
        alladmin=Admin.query.all()
        return jsonify([admin.to_dict() for admin in alladmin])
api.add_resource(Adminres, '/admin', endpoint='admin')

class CheckSession(Resource):

    def get(self):
        # response=make_response({'session':session.get('userid')})
       
        # return response
        if session.get('userid'):
            user=Student.query.filter(Student.id==session.get('userid')).first()
            user_dict=user.to_dict()
            return make_response(jsonify(user_dict),200)
        else:
            return 'user is not in session please log in'
        

api.add_resource(CheckSession, '/session', endpoint='session')
class Logout(Resource):
    def delete(self):
        if session.get('userid'):
            session['userid']=None
            return jsonify({'message': 'User logged out successfully'})
        else: 
            return {"error": "User must be logged in"}

api.add_resource(Logout, '/logout', endpoint='logout')

class Requestres(Resource):
    def get(self):
        allrequest = Request.query.all()
        return make_response(jsonify([request.to_dict() for request in allrequest ]),200)
    
    def post(self):
        data = request.get_json()

        name = data.get('name')
        description = data.get('description')
        githublink = data.get('githublink') 
        languages = data.get('languages')
        image = data.get('image')
        studentid = data.get('studentId')

        reqexist= Request.query.filter(Request.name==name).first()

        if reqexist:
            return {'message':'project exists'}
        newreq = Request(name=name, description=description, githublink=githublink, languages=languages, student_id=studentid, image=image  ) 
        db.session.add(newreq)
        db.session.commit()
        response = make_response(jsonify(newreq.to_dict()))
        response.content_type='application/json'
        return response
    
api.add_resource(Requestres, '/request', endpoint='request') 

class RequestByid(Resource):
    def get(self, id):
        req=Request.query.filter_by(id=id).first()

        if not req:
            return {'message': 'request not found'},404
        
        return make_response(jsonify(req.to_dict()),200)


    def delete(self, id):
        req=Request.query.filter_by(id=id).first()

        if not req:
            return {'message': 'request not found'},404

        db.session.delete(req)
        db.session.commit()

        return {'message': 'deleted  succesfully'},200
api.add_resource(RequestByid,'/request/<int:id>', endpoint='requestbyid' )

class Studentprojectres(Resource):
    def get(self):
        studentproject = StudentProject.query.all()
        studentproject_todict=[ stproj.to_dict() for stproj in studentproject ]
        response = make_response(jsonify(studentproject_todict),200)
        return response
    
    def post(self):
        data = request.get_json()
        studentid= data.get('studentId')
        projectid= data.get('projectId')
        requestid= data.get('requestId')

        studentproject= StudentProject( student_id=studentid, project_id=projectid, request_id=requestid )
        db.session.add(studentproject)
        db.session.commit()

api.add_resource(Studentprojectres,"/studentproject",endpoint='studentproject')        

if __name__=='__main__':
    app.run(debug=True, port=8000)

