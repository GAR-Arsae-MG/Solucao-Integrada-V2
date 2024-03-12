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
    nome = models.CharField(max_length=50)
    código = models.CharField(max_length=8, null=True, blank=True)
    SISTEMAS = (
        ('A', 'Administrativo'),
        ('O', 'operacional'),
    )
    sistemas = models.CharField(choices=SISTEMAS, null=False, blank=False, default='Administrativo')
    TIPO = (
        ('AS', 'Sede Administrativa'),
        ('AF', 'Filial Administrativa'),
        ('EAB', 'Estação Elevatória de Água Bruta'),
        ('EEE', 'Estação Elevatória de Esgoto'),
        ('ETA', 'Estação de Tratamento de Água'),
        ('ETE', 'Estação de Tratamento de Esgoto'),
        ('BGE', 'Barragem'),
    )
    tipo = models.CharField(max_length=3, choices=TIPO, blank=False, null=False, default='Filial Administrativa')
    CLASSE_UNIDADE = (
        ('E/E/IC', 'Edificação, Estrutura e Instalações Civis'),
        ('T', 'Terreno'),
    )
    classe_unidade = models.CharField(max_length=10, choices=CLASSE_UNIDADE, blank=False, null=False, default='E/E/IC')
    ETAPA_SISTEMAS = (
        ('C', 'Captação'),
        ('CO', 'Coleta'),
        ('D', 'Distribuição'),
        ('R', 'Reservação'),
        ('T', 'Tratamento'),
        ('N/A', 'Não se Aplica'),
    )
    etapa_sistemas = models.CharField(max_length=3, choices=ETAPA_SISTEMAS, blank=False, null=False, default='N/A')
    capacidade_volume = models.IntegerField(null=True, blank=True, help_text='Capacidade de Volumes (m3)')
    latitude = models.FloatField("Outlet Latitude", default=0.0, blank=False, help_text="Latitude")
    longitude = models.FloatField("Outlet Longitude", default=0.0, blank=False, help_text="Longitude")
    Município = models.CharField(max_length=100, null=True, blank=True)
    data_operacao = models.DateField(help_text='Data de Início da Operação', null=True, blank=True)
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
    
    def get_classe_unidade_display(self):
        classe_unidade_dict = dict(Unidades.CLASSE_UNIDADE)
        return classe_unidade_dict.get(self.classe_unidade)
    
     
    def get_etapa_sistemas_display(self):
        etapa_sistemas_dict = dict(Unidades.ETAPA_SISTEMAS)
        return etapa_sistemas_dict.get(self.etapa_sistemas)

class Ativos_Operacionais(models.Model):
    id = models.AutoField(primary_key=True)
    nome_de_campo = models.CharField(max_length=64, help_text='Nome das partes')
    codigo = models.CharField(max_length=10, default="", unique=True)
    data_insercao = models.DateField()
    data_projeto = models.DateField()
    data_obra = models.DateField()
    data_operacao = models.DateField()
    desc_complementar = models.CharField(max_length=100, null=True, blank=True)
    especie = models.CharField(max_length=64, blank=True, null=True)
    classificacao_regulatoria = models.CharField(max_length=64, blank=True, null=True)
    indenizavel = models.CharField(max_length=10, blank=True, null=True)
    TIPO_ATIVO = (
        ('V', 'Visivel'),
        ('E', 'Enterrado'),
    )
    tipo_ativo = models.CharField(max_length=1, choices=TIPO_ATIVO, blank=False, null=False, default='V')
    SUBUNIDADE = (
        ('C/A', 'Caixa de Areia'),
        ('C/Q', 'Caixa de Química'),
        ('C', 'Coagulador'),
        ('D', 'Decantador'),
        ('DP', 'Depósito'),
        ('F/B', 'Filtro Biológico'),
        ('F/R', 'Filtro Rápido'),
        ('G', 'Grade'),
        ('L', 'Laboratório'),
        ('L/S', 'Leito de secagem'),
        ('M/V', 'Medidor de Vazão'),
        ('RU', 'Reator UASB'),
        ('T/C', 'Tanque de Contato'),
        ("N/A", 'Não se aplica'),
    )
    subunidade = models.CharField(max_length=3, choices=SUBUNIDADE, blank=False, null=False, default='N/A')
    CLASSE_ATIVO = (
        ('BDA', 'Bomba De Agua'),
        ('E', 'Equipamento'),
        ('ME', 'Motor Elétrico'),
        ('RDA', 'Rede de distribuição de Água'),
        ('RDE', 'Rede Coletora de Esgoto'),
        ('O', 'Outros'),
    )
    classe_ativo = models.CharField(max_length=3, choices=CLASSE_ATIVO, blank=False, null=False, default='O')
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
    status = models.CharField(max_length=3, choices=STATUS, blank=False, null=False, default='P/A')
    fase = models.CharField(max_length=64)
    TIPO_INVESTIMENTO = (
        ('I', 'Implantação'),
        ('C', 'Crescimento vegetativo'),
        ('A', 'Ampliação'),
        ('M', 'Melhorias'),
        ('R', 'Reposição de Ativos'),
    )
    tipo_investimento = models.CharField(max_length=3, choices=TIPO_INVESTIMENTO, blank=False, null=False, default='I')
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
    etapa_do_servico = models.CharField(max_length=1, choices=ETAPA_DO_SERVICO, blank=False, null=False, default='T')
    conj_motobomba = models.CharField(max_length=100, blank=True, null=True)
    capacidade_potencia = models.DecimalField("Capacidade de Potência(cv)",max_digits=4, decimal_places=2, null=True, blank=True, help_text='Apenas para conjunto motobomba')
    capacidade_vazao = models.DecimalField("Capacidade de vazão(l/s)", max_digits=4 , decimal_places=2, null=True, blank=True, help_text='Apenas para conjunto motobomba')
    MATERIAL = (
        ('A', 'Aço'),
        ('C/C', 'Cerâmica e Cimento'),
        ('CO', 'Concreto'),
        ('D', 'Defofo'),
        ('F', 'Ferro'),
        ('FFU', 'Ferro Fundido'),
        ('F/P', 'Ferro/PVC'),
        ('FB', 'Fibra'),
        ('MC', 'Malha Cerâmica'),
        ('O', 'Ocre'),
        ('P', 'PBA'),
        ('N/A', 'Não se Aplica'),
    )
    material = models.CharField(max_length=3, choices=MATERIAL, blank=False, null=False, default='N/A')
    ESTADO_CONSERVACAO = (
        ('N', 'Novo'),
        ('B', 'Bom'),
        ('R', 'Regular'),
        ('N/R', 'Necessita de Reparos'),
        ('D', 'Desgastado'),
        ('I', 'Inutilizável'),
        ('N/A', 'Não se Aplica'),
    )
    estado_conservacao = models.CharField(max_length=3, choices=ESTADO_CONSERVACAO, blank=False, null=False, default='N/A')
    situacao_atual = models.CharField(max_length=64)
    ORIGEM = (
        ('P', 'Próprio'),
        ('T', 'Terceiro(s)'),
        ('D', 'Doação'),
    )
    origem = models.CharField(max_length=1, choices=ORIGEM, blank=False, null=False, default='P')
    proprietario = models.CharField(max_length=64)
    valor_original = models.DecimalField(max_digits=10, decimal_places=2)
    vida_util_reg_anos = models.IntegerField()
    vida_util_reg_meses = models.IntegerField()
    unidade = models.ForeignKey(Unidades, on_delete=models.CASCADE, blank=False, null=False)
    criado_por = models.CharField(max_length=64)
    criado_em = models.DateTimeField(auto_now_add=True, editable=True)
    latitude = models.FloatField("Outlet Latitude", default=0.0, blank=False, help_text="Latitude")
    longitude = models.FloatField("Outlet Longitude", default=0.0, blank=False, help_text="Longitude")
    Município = models.CharField(max_length=100, null=True, blank=True)
    localidade = models.CharField("Sede Municipal",  max_length=100, null=True, blank=True, help_text="Distrito/Localidade")
    Endereco = models.CharField(max_length=120, null=True, blank=True)
    extensao = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    diâmetro = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
# Campos com cálculos numéricos



#funções de formatação de selects

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
        ('VM', 'Veículo Motorizado'),
        ('VP', 'Veículo Manual'),
        ('E', 'Eletrodoméstico'),
        ('G', 'Geral'),
        ('N/A', 'Não se aplica')
    )
    classe_ativo = models.CharField(max_length=3, choices=CLASSE_ATIVO, blank=False, null=False, default='G')
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
    data_insercao = models.DateField(help_text='Data de Cadastro do Item', blank=True, null=True) 
    data_operacao = models.DateField(help_text='Data de Entrada em Uso do Item', blank=True, null=True)
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
    
    
