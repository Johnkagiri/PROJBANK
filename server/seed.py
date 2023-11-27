from models import *
from flask import Flask
from faker import Faker
from random import choice

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 

fake = Faker()

db.init_app(app)

with app.app_context():

    Student.query.delete()
    students = []
    for i in range(10):
        student = Student(name = fake.name(), email = fake.email(), password_hash = fake.name() )
        students.append(student)
    db.session.add_all(students)

    Project.query.delete()
    projects = []
    for i in range(15):
        project = Project(name = fake.name(), description = fake.paragraph(50), githublink=fake.name(), languages=fake.name() )
        projects.append(project)
    db.session.add_all(projects)
    
    StudentProject.query.delete()
    studentprojects = []
    for i in range(5):
        studentproject = StudentProject(student=choice(students),project=choice(projects))
        studentprojects.append(studentproject)
    db.session.add_all(studentprojects)
    db.session.commit()    
     
