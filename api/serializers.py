from rest_framework import serializers

from device.models import Device, Room


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ("id", "name")


class SimpleRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ("id",)


class DeviceSerializer(serializers.ModelSerializer):
    rooms = SimpleRoomSerializer(read_only=True, many=True)

    def validate(self, attrs):
        device_type = attrs.get("type", self.instance.type)
        device_status = attrs.get("status", self.instance.status)

        error = Device.is_status_valide(device_type, device_status)
        if error:
            raise serializers.ValidationError(error)
        return attrs

    class Meta:
        model = Device
        fields = ("id", "name", "status", "type", "rooms")
        validators = []
