from api.extension import db
from flask_login import UserMixin  # type: ignore
from uuid import uuid4
import jwt
import time
from os import getenv
from typing import Union


def get_uuid():
    return uuid4().hex


class User(db.Model, UserMixin):  # type: ignore
    id = db.Column(db.String(32), primary_key=True,
                   unique=True, default=get_uuid)
    email = db.Column(db.String(345), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    verified = db.Column(db.Boolean, default=False)
    entitlement = db.Column(db.String(300), default=None, nullable=True)
    auth = db.Column(db.String(300), default=None, nullable=True)


def get_reset_token(username, expires=10):
    reset_token: Union[str, None] = jwt.encode({'reset_password': username, 'exp': time.time(
    ) + expires}, key=getenv('SECRET_KEY'))  # type: ignore
    return reset_token
