# Generated by Django 5.0 on 2024-03-22 13:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('world', '0029_ipca_mes_atual'),
    ]

    operations = [
        migrations.AddField(
            model_name='ipca',
            name='porcentagem_final',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
    ]
