# Generated by Django 2.1 on 2018-08-09 13:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Device',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creation_date', models.DateTimeField(auto_now_add=True)),
                ('name', models.CharField(default='', max_length=100)),
                ('status', models.CharField(default='0', max_length=255)),
                ('type', models.CharField(choices=[('LIGHT', 'light'), ('DIM_LIGHT', 'dimmable light')], default='', max_length=100)),
                ('impl', models.CharField(choices=[('ZWAVE', 'ZWave'), ('RF433', 'RF 433 MHz')], default='', max_length=100)),
                ('creator', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='devices', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, default='', max_length=100, null=True)),
            ],
        ),
        migrations.AddField(
            model_name='device',
            name='rooms',
            field=models.ManyToManyField(to='device.Room'),
        ),
    ]
