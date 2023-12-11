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
    Project.query.delete()
    Request.query.delete()
    Student.query.delete()
    Cohort.query.delete()
    Admin.query.delete()    
    

    
    # studentss = []
    # for i in range(10):
    #     student = Student(name = fake.name(), email = fake.email(), password_hash = fake.name() )
    #     studentss.append(student)
    # db.session.add_all(studentss)


    # projects = []
    # for i in range(15):
    #     project = Project(name = fake.name(), description = fake.paragraph(2), githublink=fake.name(), languages=fake.name() )
    #     projects.append(project)
    # db.session.add_all(projects)
    

    # studentprojects = []
    # for i in range(5):
    #     studentproject = StudentProject(student=choice(studentss),project=choice(projects))
    #     studentprojects.append(studentproject)
    # db.session.add_all(studentprojects)
       
     
    admin=Admin(name="john" , password_hash="john")
    db.session.add(admin)
    
    
    # fake_date = fake.date_between(start_date='-7y', end_date='today')
    # cohort=Cohort(name='win',start_date=fake_date, end_date=fake_date, admin_id=1 )
    # db.session.add(cohort)
    db.session.commit() 
