"""
URL configuration for SolucaoIntegrada project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django import views
from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from rest_framework import routers

from world.views import AtivosViewSet, LocalsViewSet, SystemUnitsViewSet, UserViewSet, GroupViewSet, register, CustomAuthToken, logout_view, revalidatePassword, get_user_info                                
from SolucaoIntegrada.settings import STATIC_URL

router = routers.DefaultRouter()
router.register('usuarios', UserViewSet)
router.register('grupos', GroupViewSet)
router.register('ativos', AtivosViewSet)
router.register('locais', LocalsViewSet)
router.register('unidades', SystemUnitsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-token-auth/', CustomAuthToken.as_view(), name='api_token_auth'),
    path('api/register/', register, name='register'),
    path('api/logout/', logout_view, name='logout'),
    path('api/user-info/', get_user_info, name='get_user_info'),
    path('api/revalidate-password/', revalidatePassword.as_view(), name='revalidate_password'),
]
