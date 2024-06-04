from flask import Flask
import sentry_sdk
# from celery import Celery

from api.extension import db, login_manager, mail, bcrypt, migrate, sess
from api.config import DevelopmentConfig, ProductionConfig


def create_app():
    sentry_sdk.init(
        dsn="https://b7a6b2a49e949208195878e21576d8f7@o4507374881341440.ingest.us.sentry.io/4507374891040768",
        # Set traces_sample_rate to 1.0 to capture 100%
        # of transactions for performance monitoring.
        traces_sample_rate=1.0,
        # Set profiles_sample_rate to 1.0 to profile 100%
        # of sampled transactions.
        # We recommend adjusting this value in production.
        profiles_sample_rate=1.0,
    )
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)
    # app.config.from_object(ProductionConfig)

    db.init_app(app)
    login_manager.init_app(app)
    mail.init_app(app)
    bcrypt.init_app(app)
    migrate.init_app(app, db)
    sess.init_app(app)

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
