from rest_framework import generics, permissions

from device.models import Device, Room
from .serializers import DeviceSerializer, RoomSerializer


class RoomList(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class DeviceList(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    queryset = Device.objects.all()
    serializer_class = DeviceSerializer


class DeviceDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    queryset = Device.objects.all()
    serializer_class = DeviceSerializer
