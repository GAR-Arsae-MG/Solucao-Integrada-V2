from django.contrib.auth.models import Group
from world.models import Usuarios, Unidades, Ativos_Administrativos, Ativos_Operacionais
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['id', 'email', 'nome', 'funcao', 'criado_em', 'criado_por', 'agencia','imagem', 'groups']
        
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

