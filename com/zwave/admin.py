from django.contrib import admin

# Register your models here.
from com.zwave.models import ZWave


class ZWaveAdmin(admin.ModelAdmin):
    pass


admin.site.register(ZWave, ZWaveAdmin)
