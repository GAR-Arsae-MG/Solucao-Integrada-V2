from django.contrib.auth.models import Group
from world.models import Usuarios, Unidades, Ativos_Administrativos, Ativos_Operacionais
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
    tipo_display = serializers.SerializerMethodField()
    sistemas_display = serializers.SerializerMethodField()
    
    class Meta:
        model = Unidades
        fields = ['nome','sistemas', 'sistemas_display', 'tipo', 'tipo_display','latitude', 'longitude','Município', 'localidade','Endereco']
        
    def get_tipo_display(self, obj):
        return obj.get_tipo_display()
    
    def get_sistemas_display(self, obj):
        return obj.get_sistemas_display()

class AtivosAdminSerializer(serializers.ModelSerializer):
    tipo_ativo_display = serializers.SerializerMethodField()
    classe_ativo_display = serializers.SerializerMethodField()
    status_display = serializers.SerializerMethodField()
    
    class Meta:
        model = Ativos_Administrativos
        fields = [f.name for f in Ativos_Administrativos._meta.get_fields()] + ['tipo_ativo_display', 'classe_ativo_display', 'status_display']
        
    def get_tipo_ativo_display(self, obj):
        return obj.get_tipo_ativo_display()
    
    def get_classe_ativo_display(self, obj):
        return obj.get_classe_ativo_display()
    
    def get_status_display(self, obj):
        return obj.get_status_display()

class AtivosOperacionaisSerializer(serializers.ModelSerializer):
    status_display = serializers.SerializerMethodField()
    tipo_ativo_display = serializers.SerializerMethodField()
    tipo_investimento_display = serializers.SerializerMethodField()
    etapa_do_servico_display = serializers.SerializerMethodField()
    
    class Meta:
        model = Ativos_Operacionais
        fields = [f.name for f in Ativos_Operacionais._meta.get_fields()] + ['status_display', 'tipo_ativo_display', 'tipo_investimento_display', 'etapa_do_servico_display']
        
    def get_status_display(self, obj):
        return obj.get_status_display()
    
    def get_tipo_ativo_display(self, obj):
        return obj.get_tipo_ativo_display()
    
    def get_tipo_investimento_display(self, obj):
        return obj.get_tipo_investimento_display()
    
    def get_etapa_do_servico_display(self, obj):
        return obj.get_etapa_do_servico_display()
        
