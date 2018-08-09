from django.db import models

from device.models import Device


class Scene(models.Model):
    name = models.CharField(max_length=100, default="")

    def __str__(self):
        return self.name


class Action(models.Model):
    device = models.ForeignKey(Device, related_name="actions", on_delete=models.CASCADE)
    scene = models.ForeignKey(Scene, related_name="actions", on_delete=models.CASCADE)
    target = models.CharField(max_length=255, default="0")

    def __str__(self):
        # return self.scene.name + " - " + self.device.name + " = " + self.target
        return self.device.name + " = " + self.target
