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
        

class FiltrosSerializer(serializers.ModelSerializer):
    funcao = serializers.SerializerMethodField()
    
    class Meta:
        model = Filtros
        fields =  ('id', 'funcao', 'agencia', 'sistemas', 'unidade_tipo', 'ativos_op_status', 'ativos_ad_status', 'ativos_op_tipo_investimento', 'ativos_ad_classe_ativo')
    
    def get_funcao(self, obj):
        if obj.usuario:
            return obj.usuario.get_funcao_display()
        else:
            return None
        
