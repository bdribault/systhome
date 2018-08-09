# Generated by Django 2.1 on 2018-08-09 13:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('device', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ZWave',
            fields=[
                ('device', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='device.Device')),
                ('node_id', models.IntegerField(blank=True, null=True)),
            ],
        ),
    ]
