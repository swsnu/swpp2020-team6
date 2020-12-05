from .base import *

DEBUG = False

ALLOWED_HOSTS = ['18.206.120.0']

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}
