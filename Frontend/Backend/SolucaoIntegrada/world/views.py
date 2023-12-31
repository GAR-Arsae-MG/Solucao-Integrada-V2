import json
from django.http import JsonResponse
from django.views import View
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate, login, get_user_model
from django.contrib.auth.models import Group
from world.serializers import UserSerializer, GroupSerializer, AtivosAdminSerializer, AtivosOperacionaisSerializer, UnitiesSerializer, FiltrosSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


from world.models import Ativos_Administrativos, Ativos_Operacionais, Filtros, Unidades, Usuarios
from django.conf import settings

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = Usuarios.objects.all().order_by('id')
    serializer_class = UserSerializer
    print(settings.AUTH_USER_MODEL)
    
    
class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    
class UnitiesViewSet(viewsets.ModelViewSet):
    queryset = Unidades.objects.all().order_by('id')
    serializer_class = UnitiesSerializer

class AtivosAdminViewSet(viewsets.ModelViewSet):
    queryset = Ativos_Administrativos.objects.all().order_by('id')
    serializer_class = AtivosAdminSerializer
    
class AtivosOperationalViewSet(viewsets.ModelViewSet):
    queryset = Ativos_Operacionais.objects.all().order_by('id')
    serializer_class = AtivosOperacionaisSerializer

class FiltrosViewSet(viewsets.ModelViewSet):
    queryset = Filtros.objects.all().order_by('id')
    serializer_class = FiltrosSerializer
    
@api_view(['POST'])
def register(request):
    data = request.data
    if Usuarios.objects.filter(email=data['email']).exists():
        return JsonResponse({'message': 'Email já existe.'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user = Usuarios.objects.create_user(
            email=data['email'],
            nome=data['nome'],
            senha=data['senha'],
        )
    except Exception as e:
        return JsonResponse({'message': f'Erro ao criar usuário: {e}'}, status=status.HTTP_400_BAD_REQUEST)
    Token.objects.create(user=user)
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
                'funcao_display': user.get_funcao_display(),
                'imagem': request.build_absolute_uri(user.imagem.url) if user.imagem else None,
                'agencia': user.agencia,
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
    
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user
    user_data = {
        'id': user.id,
        'nome': user.nome,
        'email': user.email,
        'funcao': user.funcao,
        'funcao_display': user.get_funcao_display(),
        'imagem': user.imagem,
        'agencia': user.agencia,
        'token': request.auth.key
    }
    return Response(user_data, status=status.HTTP_200_OK)

class revalidatePassword(APIView):
    def post(self, request):
        email = request.data.get('email')
        novaSenha = request.data.get('senha')
        Usuarios = get_user_model()
        try:
            Usuario = Usuarios.objects.revalidate_password(email, novaSenha)
            return Response({'detail': 'Senha revalidada com sucesso.'}, status=status.HTTP_200_OK)
        except Usuario.DoesNotExist:
            return Response({'detail': 'Email inexistente.'}, status=status.HTTP_400_BAD_REQUEST)


class FuncoesView(View):
    def get(self, request):
        try:
            funcoes = [funcao[1] for funcao in Usuarios.FUNCAO]
            return JsonResponse(list(funcoes), safe=False, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return JsonResponse({'detail': 'Nenhum registro encontrado.'}, status=status.HTTP_404_NOT_FOUND)
