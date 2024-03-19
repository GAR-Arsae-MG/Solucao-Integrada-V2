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
        if response.status_code == 200:  
            data = json.loads(response.text)
            print('Dados obtidos com sucesso!')

            for resultado in data:
                for serie in resultado['resultados'][0]['series']:
                    for data_str, valor in serie['serie'].items():
                        data_obj = datetime.strptime(data_str, '%Y%m').strftime('%Y-%m-01')
                        print('Dados de data:',data_obj)
                        
                        try:
                            valor_float = float(valor.replace(',', '.'))
                        except ValueError:
                            valor_float = None
                        
                        if resultado['id'] == '63':
                            variacao = valor_float
                            print('Dados de variação: ',variacao)
                            defaults = {'variacao': variacao}
                            ipca, created = IPCA.objects.get_or_create(data=data_obj, defaults=defaults)
                        elif resultado['id'] == '2266':
                            num_indice_IBGE = valor_float
                            print('Dados de indice: ', num_indice_IBGE)
                            defaults = {'num_indice_IBGE': num_indice_IBGE}
                            ipca, created = IPCA.objects.get_or_create(data=data_obj, defaults=defaults)
                        
                        if not created:
                            if resultado['id'] == '63':
                                ipca.variacao = variacao
                            elif resultado['id'] == '2266':
                                ipca.num_indice_IBGE = num_indice_IBGE
                            else:
                                print(f'ID inesperado: {resultado["id"]}')
                            ipca.save()
        else:
            print(f'Erro ao buscar os dados requisitados: {response.status_code}')