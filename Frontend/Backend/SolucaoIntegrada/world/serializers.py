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
    
class UserUpdateSerializer(serializers.ModelSerializer):
    funcao = serializers.ChoiceField(choices=Usuarios.FUNCAO, required=False, allow_blank=True)
    imagem = serializers.ImageField(required=False, allow_null=True)
    class Meta:
        model = Usuarios
        fields = ['email', 'nome', 'funcao', 'agencia', 'imagem']
        
    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.nome = validated_data.get('nome', instance.nome)
        instance.funcao = validated_data.get('funcao', instance.funcao)
        instance.agencia = validated_data.get('agencia', instance.agencia)
        instance.imagem = validated_data.get('imagem', instance.imagem)
        instance.save()
        return instance
        
class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
        
class UnitiesSerializer(serializers.ModelSerializer):
    tipo_display = serializers.SerializerMethodField()
    sistemas_display = serializers.SerializerMethodField()
    classe_unidade_display = serializers.SerializerMethodField()
    
    class Meta:
        model = Unidades
        fields = ['id','nome','sistemas', 'sistemas_display', 'tipo', 'tipo_display','latitude', 'longitude','Município', 'localidade','Endereco', 'classe_unidade', 'classe_unidade_display']
        
    def get_tipo_display(self, obj):
        return {"key": obj.tipo, "value": obj.get_tipo_display()}
    
    def get_sistemas_display(self, obj):
        return {"key": obj.sistemas,"value": obj.get_sistemas_display()}
    
    def get_classe_unidade_display(self, obj):
        return {"key": obj.classe_unidade, "value": obj.get_classe_unidade_display()}
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
    etapa_sistemas_display = serializers.SerializerMethodField()
    
    class Meta:
        model = Ativos_Operacionais
        fields = [f.name for f in Ativos_Operacionais._meta.get_fields()] + ['status_display', 'tipo_ativo_display', 'tipo_investimento_display', 'etapa_do_servico_display'], 'etapa_sistemas_display'
        
    def get_status_display(self, obj):
        return {"key": obj.status, "value": obj.get_status_display()}
    
    def get_tipo_ativo_display(self, obj):
        return {"key": obj.tipo_ativo, "value": obj.get_tipo_ativo_display()}
    
    def get_tipo_investimento_display(self, obj):
        return {"key": obj.tipo_investimento, "value": obj.get_tipo_investimento_display()}
    
    def get_etapa_do_servico_display(self, obj):
        return {"key": obj.etapa_do_servico, "value": obj.get_etapa_do_servico_display()}
    
    def get_etapa_sistemas_display(self, obj):
        return {"key": obj.etapa_sistemas,"value": obj.get_etapa_sistemas_display()}

