from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from flask_bcrypt import Bcrypt


db = SQLAlchemy()
bcrypt = Bcrypt()

class Student(db.Model, SerializerMixin ):
    __tablename__='students'
    serialize_rules = ('-studentproject.student', '-cohort.student', )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String(120), unique=True)
    _password_hash = db.Column(db.String)
    
    studentproject= db.relationship('StudentProject', backref='student')
    cohort_id = db.Column(db.Integer, db.ForeignKey('cohorts.id'))

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self,password):
        hashed_password = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = hashed_password.decode('utf-8')
    
    def authenticate(self,password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')) 


class Project(db.Model, SerializerMixin):
    __tablename__='projects'
    serialize_rules=('-studentproject.project',)    

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    githublink = db.Column(db.String) 
    languages = db.Column(db.String)

    studentproject= db.relationship('StudentProject', backref='project')

class Cohort(db.Model, SerializerMixin):
    __tablename__ = 'cohorts'
    serialize_rules = ('-student.cohort','-admin.cohort',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String) 
    start_date = db.Column(db.Date, nullable=False, default='none')
    end_date = db.Column(db.Date, nullable=False, default='none')


    student = db.relationship('Student', backref='cohort')
    admin_id = db.Column(db.Integer(), db.ForeignKey('admins.id'))

class Admin(db.Model, SerializerMixin):
    __tablename__='admins'
    serialize_rules = ('-cohort.admin',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    _password_hash = db.Column(db.String)

    cohort = db.relationship('Cohort', backref='admin')

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        hashed_password = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = hashed_password.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))    


class StudentProject(db.Model, SerializerMixin):
    __tablename__='StudentsProjects'
    serialize_rules = ('-student.studentproject','-project.studentproject',)

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer(), db.ForeignKey('students.id'))
    project_id = db.Column(db.Integer(), db.ForeignKey('projects.id'))


