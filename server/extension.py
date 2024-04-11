from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from flask_login import LoginManager

db = SQLAlchemy()
sesh = Session()
login_manager = LoginManager()