from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager  # type: ignore
from flask_mail import Mail, Message  # type: ignore
from flask_bcrypt import Bcrypt  # type: ignore
from flask_migrate import Migrate  # type: ignore
from flask_session import Session  # type: ignore

db = SQLAlchemy()
login_manager = LoginManager()
mail = Mail()
bcrypt = Bcrypt()
migrate = Migrate()
sess = Session()
