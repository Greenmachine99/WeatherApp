# Importing all Libraries
from flask import Flask
from flask_restful import Api, Resource
from sqlalchemy import create_engine, Integer, Column, String
import os 
from dotenv import load_dotenv

# Loading Environment Variables
load_dotenv()

# Creating Flask App
app = Flask(__name__)
# Connecting to Database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
db = create_engine(app.config['SQLALCHEMY_DATABASE_URI'], echo=True)
# Creating API
api = Api(app)

# Create Resource Class
class gps(Resource):
    def get (self):
        # Querying Database
        result = db.execute("SELECT * FROM gps")
        # Returning Data
        return {'data': [dict(row) for row in result]}

# Adding Resource to API
api.add_resource(gps, '/gps')


