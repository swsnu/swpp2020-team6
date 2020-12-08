from .base import *
import os

SECRET_KEY = "dpp$tr=sdez+#!2-bd-w7p_v42_fd5kny$q2w&(gr#g-(5@s4h"

DEBUG = True
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}
