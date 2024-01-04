from django.contrib import admin
from world.models import Ativos_Administrativos, Unidades, Usuarios, Ativos_Operacionais

# Register your models here.

class UsuariosAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'email', 'is_staff', 'telefone', 'funcao', 'imageUrl', 'imagem', 'criado_em', 'criado_por')
    list_display_links = ('nome', 'email')
    search_fields = ('nome', 'email', 'funcao')
    list_filter = ('funcao', 'criado_por', 'criado_em')
    
admin.site.register(Usuarios, UsuariosAdmin)


class UnidadesAdmin(admin.ModelAdmin):
    list_display = ('nome', 'sistemas', 'tipo', 'localidade')
    list_display_links = ('localidade', )
    search_fields = ('nome',)
    list_filter = ('tipo',)
    
admin.site.register(Unidades, UnidadesAdmin)


#Verificar se os campos choices de "models" devem ser inseridos no list display
class ativosOperacionaisAdmin(admin.ModelAdmin):
    list_display = ('nome_de_campo', 'classe','fase', 'tipo_investimento', 'etapa_do_servico', 'situacao_atual', 'proprietario', 'doacao', 'valor_original' , 'unidade','vida_util_reg_anos', 'vida_util_reg_meses', 'data_insercao', 'data_projeto', 'data_obra', 'data_operacao', 'criado_por', 'status', 'criado_em', 'codigo', 'coordenada_x', 'coordenada_y')
    list_display_links = ('nome_de_campo', 'criado_por')
    search_fields = ('nome_do_campo', 'codigo')
    list_filter = ('classe', 'fase', 'status')

admin.site.register(Ativos_Operacionais, ativosOperacionaisAdmin)
    

class ativosAdministrativosAdmin(admin.ModelAdmin):
    list_display = ( 'tipo_ativo', 'nome_ativo', 'código_ativo', 'criado_por', 'status', 'adquirido_por', 'proprietario', 'doacao', 'valor_original', 'valor_atual', 'data_insercao', 'previsao_substituicao', 'unidade')
    list_display_links = ('nome_ativo', 'proprietario')
    search_fields = ('nome_ativo', 'codigo_ativo')
    list_filter = ('tipo_ativo', 'status')
    
admin.site.register(Ativos_Administrativos, ativosAdministrativosAdmin)
