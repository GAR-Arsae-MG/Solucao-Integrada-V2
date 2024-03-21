from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# Defina a variável de ambiente padrão do Django para o arquivo 'settings' do seu projeto.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'SolucaoIntegrada.settings')

app = Celery('world')

# Namespace='CELERY' significa que todas as configurações relacionadas ao Celery devem ter o prefixo 'CELERY_'
app.config_from_object('django.conf:settings', namespace='CELERY')

# Carrega as tarefas (tasks) definidas em todos os aplicativos registrados do Django
app.autodiscover_tasks()
