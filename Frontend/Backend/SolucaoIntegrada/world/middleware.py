from urllib import request
import json
from django.utils.dateparse import parse_date
from .models import IPCA
import requests
class IPCAMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        self.fetchSaveIPCA()
        response = self.get_response(request)
        return response

    def fetchSaveIPCA(self):
        response = requests.get('https://api.bcb.gov.br/dados/serie/bcdata.sgs.10844/dados?formato=json')
        data = json.loads(response.text)

        for item in data:
            data_obj = parse_date(item['data'])
            variacao = float(item['valor'].replace(',','.'))

            ipca, created = IPCA.objects.get_or_create(data=data_obj, defaults={'variacao': variacao})

            if not created:
                ipca.variacao = variacao
                ipca.save()