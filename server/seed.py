from models import *
from flask import Flask
from faker import Faker
from random import choice
import os

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://njoro:4EoZ1J1LN5LrG2vUy2wlegPiaJrEfNNk@dpg-cliarb58td7s73bucja0-a.singapore-postgres.render.com/projbank_app"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 

fake = Faker()

db.init_app(app)

with app.app_context():
    
    StudentProject.query.delete()
    Student.query.delete()
    Project.query.delete()
    
    studentss = []
    for i in range(10):
        student = Student(name = fake.name(), email = fake.email(), password_hash = fake.name() )
        studentss.append(student)
    db.session.add_all(studentss)


    projects = []
    for i in range(15):
        project = Project(name = fake.name(), description = fake.paragraph(50), githublink=fake.name(), languages=fake.name() )
        projects.append(project)
    db.session.add_all(projects)
    

    studentprojects = []
    for i in range(5):
        studentproject = StudentProject(student=choice(studentss),project=choice(projects))
        studentprojects.append(studentproject)
    db.session.add_all(studentprojects)
    db.session.commit()    
     
