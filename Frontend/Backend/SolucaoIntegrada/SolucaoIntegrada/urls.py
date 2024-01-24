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
from django.conf.urls.static import static
from rest_framework import routers

from world.views import AtivosAdmClasseAtivoView, AtivosAdmStatusView, AtivosAdmTipoAtivoView, AtivosOpEtapaServicoView, AtivosOpStatusView, AtivosOpTipoAtivoView, AtivosOpTipoInvestimentoView, FuncoesView, StaffView, UnitiesSistemasView, UnitiesTypesView, UpdateCurrentUserView, UserViewSet, GroupViewSet, register, CustomAuthToken, logout_view, revalidatePassword, get_user_info, AtivosAdminViewSet, AtivosOperationalViewSet, UnitiesViewSet                                
from SolucaoIntegrada.settings import STATIC_URL

router = routers.DefaultRouter()
router.register('usuarios', UserViewSet)
router.register('grupos', GroupViewSet)
router.register('ativos-operacionais', AtivosOperationalViewSet)
router.register('ativos-administrativos', AtivosAdminViewSet)
router.register('unidades', UnitiesViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-token-auth/', CustomAuthToken.as_view(), name='api_token_auth'),
    path('api/register/', register, name='register'),
    path('api/logout/', logout_view, name='logout'),
    path('api/user-info/', get_user_info, name='get_user_info'),
    path('api/revalidate-password/', revalidatePassword.as_view(), name='revalidate_password'),
    path('api/updateCurrentUser/', UpdateCurrentUserView, name='update_current_user'),
    
    path('funcoes/', FuncoesView.as_view(), name='funcoes'),
    path('staff/', StaffView.as_view(), name='staff'),
    
    path('unidade-sistemas/', UnitiesSistemasView.as_view(), name='sistemasUnidades'),
    path('unidade-tipos/', UnitiesTypesView.as_view(), name='unidadeTipos'),
    
    path('ativos-op-tipo_ativo/', AtivosOpTipoAtivoView.as_view(), name='ativosOpTipoAtivo'),
    path('ativos-op-tipo_investimento/', AtivosOpTipoInvestimentoView.as_view(), name='ativosOpTipoInvestimento'),
    path('ativos-op-status/', AtivosOpStatusView.as_view(), name='ativosOpStatus'),
    path('ativos-op-etapa_servico/', AtivosOpEtapaServicoView.as_view(), name='ativosOpEtapaServico'),
    
    path('ativos-admin-status/', AtivosAdmStatusView.as_view(), name='ativosAdminStatus'),
    path('ativos-admin-tipo_ativo/', AtivosAdmTipoAtivoView.as_view(), name='ativosAdminTipoAtivo'),
    path('ativos-admin-classe_ativo/', AtivosAdmClasseAtivoView.as_view(), name='ativosAdminClasseAtivo'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
