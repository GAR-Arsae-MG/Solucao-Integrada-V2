from datetime import datetime
import json
from django.utils.dateparse import parse_date
from world.models import IPCA
import requests
class IPCAMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        self.fetchSaveIPCA()
        response = self.get_response(request)
        return response
    
    # https://api.bcb.gov.br/dados/serie/bcdata.sgs.10844/dados?formato=json

    def fetchSaveIPCA(self):
        response = requests.get('https://servicodados.ibge.gov.br/api/v3/agregados/1737/periodos/-59999/variaveis/2266%7C63?localidades=N1[all]')
        data = json.loads(response.text)
        print(data)

        for resultado in data:
            if resultado['id'] == '63':
                for serie in resultado['resultados'][0]['series']:
                    for data_str, valor in serie['serie'].items():
                        data_obj = datetime.strptime(data_str, '%Y%m').strftime('%Y-%m-%d')
                        
                        variacao = float(valor.replace(',', '.')) if valor.replace(',','.').replace('.','',1).isdigit() else None
                        
                        ipca, created = IPCA.objects.get_or_create(data=data_obj, defaults={'variacao': variacao})
                        
                        if not created:
                            ipca.variacao = variacao
                            ipca.save()
                            
            elif resultado['id'] == '2266':
                for serie in resultado['resultados'][0]['series']:
                    for data_str, valor in serie['serie'].items():
                        data_obj = datetime.strptime(data_str, '%Y%m').strftime('%Y-%m-%d')
                        
                        num_indice_IBGE = float(valor.replace(', ', '.')) if valor.replace(',','.').replace('.','',1).isdigit() else None
                        
                        ipca, created = IPCA.objects.get_or_create(data=data_obj, defaults={'num_indice_IBGE': num_indice_IBGE})
                        
                        if not created:
                            ipca.num_indice_IBGE = num_indice_IBGE
                            ipca.save()