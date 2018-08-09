from django.contrib import admin

from scene.models import Action, Scene


class SceneInline(admin.TabularInline):
    model = Action


class SceneAdmin(admin.ModelAdmin):
    inlines = (SceneInline,)


class ActionAdmin(admin.ModelAdmin):
    list_display = ("get_device_name", "get_scene_name", "target")

    def get_device_name(self, obj):
        return obj.device.name
    get_device_name.short_description = 'device'
    get_device_name.admin_order_field = 'device'

    def get_scene_name(self, obj):
        return obj.scene.name
    get_scene_name.short_description = 'scene'
    get_scene_name.admin_order_field = 'scene'


admin.site.register(Scene, SceneAdmin)
admin.site.register(Action, ActionAdmin)
