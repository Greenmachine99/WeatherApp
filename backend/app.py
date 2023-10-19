# Importing all Libraries
from flask import Flask
from flask_restful import Api, Resource
from sqlalchemy import create_engine, Integer, Column, String
import os 
from dotenv import load_dotenv

# Creating Flask App

