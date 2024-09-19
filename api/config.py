import os
from dotenv import load_dotenv
import redis

load_dotenv()


class Config:
    ENV = os.environ['ENV']
    MODE = os.environ['ENV']  # Legacy
    SECRET_KEY = os.environ['SECRET_KEY']
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    SQLALCHEMY_DATABASE_URI = os.environ['SQLALCHEMY_DATABASE_URI']

    SESSION_TYPE = 'redis'
    SESSION_PERMANENT = False
    PERMANENT_SESSION_LIFETIME = 30
    SESSION_USE_SIGNER = True

    MAIL_SERVER = os.environ['MAIL_SERVER']
    MAIL_PORT = os.environ['MAIL_PORT']
    MAIL_USE_SSL = os.environ['MAIL_USE_SSL']
    MAIL_USERNAME = os.environ['MAIL_USERNAME']
    MAIL_PASSWORD = os.environ['MAIL_PASSWORD']
    MAIL_DEFAULT_SENDER = os.environ['MAIL_DEFAULT_SENDER']

    SESSION_REDIS = redis.Redis.from_url(
        f"{os.environ['REDIS_URL']}") if os.environ['ENV'] == "production" else redis.Redis.from_url(f"{os.environ['REDIS_URL']}/8")

    INTERNAL_URL = os.environ['INTERNAL_URL']

    SESSION_COOKIE_SECURE = True if os.environ['ENV'] == "production" else False

    static_folder = 'static'
    template_folder = 'static'
    static_url_path = ''
