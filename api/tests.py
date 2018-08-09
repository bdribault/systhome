import json

from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIRequestFactory, force_authenticate

from .views import DeviceDetail
from device.models import Device


class DeviceTestCase(TestCase):
    def setUp(self):
        Device.objects.create(name="light", type="LIGHT")
        User.objects.create(username="olivia")

        self.factory = APIRequestFactory()

        self.detail_view = DeviceDetail.as_view()
        pass

    def test_change_device(self):
        user = User.objects.get(username="olivia")
        device = Device.objects.get(name="light")

        self.assertEqual(device.status, "0")

        request = self.factory.put("/device/" + str(device.id), {"status": "1"})

        force_authenticate(request, user=user)

        response = self.detail_view(request, pk=device.id)
        response.render()

        self.assertEqual(response.status_code, 200)

        response_json = json.loads(response.content.decode("utf-8"))

        self.assertEqual(response_json["status"], "1")
        self.assertEqual(response_json["id"], device.id)
        self.assertEqual(response_json["name"], "light")

    def test_not_authenticated(self):
        pk = 42
        request = self.factory.put("/device/" + str(pk), {"status": "777"})

        response = self.detail_view(request, pk=pk)
        response.render()

        self.assertEqual(response.status_code, 401)
