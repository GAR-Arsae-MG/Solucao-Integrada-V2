# Generated by Django 5.0 on 2024-03-01 12:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('world', '0019_alter_ativos_administrativos_id_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='ativos_operacionais',
            name='diâmetro',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name='ativos_operacionais',
            name='extensao',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
    ]
