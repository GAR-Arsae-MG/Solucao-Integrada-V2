# Generated by Django 5.0.1 on 2024-01-31 16:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('world', '0018_alter_unidades_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ativos_administrativos',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='ativos_operacionais',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]