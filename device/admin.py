from django.contrib import admin

from device.models import Device, Room


class DeviceInline(admin.TabularInline):
    model = Device.rooms.through


class RoomAdmin(admin.ModelAdmin):
    inlines = [
        DeviceInline,
    ]


class DeviceAdmin(admin.ModelAdmin):
    list_display = ("name", "status", "type", "impl")
    fieldsets = [(None, {"fields": [("name", "status", "type", "impl")]})]
    inlines = [
        DeviceInline,
    ]

    def save_model(self, request, obj, form, change):
        if getattr(obj, 'author', None) is None:
            obj.author = request.user
        obj.save()


admin.site.register(Room, RoomAdmin)
admin.site.register(Device, DeviceAdmin)
