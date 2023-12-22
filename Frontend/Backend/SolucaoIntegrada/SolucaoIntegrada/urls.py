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

from world.views import index, Login, Logout, Register, users, ativos, locals, system_units

urlpatterns = [
    path('', index, name='index'),
    path('admin/', admin.site.urls),
    path('api/login', Login, name='login'),
    path('api/logout', Logout, name='logout'),
    path('api/registro', Register, name='register'),
    path('api/usuarios', users, name='users'),
    path('api/ativos', ativos, name='ativos'),
    path('api/locais', locals, name='locals'),
    path('api/unidades', system_units, name='system_units'),
]
