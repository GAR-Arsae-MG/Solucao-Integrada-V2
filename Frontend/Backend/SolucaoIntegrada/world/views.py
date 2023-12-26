import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import Group
from world.serializers import UserSerializer, GroupSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework import viewsets, status
from rest_framework.decorators import api_view


from world.models import Ativos, Localidades, unidades_do_sistema, Usuarios

# Create your views here.

def index(request):
    return HttpResponse("Hello, world. You're at the world index.")

@csrf_exempt
def Login(request):
   if request.method == 'POST': 
       data = json.loads(request.body)
       email = data.get('email')
       password = data.get('senha')
       user = authenticate(request, email=email, senha=password)
       if user is not None:
           login(request, user)
           return JsonResponse({'message': 'Logou com sucesso'})
       else:
           return JsonResponse({'message': 'Login falhou'})
   else:
       return JsonResponse({'message': 'Método inválido'})

@csrf_exempt
def Logout(request):
   if request.method == 'POST': 
       logout(request)
       return JsonResponse({'message': 'Deslogou com sucesso'})
   else:
       return JsonResponse({'message': 'Método Inválido'})

@csrf_exempt
def Register(request):
   if request.method == 'POST': 
       data = json.loads(request.body)
       email = data.get('email')
       name = data.get('nome')
       funcao = data.get('funcao')
       password = data.get('senha')
       user = Usuarios.objects.create_user(email=email, nome=name, funcao=funcao, senha=password)
       return JsonResponse({'message': 'Cadastrado com sucesso'})
   else:
       return JsonResponse({'message': 'Método Inválido'})


def users(request):
    if request.method == 'GET':
        users = Usuarios.objects.all().values()
        users_list = list(users)
        return JsonResponse(users_list, safe=False)
    else:
        return JsonResponse({'message': 'Consulta não permitida'})
    
def locals(request):
    if request.method == 'GET':
        locals = Localidades.objects.all().values()
        locals_list = list(locals)
        return JsonResponse(locals_list, safe=False)
    else:
        return JsonResponse({'message': 'Consulta não permitida'})
    
def ativos(request):
    if request.method == 'GET':
        ativos = Ativos.objects.all().values()
        ativos_list = list(ativos)
        return JsonResponse(ativos_list, safe=False)
    else:
        return JsonResponse({'message': 'Consulta não permitida'})
    
def system_units(request):
    if request.method == 'GET':
        system_units = unidades_do_sistema.objects.all().values()
        system_units_list = list(system_units)
        return JsonResponse(system_units_list, safe=False)
    else:
        return JsonResponse({'message': 'Consulta não permitida'})

