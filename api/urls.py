from django.urls import path, include
from rest_framework.authtoken import views as drf_views
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    path('auth', drf_views.obtain_auth_token, name='auth'),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth', drf_views.obtain_auth_token),
    path('room/', views.RoomList.as_view()),
    path('device/', views.DeviceList.as_view()),
    path('device/<int:pk>/', views.DeviceDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
