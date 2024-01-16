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
    class Meta:
        model = Unidades
        fields = '__all__'
        
    def get_tipo_display(self, obj):
        return obj.get_tipo_display()
    
    def get_sistemas_display(self, obj):
        return obj.get_sistemas_display()

class AtivosAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ativos_Administrativos
        fields = '__all__'
        
    def tipo_ativo_display(self, obj):
        return obj.get_tipo_ativo_display()
    
    def classe_ativo_display(self, obj):
        return obj.get_classe_ativo_display()
    
    def status_display(self, obj):
        return obj.get_status_display()

class AtivosOperacionaisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ativos_Operacionais
        fields = '__all__'
        
    def get_status_display(self, obj):
        return obj.get_status_display()
    
    def get_tipo_ativo_display(self, obj):
        return obj.get_tipo_ativo_display()
    
    def get_tipo_investimento_display(self, obj):
        return obj.get_tipo_investimento_display()
    
    def get_etapa_do_servico_display(self, obj):
        return obj.get_etapa_do_servico_display()
        
