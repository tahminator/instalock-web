import os
from dotenv import load_dotenv
import redis

load_dotenv()

class Config:
    SECRET_KEY = os.environ['SECRET_KEY']
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    CELERY_BROKER_URL='amqp://admin:1290@localhost:5672/',
    CELERY_RESULT_BACKEND='db+postgresql://postgres:1290@localhost:5432/instalock_workers'
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:1290@localhost:5432/instalock'

    SESSION_TYPE = 'redis'
    SESSION_PERMANENT = False
    PERMANENT_SESSION_LIFETIME = 30
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url('redis://localhost:6379')

    MAIL_SERVER = os.environ['MAIL_SERVER']
    MAIL_PORT = os.environ['MAIL_PORT']
    MAIL_USE_SSL = os.environ['MAIL_USE_SSL']
    MAIL_USERNAME = os.environ['MAIL_USERNAME']
    MAIL_PASSWORD = os.environ['MAIL_PASSWORD']
    MAIL_DEFAULT_SENDER = os.environ['MAIL_DEFAULT_SENDER']


class ProductionConfig(Config):
    Config
    INTERNAL_URL = os.environ['INTERNAL_URL_PROD']
    SESSION_COOKIE_SECURE = True
    MODE = "prod"
    static_folder = 'build'
    template_folder = 'build'
    static_url_path=''

class DevelopmentConfig(Config):
    Config
    INTERNAL_URL = os.environ['INTERNAL_URL_DEV']
    SESSION_COOKIE_SECURE = False
    MODE = "test"
