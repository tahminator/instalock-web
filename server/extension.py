from flask_sqlalchemy import SQLAlchemy
from flask_session import Session  # type: ignore
from flask_login import LoginManager  # type: ignore
from flask_mail import Mail, Message  # type: ignore
from flask_bcrypt import Bcrypt  # type: ignore
from flask_migrate import Migrate  # type: ignore
import flask_bcrypt

db = SQLAlchemy()
sesh = Session()
login_manager = LoginManager()
mail = Mail()
bcrypt = Bcrypt()
migrate = Migrate()
