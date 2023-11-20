# Importing all Libraries
from flask import Flask
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
from sqlalchemy import create_engine, select, insert, Table, MetaData
import os 
from dotenv import load_dotenv
from datetime import datetime, timedelta 

# Loading Environment Variables
load_dotenv()

# Creating Flask App
app = Flask(__name__)
# Allowing CORS
CORS(app)
# Connecting to Database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
db = create_engine(app.config['SQLALCHEMY_DATABASE_URI'], echo=True)
db.connect()

# Creating API
api = Api(app)

# Creating MetaData
metadata = MetaData()

### GPS API ###
# Columns: id, lat, lon
gps = Table('gps', metadata, autoload_with=db)

# Create Parser
parserGPS = reqparse.RequestParser()
# Add GPS Arguments to Parser
parserGPS.add_argument('lat', type=float)
parserGPS.add_argument('lon', type=float)
parserGPS.add_argument('name', type=str)

# Create GPS API
class GPSResource(Resource):
    # GET Method
    def get(self):
        # Fetching Data from Database
        with db.connect() as conn:
            result = conn.execute(select(gps))
        # Converting Data to JSON
        data = [{'lat': float(row.lat), 'lon': float(row.lon), 'name': row.name} for row in result]
        # Returning Data
        return {'data': data}
    
    # POST Method
    def post(self):
        # Pars Args
        args = parserGPS.parse_args()
        # Extract Data from Args
        lat = args['lat']
        lon = args['lon']
        name = args['name']
        # Insert Data into Database
        with db.connect() as connection:
            connection.execute(insert(gps).values({'lat': lat, 'lon': lon, 'name': name}))
            connection.commit()

### Weather API ###
# Columns: id, time, temp, humidity
weather = Table('weather', metadata, autoload_with=db)

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
        # Create Query
        query = select(weather).where(weather.c.time > datetime.utcnow() - timedelta(days=1))
        # Fetching Data from Database
        with db.connect() as connection:
            result = connection.execute(query)
        # Returning Data
        return {'data': [dict(row) for row in result]}
    
    # POST Method
    def post(self):
        # Parse Args
        args = parserWeather.parse_args()
        # Extract Data from Args
        time = args['time']
        temp = args['temp']
        humidity = args['humidity']
        # Insert Data into Database
        with db.connect() as connection:
            connection.execute(insert(weather).values({'time': time, 'temp': temp, 'humidity': humidity}))
            connection.commit()

# Adding Resource to API
api.add_resource(GPSResource, '/gps')
api.add_resource(weather, '/weather')

# Running Flask App
if __name__ == '__main__':
    app.run(debug=True)
