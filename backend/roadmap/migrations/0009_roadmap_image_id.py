# Generated by Django 3.1.2 on 2020-12-05 07:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("roadmap", "0008_auto_20201119_0343"),
    ]

    operations = [
        migrations.AddField(
            model_name="roadmap",
            name="image_id",
            field=models.IntegerField(default=1),
        ),
    ]