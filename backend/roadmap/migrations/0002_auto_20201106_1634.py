# Generated by Django 3.1.2 on 2020-11-06 16:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("roadmap", "0001_initial"),
        ("section", "0001_initial"),
        ("tag", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="roadmap",
            name="sections",
            field=models.ManyToManyField(
                related_name="section_roadmap", to="section.Section"
            ),
        ),
        migrations.AddField(
            model_name="roadmap",
            name="tags",
            field=models.ManyToManyField(related_name="tags_roadmap", to="tag.Tag"),
        ),
    ]
