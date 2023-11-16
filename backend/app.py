# Importing all Libraries
from flask import Flask
from flask_restful import Api, Resource, reqparse
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

# Create Parser
parser = reqparse.RequestParser()

# Add GPS Arguments to Parser
parser.add_argument('lat', type=float)
parser.add_argument('lng', type=float)

# GPS API
class gps(Resource):
    # GET Method
    def get(self):
        # Fetching Data from Database
        result = db.execute('SELECT * FROM gps')
        # Returning Data
        return {'data': [dict(row) for row in result]}
    
    # POST Method
    def post(self):
        # Pars Args
        args = parser.parse_args()
        # Extract Data from Args
        lat = args['lat']
        lng = args['lng']
        # Insert Data into Database
        db.execute('INSERT INTO gps (lat, lng) VALUES (?, ?)', (lat, lng))

# Adding Resource to API
api.add_resource(gps, '/gps')

# Running Flask App
if __name__ == '__main__':
    app.run(debug=True)
