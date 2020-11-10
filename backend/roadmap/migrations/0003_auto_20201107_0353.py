# Generated by Django 3.1.2 on 2020-11-07 03:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("tag", "0001_initial"),
        ("section", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("roadmap", "0002_auto_20201106_1634"),
    ]

    operations = [
        migrations.AlterField(
            model_name="roadmap",
            name="author",
            field=models.ForeignKey(
                blank=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="author_roadmap",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterField(
            model_name="roadmap",
            name="comment_count",
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name="roadmap",
            name="date",
            field=models.DateField(blank=True),
        ),
        migrations.AlterField(
            model_name="roadmap",
            name="level",
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name="roadmap",
            name="like_count",
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name="roadmap",
            name="original_author",
            field=models.ForeignKey(
                blank=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="originial_author_roadmap",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterField(
            model_name="roadmap",
            name="pin_count",
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name="roadmap",
            name="sections",
            field=models.ManyToManyField(
                blank=True, related_name="section_roadmap", to="section.Section"
            ),
        ),
        migrations.AlterField(
            model_name="roadmap",
            name="tags",
            field=models.ManyToManyField(
                blank=True, related_name="tags_roadmap", to="tag.Tag"
            ),
        ),
    ]