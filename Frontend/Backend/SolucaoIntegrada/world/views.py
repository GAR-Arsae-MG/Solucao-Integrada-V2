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
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


from world.models import Ativos, Localidades, unidades_do_sistema, Usuarios

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = Usuarios.objects.all().order_by('id')
    serializer_class = UserSerializer
    
class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    
@api_view(['POST'])
def register(request):
    data = request.data
    if Usuarios.objects.filter(email=data['email']).exists():
        return JsonResponse({'message': 'Email já existe.'}, status=status.HTTP_400_BAD_REQUEST)
    user = Usuarios.objects.create_user(
        email=data['email'],
        nome=data['nome'],
        senha=data['senha'],
    )
    payload = jwt_payload_handler(user)
    token = jwt_encode_handler(payload)
    
    return Response({'Usuário cadastrado com sucesso'}, status=status.HTTP_201_CREATED)

class CustomAuthToken(ObtainAuthToken):
    def post(self, request):
        email = request.data.get('email')
        senha = request.data.get('senha')
        user = authenticate(request,email=email, password=senha)
        
        if user is not None:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            user_data = {
                'id': user.id,
                'nome': user.nome,
                'email': user.email,
                'funcao': user.funcao,
                'token': token.key
            }
            return Response(user_data, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Credenciais inválidas.'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def logout_view(request):
    token = request.data.get('token')
    if not token:
        return Response({'message': 'Token Ausente.'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        token = Token.objects.get(key=token)
        token.delete()
        return Response({'message': 'Logout bem-sucedido.'}, status=status.HTTP_200_OK)
    except Token.DoesNotExist:
        return Response({'message': 'Token Inexistente.'}, status=status.HTTP_400_BAD_REQUEST)
   
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

