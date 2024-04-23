from flask import Flask
# from celery import Celery

from extension import db, sesh, login_manager, mail, bcrypt
from config import DevelopmentConfig, ProductionConfig

def create_app():
    app = Flask(__name__)
    # app.config.from_object(DevelopmentConfig)
    app.config.from_object(ProductionConfig)

    db.init_app(app)
    sesh.init_app(app)
    login_manager.init_app(app)
    mail.init_app(app)
    bcrypt.init_app(app)

    # migrate.init_app(app, db)
    # # talisman.init_app(app)
    # login_manager.init_app(app)
    # discord.init_app(app)
    return app

# def create_celery(app):
#     celery = Celery(app.import_name, broker=app.config['CELERY_BROKER_URL'])
#     celery.conf.update(app.config)
    
#     class ContextTask(celery.Task):
#         def __call__(self, *args, **kwargs):
#             with app.app_context():
#                 return self.run(*args, **kwargs)
    
#     celery.Task = ContextTask
#     return celery
