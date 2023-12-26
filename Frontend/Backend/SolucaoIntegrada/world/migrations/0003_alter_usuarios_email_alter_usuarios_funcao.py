# Generated by Django 5.0 on 2023-12-26 14:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('world', '0002_remove_usuarios_senha_usuarios_agencia_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuarios',
            name='email',
            field=models.EmailField(max_length=64, unique=True),
        ),
        migrations.AlterField(
            model_name='usuarios',
            name='funcao',
            field=models.CharField(choices=[('P', 'Prestador'), ('R', 'Regulador'), ('U', 'Usuario'), ('A', 'Administrador')], default='R', max_length=1),
        ),
    ]