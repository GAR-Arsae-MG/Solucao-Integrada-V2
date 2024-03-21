from datetime import datetime
import json
import requests
from requests.exceptions import RequestException
from world.models import IPCA

def fetchSaveIPCA():
    url = 'https://servicodados.ibge.gov.br/api/v3/agregados/1737/periodos/-59999/variaveis/2266%7C63?localidades=N1[all]'
    try:
        response = requests.get(url=url)
    except RequestException as e:
        print(f"Erro ao buscar os dados: {e}")
        return

    if response.status_code == 200:
        data = json.loads(response.text)
        print('Dados obtidos com sucesso!')

        # Dicionário para armazenar os dados antes de salvar/atualizar
        dados_ipca = {}

        for resultado in data:
            for serie in resultado['resultados'][0]['series']:
                for data_str, valor in serie['serie'].items():
                    data_obj = datetime.strptime(data_str, '%Y%m').strftime('%Y-%m-01')
                    print(f'Dados de data: {data_obj}')
                    if data_obj not in dados_ipca:
                        dados_ipca[data_obj] = {'variacao': None, 'num_indice_IBGE': None}

                    try:
                        valor_float = float(valor.replace(',', '.'))
                    except ValueError:
                        valor_float = None
                    
                    if resultado['id'] == '63':
                        dados_ipca[data_obj]['variacao'] = valor_float
                        print('Variação: ', dados_ipca[data_obj]['variacao'])
                    elif resultado['id'] == '2266':
                        dados_ipca[data_obj]['num_indice_IBGE'] = valor_float
                        print('Número do índice IBGE: ', dados_ipca[data_obj]['num_indice_IBGE'])

        # Agora vamos criar ou atualizar os objetos IPCA na base de dados
        for data_obj, valores in dados_ipca.items():
            ipca, created = IPCA.objects.get_or_create(data=data_obj, defaults=valores)
            if not created:
                IPCA.objects.filter(data=data_obj).update(**valores)
    else:
        print(f'Erro ao buscar os dados requisitados: {response.status_code}')