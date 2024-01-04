# Generated by Django 5.0 on 2024-01-04 13:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('world', '0009_remove_usuarios_imageurl_alter_unidades_location'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ativos_operacionais',
            name='coordenada_x',
        ),
        migrations.RemoveField(
            model_name='ativos_operacionais',
            name='coordenada_y',
        ),
        migrations.RemoveField(
            model_name='unidades',
            name='location',
        ),
        migrations.AddField(
            model_name='ativos_operacionais',
            name='latitude',
            field=models.FloatField(default=0.0, help_text='Latitude', verbose_name='Outlet Latitude'),
        ),
        migrations.AddField(
            model_name='ativos_operacionais',
            name='longitude',
            field=models.FloatField(default=0.0, help_text='Longitude', verbose_name='Outlet Longitude'),
        ),
    ]