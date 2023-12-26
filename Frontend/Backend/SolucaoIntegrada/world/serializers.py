from django.contrib.auth.models import Group
from world.models import Usuarios, Localidades, unidades_do_sistema, Ativos
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['id', 'email', 'nome', 'funcao', 'criado_em', 'criado_por', 'agencia', 'imageUrl']
        
class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
        
class LocalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Localidades
        fields = '__all__'

class SystemUnitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = unidades_do_sistema
        fields = '__all__'

class AtivosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ativos
        fields = '__all__'

