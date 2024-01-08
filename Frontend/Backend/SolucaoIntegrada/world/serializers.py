from django.contrib.auth.models import Group
from world.models import Filtros, Usuarios, Unidades, Ativos_Administrativos, Ativos_Operacionais
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
    funcao_display = serializers.SerializerMethodField()
    
    class Meta:
        model = Usuarios
        fields = ['id', 'email', 'nome', 'funcao', 'funcao_display', 'criado_em', 'criado_por', 'agencia','imagem', 'groups']
        
    def get_funcao_display(self, obj):
        return obj.get_funcao_display()
        
class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
        
class UnitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unidades
        fields = '__all__'

class AtivosAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ativos_Administrativos
        fields = '__all__'

class AtivosOperacionaisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ativos_Operacionais
        fields = '__all__'
        
from rest_framework import serializers
from .models import Filtros

class FiltrosSerializer(serializers.Serializer):
    agencias = serializers.SerializerMethodField()
    funcoes = serializers.SerializerMethodField()
    is_staff = serializers.SerializerMethodField()
    unidades = serializers.SerializerMethodField()
    tipo_unidades = serializers.SerializerMethodField()
    sistemas = serializers.SerializerMethodField()
    ap_status = serializers.SerializerMethodField()
    ap_etapa_do_servico = serializers.SerializerMethodField()
    ap_tipo_ativo = serializers.SerializerMethodField()
    ap_tipo_investimento = serializers.SerializerMethodField()
    ad_status = serializers.SerializerMethodField()
    ad_classe_ativo = serializers.SerializerMethodField()
    ad_tipo_ativo = serializers.SerializerMethodField()

    def get_agencias(self, obj):
        return Filtros().get_agencias()

    def get_funcoes(self, obj):
        return Filtros().get_funcoes()

    def get_is_staff(self, obj):
        return Filtros().get_is_staff()

    def get_unidades(self, obj):
        return Filtros().get_unidades()

    def get_tipo_unidades(self, obj):
        return Filtros().get_tipo_unidades()

    def get_sistemas(self, obj):
        return Filtros().get_sistemas()

    def get_ap_status(self, obj):
        return Filtros().get_ap_status()

    def get_ap_etapa_do_servico(self, obj):
        return Filtros().get_ap_etapa_do_servico()

    def get_ap_tipo_ativo(self, obj):
        return Filtros().get_ap_tipo_ativo()

    def get_ap_tipo_investimento(self, obj):
        return Filtros().get_ap_tipo_investimento()

    def get_ad_status(self, obj):
        return Filtros().get_ad_status()

    def get_ad_classe_ativo(self, obj):
        return Filtros().get_ad_classe_ativo()

    def get_ad_tipo_ativo(self, obj):
        return Filtros().get_ad_tipo_ativo()
