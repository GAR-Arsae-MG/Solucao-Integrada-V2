# Generated by Django 5.0 on 2023-12-29 15:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('world', '0003_alter_usuarios_email_alter_usuarios_funcao'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuarios',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
