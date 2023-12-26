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
    nome = models.CharField(max_length=64)
    email = models.EmailField(max_length=64, unique=True)
    telefone = models.CharField(max_length=11)
    funcao = models.CharField(max_length=1, choices=FUNCAO, blank=False, null=False, default='R')
    is_staff = models.BooleanField(default=False)
    criado_em = models.DateTimeField(default=timezone.now)
    criado_por = models.CharField(max_length=64)
    agencia = models.CharField(max_length=30, blank=True, null=True)
    imageUrl = models.CharField(max_length=300, blank=True, null=True)
    
    groups = models.ManyToManyField(Group, related_name='usuarios_groups', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='usuarios_permissions', blank=True)
    
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
    



# não está completo
class Localidades(models.Model):
    SISTEMAS = (
        ('A', 'Água'),
        ('E', 'Esgoto'),
    )
    localidade = models.CharField(max_length=50)
    sistemas = models.IntegerField(choices=SISTEMAS, null=False, blank=False)
    TIPO = (
        ('E', 'Enterrado'),
        ('V', 'Visivel'),
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
    criado_em = models.DateTimeField(default=timezone.now)