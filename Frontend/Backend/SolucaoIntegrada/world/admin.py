from django.contrib import admin
from world.models import Ativos, Localidades, Usuarios, unidades_do_sistema

# Register your models here.

class UsuariosAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'email', 'is_staff', 'telefone', 'funcao', 'criado_em', 'criado_por')
    list_display_links = ('nome', 'email')
    search_fields = ('nome', 'email', 'funcao')
    list_filter = ('funcao', 'criado_por', 'criado_em')
    
admin.site.register(Usuarios, UsuariosAdmin)


class localidadesAdmin(admin.ModelAdmin):
    list_display = ('localidade', 'sistemas', 'tipo')
    list_display_links = ('localidade', )
    search_fields = ('localidade',)
    list_filter = ('tipo',)
    
admin.site.register(Localidades, localidadesAdmin)


#Verificar se os campos choices de "models" devem ser inseridos no list display
class ativosAdmin(admin.ModelAdmin):
    list_display = ('nome_de_campo', 'classe','fase', 'tipo_investimento', 'etapa_do_servico', 'situacao_atual', 'proprietario', 'doacao', 'valor_original' , 'vida_util_reg_anos', 'vida_util_reg_meses', 
                 'data_insercao', 'data_projeto', 'data_obra', 'data_operacao', 'criado_por', 'status', 'criado_em', 'codigo', 'coordenada_x', 'coordenada_y')
    list_display_links = ('nome_de_campo', 'criado_por')
    search_fields = ('nome_do_campo', 'codigo')
    list_filter = ('classe', 'fase', 'status')

admin.site.register(Ativos, ativosAdmin)
    

class unidades_do_sistemaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'id_localidade', 'id_sistemas', 'tipo', 'criado_por', 'status', 'criado_em')
    list_display_links = ('nome', 'id_localidade')
    search_fields = ('nome', 'id_sistemas')
    list_filter = ('tipo', 'status')
    
admin.site.register(unidades_do_sistema, unidades_do_sistemaAdmin)
