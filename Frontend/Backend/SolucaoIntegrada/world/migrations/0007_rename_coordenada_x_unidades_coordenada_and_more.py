# Generated by Django 5.0 on 2024-01-02 15:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('world', '0006_alter_unidades_sistemas'),
    ]

    operations = [
        migrations.RenameField(
            model_name='unidades',
            old_name='coordenada_x',
            new_name='coordenada',
        ),
        migrations.RemoveField(
            model_name='unidades',
            name='coordenada_y',
        ),
    ]