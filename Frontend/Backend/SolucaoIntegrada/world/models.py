from django.contrib.gis.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission
from django.utils import timezone

# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self, email, senha=None, **extra_fields):
        if not email:
            raise ValueError('O endereço de e-mail é obrigatório')
        email = self.normalize_email(email)
        usuario = self.model(email=email, **extra_fields)
        usuario.set_password(senha)
        usuario.save(using=self._db)
        return usuario
    
    def revalidate_password(self, email, novaSenha):
        usuario = self.model.objects.get(email=email)
        usuario.set_password(novaSenha)
        usuario.save(using=self._db)
        return usuario                
    
    def create_superuser(self, email, senha=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, senha, **extra_fields)
    
class Usuarios(AbstractBaseUser, PermissionsMixin):
    FUNCAO = (
        ('P', 'Prestador'),
        ('R', 'Regulador'),
        ('U', 'Usuario'),
        ('A', 'Administrador'),
    )
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=64)
    email = models.EmailField(max_length=64, unique=True)
    telefone = models.CharField(max_length=11)
    funcao = models.CharField(max_length=1, choices=FUNCAO, blank=False, null=False, default='R')
    is_staff = models.BooleanField(default=False)
    criado_em = models.DateTimeField(default=timezone.now)
    criado_por = models.CharField(max_length=64)
    agencia = models.CharField(max_length=30, blank=True, null=True)
    imagem = models.ImageField(upload_to='images/', blank=True, null=True)
    groups = models.ManyToManyField(Group, related_name='usuarios_groups', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='usuarios_permissions', blank=True)
    
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
    
    def get_funcao_display(self):
        funcao_dict = dict(Usuarios.FUNCAO)
        return funcao_dict.get(self.funcao)

class Unidades(models.Model):
    id = models.AutoField(primary_key=True)
    SISTEMAS = (
        ('A', 'Administrativo'),
        ('O', 'operacional(Unidades de tratamento)'),
    )
    nome = models.CharField(max_length=50)
    sistemas = models.CharField(choices=SISTEMAS, null=False, blank=False, default='Administrativo')
    TIPO = (
        ('S', 'Sede'),
        ('F', 'Filial'),
        ('TA', 'Tratamento de Água'),
        ('TE', 'Tratamento de Esgoto'),
        ('TB', 'Tratamento de Agua e Esgoto'),
    )
    tipo = models.CharField(max_length=2, choices=TIPO, blank=False, null=False, default='Filial')
    latitude = models.FloatField("Outlet Latitude", default=0.0, blank=False, help_text="Latitude")
    longitude = models.FloatField("Outlet Longitude", default=0.0, blank=False, help_text="Longitude")
    Município = models.CharField(max_length=100, null=True, blank=True)
    localidade = models.CharField("Sede Municipal",  max_length=100, null=True, blank=True, help_text="Distrito/Localidade")
    Endereco = models.CharField(max_length=120, null=True, blank=True)
    
    def __str__(self):
        return self.nome
    
    def get_tipo_display(self):
        tipo_dict = dict(Unidades.TIPO)
        return tipo_dict.get(self.tipo)
    
    def get_sistemas_display(self):
        sistemas_dict = dict(Unidades.SISTEMAS)
        return sistemas_dict.get(self.sistemas)

class Ativos_Operacionais(models.Model):
    id = models.AutoField(primary_key=True)
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
    TIPO_ATIVO = (
        ('V', 'Visivel'),
        ('E', 'Enterrado'),
    )
    tipo_ativo = models.CharField(max_length=1, choices=TIPO_ATIVO, blank=False, null=False, default='V')
    classe = models.CharField(max_length=64)
    fase = models.CharField(max_length=64)
    TIPO_INVESTIMENTO = (
        ('I', 'Implantação'),
        ('C', 'Crescimento vegetativo'),
        ('A', 'Ampliação'),
        ('M', 'Melhorias'),
        ('R', 'Reposição de Ativos'),
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
    valor_original = models.DecimalField(max_digits=10, decimal_places=2)
    vida_util_reg_anos = models.IntegerField()
    vida_util_reg_meses = models.IntegerField()
    unidade = models.ForeignKey(Unidades, on_delete=models.CASCADE, blank=False, null=False)
    data_insercao = models.DateField()
    data_projeto = models.DateField()
    data_obra = models.DateField()
    data_operacao = models.DateField()
    criado_por = models.CharField(max_length=64)
    status = models.CharField(max_length=3, choices=STATUS, blank=False, null=False, default='P/A')
    criado_em = models.DateTimeField(auto_now_add=True, editable=False)
    codigo = models.CharField(max_length=10, default="", unique=True)
    latitude = models.FloatField("Outlet Latitude", default=0.0, blank=False, help_text="Latitude")
    longitude = models.FloatField("Outlet Longitude", default=0.0, blank=False, help_text="Longitude")
    Município = models.CharField(max_length=100, null=True, blank=True)
    localidade = models.CharField("Sede Municipal",  max_length=100, null=True, blank=True, help_text="Distrito/Localidade")
    Endereco = models.CharField(max_length=120, null=True, blank=True)

    def __str__(self):
     return self.codigo
 
    def get_status_display(self):
        status_dict = dict(Ativos_Operacionais.STATUS)
        return status_dict.get(self.status)
    
    def get_tipo_ativo_display(self):
        tipo_ativo_dict = dict(Ativos_Operacionais.TIPO_ATIVO)
        return tipo_ativo_dict.get(self.tipo_ativo)
    
    def get_tipo_investimento_display(self):
        tipo_investimento_dict = dict(Ativos_Operacionais.TIPO_INVESTIMENTO)
        return tipo_investimento_dict.get(self.tipo_investimento)
    
    def get_etapa_do_servico_display(self):
        etapa_do_servico_dict = dict(Ativos_Operacionais.ETAPA_DO_SERVICO)
        return etapa_do_servico_dict.get(self.etapa_do_servico)
 
class Ativos_Administrativos(models.Model):
    id = models.AutoField(primary_key=True)
    TIPO_ATIVO = (
        ('A', 'Automóvel'),
        ('M', 'Móvel'),
        ('I', 'Imóvel'),
        ('E', 'Eletrônico')
    )
    tipo_ativo = models.CharField(max_length=1, choices=TIPO_ATIVO, blank=False, null=False, default='I')
    nome_ativo = models.CharField(max_length=64, blank=False, null=False)
    código_ativo = models.CharField(max_length=64, blank=False, null=False)
    CLASSE_ATIVO = (
        ('P', 'Pessoal'),
        ('C', 'Computador'),
        ('I', 'Impressora'),
        ('V', 'Veículo'),
        ('E', 'Eletrodomestico'),
        ('G', 'Geral')
    )
    classe_ativo = models.CharField(max_length=1, choices=CLASSE_ATIVO, blank=False, null=False, default='G')
    proprietario = models.CharField(max_length=64, blank=False, null=False)
    doacao = models.BooleanField()
    valor_original = models.DecimalField(max_digits=10, decimal_places=2)
    valor_atual = models.DecimalField(max_digits=10, decimal_places=2)
    STATUS = (
        ('F', 'Ativo Em Funcionamento'),
        ('D', 'Ativo Desativado'),
        ('R', 'Ativo Reservado'),
        ('P', 'Ativo Paralisado'),
        ('R', 'Ativo em Reforma/Reparo'),
        ('C', 'Ativo Cancelado'),
        ('O', 'Ativo Obsoleto'),
        ('U', 'Ativo Fora de Uso')
    )
    status = models.CharField(max_length=3, choices=STATUS, blank=False, null=False, default='F')
    data_insercao = models.DateField()
    previsao_substituicao = models.DateField()
    unidade = models.ForeignKey(Unidades, on_delete=models.CASCADE, blank=False, null=False)
    criado_por = models.CharField(max_length=64)
    adquirido_por = models.CharField(max_length=64)
    
    def get_tipo_ativo_display(self):
        tipo_ativo_dict = dict(Ativos_Administrativos.TIPO_ATIVO)
        return tipo_ativo_dict.get(self.tipo_ativo)
    
    def get_classe_ativo_display(self):
        classe_ativo_dict = dict(Ativos_Administrativos.CLASSE_ATIVO)
        return classe_ativo_dict.get(self.classe_ativo)
    
    def get_status_display(self):
        status_dict = dict(Ativos_Administrativos.STATUS)
        return status_dict.get(self.status)
    
    
