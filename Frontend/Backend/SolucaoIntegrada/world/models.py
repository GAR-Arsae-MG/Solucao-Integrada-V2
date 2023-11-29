from django.contrib.gis.db import models

# Create your models here.
class Usuarios(models.Model):
    FUNCAO = (
        ('P', 'Prestador'),
        ('R', 'Regulador'),
        ('U', 'Usuario'),
        ('A', 'Administrador'),
    )
    nome = models.CharField(max_length=64)
    email = models.EmailField(max_length=64)
    telefone = models.CharField(max_length=11)
    funcao = models.CharField(max_length=1, choices=FUNCAO, blank=False, null=False)
    criado_em = models.DateField()
    criado_por = models.CharField(max_length=64)
    senha = models.CharField(max_length=128, blank=False, null=False, default="Padronizado")

    def __str__(self):
        return self.nome
    



# não está completo
class Localidades(models.Model):
    SISTEMAS = (
        ('A', 'Água'),
        ('E', 'Esgoto'),
        ('A/O', 'Administrativo/Operacional'),
    )
    localidade = models.CharField(max_length=50)
    sistemas = models.IntegerField(choices=SISTEMAS, null=False, blank=False)
    TIPO = (
        ('E', 'Enterrado'),
        ('V', 'Visivel'),
        ('O', 'Outro'),
    )
    tipo = models.CharField(max_length=1, choices=TIPO, blank=False, null=False)


# não está completo
class Ativos(models.Model):
    STATUS = (
       ('P/A', 'Projeto em andamento'),
       ('P/P', 'Projeto paralisado'),
       ('P/C', 'Projeto cancelado'),
       ('O/A', 'Obra em andamento'),
       ('O/P', 'Obra paralisada'),
       ('O/C', 'Obra cancelada'),
       ('A/O', 'Ativo em operação'),
       ('A', 'No almoxarifado'),
       ('R', 'Ativo reserva'),
       ('U', 'Ativo fora de uso'),
       ('D', 'Ativo desativado'),
    )
    nome_de_campo = models.CharField(max_length=64)
    classe = models.CharField(max_length=64)
    fase = models.CharField(max_length=64)
    TIPO_INVESTIMENTO = (
        ('I', 'Implantação'),
        ('C', 'Crescimento vegetativo'),
        ('A', 'Ampliação'),
        ('M', 'Melhorias'),
        ('R', 'Reposição de Ativos'),
        ('A/O', 'Administrativo/Operacional'),
    )
    tipo_investimento = models.CharField(max_length=3, choices=TIPO_INVESTIMENTO, blank=False, null=False)
    ETAPA_DO_SERVICO = (
        ('M', 'Manancial'),
        ('C', 'Captação'),
        ('A', 'Adução'),
        ('T', 'Tratamento'),
        ('R', 'Reservação'),
        ('D', 'Distribuição'),
        ('C', 'Coleta'),
        ('R', 'Recalque'),
        ('N', 'NA'),
    )
    etapa_do_servico = models.CharField(max_length=64, choices=ETAPA_DO_SERVICO, blank=False, null=False)
    situacao_atual = models.CharField(max_length=64)
    proprietario = models.CharField(max_length=64)
    doacao = models.BooleanField()
    valor_original = models.FloatField()
    vida_util_reg_anos = models.IntegerField()
    vida_util_reg_meses = models.IntegerField()
    data_insercao = models.DateField()
    data_projeto = models.DateField()
    data_obra = models.DateField()
    data_operacao = models.DateField()
    criado_por = models.CharField(max_length=64)
    status = models.CharField(max_length=3, choices=STATUS, blank=False, null=False)
    criado_em = models.DateTimeField(auto_now_add=True, editable=False)
    codigo = models.CharField(max_length=10, default="", unique=True)
    coordenada_x = models.PointField()
    coordenada_y = models.PointField()

    def __str__(self):
     return self.codigo

class unidades_do_sistema(models.Model):
    nome = models.CharField(max_length=64)
    id_localidade = models.IntegerField()
    id_sistemas = models.IntegerField()
    tipo = models.CharField(max_length=30)
    criado_por = models.CharField(max_length=64)
    status = models.CharField(max_length=64)
    criado_em = models.DateTimeField(auto_now_add=True, editable=False)