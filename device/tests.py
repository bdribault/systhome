from django.core.exceptions import ValidationError
from django.test import TestCase

from .models import Device


class DeviceTestCase(TestCase):
    def setUp(self):
        Device.objects.create(name="light", type="LIGHT")
        Device.objects.create(name="dimmer", type="DIM_LIGHT")

    def test_light_status(self):
        light = Device.objects.get(name="light")

        with self.assertRaises(ValidationError):
            light.status = "10"
            light.clean()

        with self.assertRaises(ValidationError):
            light.status = 10
            light.clean()

        with self.assertRaises(ValidationError):
            light.status = -1
            light.clean()

        light.status = "0"
        light.clean()

        light.status = 0
        light.clean()

        light.status = "1"
        light.clean()

        light.status = 1
        light.clean()

    def test_dimmer_status(self):
        dimmer = Device.objects.get(name="dimmer")

        with self.assertRaises(ValidationError):
            dimmer.status = "256"
            dimmer.clean()

        with self.assertRaises(ValidationError):
            dimmer.status = -1
            dimmer.clean()

        dimmer.status = 0
        dimmer.clean()

        dimmer.status = 10
        dimmer.clean()

        dimmer.status = 255
        dimmer.clean()
