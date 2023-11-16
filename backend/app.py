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

### GPS API ###
# Columns: id, lat, lon

# Create Parser
parserGPS = reqparse.RequestParser()
# Add GPS Arguments to Parser
parserGPS.add_argument('lat', type=float)
parserGPS.add_argument('lng', type=float)

# Create GPS API
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
        args = parserGPS.parse_args()
        # Extract Data from Args
        lat = args['lat']
        lng = args['lng']
        # Insert Data into Database
        db.execute('INSERT INTO gps (lat, lng) VALUES (?, ?)', (lat, lng))

### Weather API ###
# Columns: id, time, temp, humidity

# Create Parser
parserWeather = reqparse.RequestParser()
# Add Weather Arguments to Parser
parserWeather.add_argument('time', type=str)
parserWeather.add_argument('temp', type=float)
parserWeather.add_argument('humidity', type=float)

# Create Weather API
class weather(Resource):
    # GET Method
    def get(self):
        # Fetching Data from Database
        result = db.execute('SELECT * FROM weather')
        # Returning Data
        return {'data': [dict(row) for row in result]}
    # POST Method
    def post(self):
        # 

# Adding Resource to API
api.add_resource(gps, '/gps')

# Running Flask App
if __name__ == '__main__':
    app.run(debug=True)
