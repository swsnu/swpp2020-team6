from .base import *
import os

DEBUG = True
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "OPTIONS": {
            "read_default_file": os.path.join(BASE_DIR, "mysql.cnf"),
            "init_command": "SET sql_mode='STRICT_TRANS_TABLES'",  # strict mode 설정 추가
        },
    }
}

secret_file = os.path.join(BASE_DIR, "backend/settings/secrets.json")
with open(secret_file) as f:
    secrets = json.loads(f.read())


def get_secret(setting, secrets=secrets):
    """비밀 변수를 가져오거나 명시적 예외를 반환한다."""
    try:
        return secrets[setting]
    except KeyError:
        error_msg = "Set the {} environment variable".format(setting)
        raise ImproperlyConfigured(error_msg)


SECRET_KEY = get_secret("SECRET_KEY")
