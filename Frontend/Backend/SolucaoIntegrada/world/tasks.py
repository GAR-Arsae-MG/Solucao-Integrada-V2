from celery import shared_task
from world.services import fetchSaveIPCA

@shared_task
def fetch_save_ipca_task():
    fetchSaveIPCA()
