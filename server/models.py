from extension import db
from flask_login import UserMixin
from uuid import uuid4
import secrets

def get_uuid():
    return uuid4().hex

class User(db.Model, UserMixin):
    id = db.Column(db.String(32), primary_key = True, unique = True, default=get_uuid)
    email = db.Column(db.String(345), unique = True, nullable = False)
    password = db.Column(db.String(255), nullable = False)
    videos = db.relationship('Video', backref = 'user', lazy = True)

class Video(db.Model):
    id = db.Column(db.String(32), primary_key = True, unique = True, default=get_uuid)
    video_id = db.Column(db.String(32), unique = True, nullable = False, default = get_uuid)
    user_id = db.Column(db.String(32), db.ForeignKey('user.id'), nullable = False)