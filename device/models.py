import logging

from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.db import models

logger = logging.getLogger(__name__)


TYPE_CHOICE = [("LIGHT", "light"), ("DIM_LIGHT", "dimmable light")]
IMPL_CHOICE = [("ZWAVE", "ZWave"), ("RF433", "RF 433 MHz")]


class Room(models.Model):
    name = models.CharField(max_length=100, default="", blank=True, null=True)

    def __str__(self):
        return self.name


class Device(models.Model):
    creator = models.ForeignKey(
        "auth.User", null=True, related_name="devices", on_delete=models.SET_NULL
    )
    rooms = models.ManyToManyField(Room)
    creation_date = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100, default="")
    status = models.CharField(max_length=255, default="0")
    type = models.CharField(choices=TYPE_CHOICE, max_length=100, default="")
    impl = models.CharField(choices=IMPL_CHOICE, max_length=100, default="")

    def __str__(self):
        return self.name

    @staticmethod
    def is_status_valide(device_type, device_status):
        if device_type == "LIGHT":
            if int(device_status) not in [0, 1]:
                return "Wrong value {}, Device of type LIGHT can only accept status 0 or 1".format(
                    device_status
                )

        if device_type == "DIM_LIGHT":
            int_status = int(device_status)
            if int_status < 0 or int_status > 255:
                return "Wrong value {}, Device of type DIM_LIGHT should have status in [|0 , 255|]".format(
                    device_status
                )
        return None

    def save(self, *args, **kwargs):
        # pylint: disable=arguments-differ
        super().save(*args, **kwargs)
        try:
            if self.impl == "ZWAVE":
                # pylint: disable=no-member
                self.zwave.apply()
        except ObjectDoesNotExist as e:
            logger.error("No Specialization entry associated with the device (%s)", str(e))

    def clean(self):
        error = Device.is_status_valide(self.type, self.status)
        if error:
            raise ValidationError(error)
