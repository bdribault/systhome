from django.db import models
from device.models import Device


class ZWave(models.Model):
    device = models.OneToOneField(Device, on_delete=models.CASCADE, primary_key=True)
    node_id = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.device.name

    def apply(self):
        # Todo
        print("OPEN ZWave : " + str(self.node_id) + " to " + str(self.device.status))
