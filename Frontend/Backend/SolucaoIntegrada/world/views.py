import json
from django.http import JsonResponse
from django.views import View
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate, login, get_user_model
from django.contrib.auth.models import Group
from world.serializers import IPCASerializer, UserSerializer, GroupSerializer, AtivosAdminSerializer, AtivosOperacionaisSerializer, UnitiesSerializer, UserUpdateSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings
from rest_framework.authentication import TokenAuthentication
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView
from django_filters.rest_framework import DjangoFilterBackend

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


from world.models import Ativos_Administrativos, Ativos_Operacionais, Unidades, Usuarios

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = Usuarios.objects.all().order_by('id')
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['funcao', 'is_staff', 'agencia']
    
class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    
class UnitiesViewSet(viewsets.ModelViewSet):
    queryset = Unidades.objects.all().order_by('id')
    serializer_class = UnitiesSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['tipo', 'sistemas']
    
class IPCAViewSet(viewsets.ModelViewSet):
    queryset = Unidades.objects.all().order_by('id')
    serializer_class = IPCASerializer   

class AtivosAdminViewSet(viewsets.ModelViewSet):
    queryset = Ativos_Administrativos.objects.all().order_by('id')
    serializer_class = AtivosAdminSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['tipo_ativo', 'classe_ativo', 'status']
    
    
class AtivosOperationalViewSet(viewsets.ModelViewSet):
    queryset = Ativos_Operacionais.objects.all().order_by('id')
    serializer_class = AtivosOperacionaisSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['tipo_ativo', 'tipo_investimento', 'status', 'etapa_do_servico']
    
    
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


class UpdateCurrentUserView(UpdateAPIView):
    def get_object(self):
        return self.request.user
    
    def put(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            user = self.get_object()
            data = request.data.copy()
            
            for field in list(data):
                if getattr(user, field) == data[field]:
                    del data[field]
                    
            serializer = UserUpdateSerializer(user, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            print('Nenhum usuário autenticado.')
            return Response({'detail': 'Nenhum usuário autenticado.'}, status=status.HTTP_401_UNAUTHORIZED)

# Views para retornar valores específicos dos models.

class FuncoesView(View):
    def get(self, request):
        try:
            funcoes = [funcao[1] for funcao in Usuarios.FUNCAO]
            return JsonResponse(list(funcoes), safe=False, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return JsonResponse({'detail': 'Nenhum registro encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        
class StaffView(View):
    def get(self, request):
        return JsonResponse([True, False], safe=False, status=status.HTTP_200_OK)
    
class UnitiesSistemasView(View):
    def get(self, request):
        try:
            sistemas = [{"key": sistema[0], "value": sistema[1]} for sistema in Unidades.SISTEMAS]
            return JsonResponse(sistemas, safe=False, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return JsonResponse({'detail': 'Nenhum registro encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        
class UnitiesTypesView(View):
    def get(self, request):
        try:
            tipos = [{"key": tipo[0], "value": tipo[1]} for tipo in Unidades.TIPO]
            return JsonResponse(tipos, safe=False, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return JsonResponse({'detail': 'Nenhum registro encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        
class AtivosOpTipoAtivoView(View):
    def get(self, request):
        try:
            tipos = [{"key": tipo[0], "value": tipo[1]} for tipo in Ativos_Operacionais.TIPO_ATIVO]
            return JsonResponse(list(tipos), safe=False, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return JsonResponse({'detail': 'Nenhum registro encontrado.'}, status=status.HTTP_404_NOT_FOUND)


class AtivosOpTipoInvestimentoView(View):
    def get(self, request):
        try:
            tipos = [{"key": tipo[0], "value": tipo[1]} for tipo in Ativos_Operacionais.TIPO_INVESTIMENTO]
            return JsonResponse(list(tipos), safe=False, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return JsonResponse({'detail': 'Nenhum registro encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        
class AtivosOpStatusView(View):
    def get(self, request):
        try:
            statusOP = [{"key": status[0], "value": status[1]} for status in Ativos_Operacionais.STATUS]
            return JsonResponse(list(statusOP), safe=False, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return JsonResponse({'detail': 'Nenhum registro encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        
class AtivosOpEtapaServicoView(View):
    def get(self, request):
        try:
            etapas = [{"key": etapa[0], "value": etapa[1]} for etapa in Ativos_Operacionais.ETAPA_DO_SERVICO]
            return JsonResponse(list(etapas), safe=False, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return JsonResponse({'detail': 'Nenhum registro encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        
class AtivosAdmStatusView(View):
    def get(self, request):
        try:
            statusAdmin = [statusAdmin[1] for statusAdmin in Ativos_Administrativos.STATUS]
            return JsonResponse(list(statusAdmin), safe=False, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return JsonResponse({'detail': 'Nenhum registro encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        
class AtivosAdmTipoAtivoView(View):
    def get(self, request):
        try:
            tipos = [tipo[1] for tipo in Ativos_Administrativos.TIPO_ATIVO]
            return JsonResponse(list(tipos), safe=False, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return JsonResponse({'detail': 'Nenhum registro encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        
class AtivosAdmClasseAtivoView(View):
    def get(self, request):
        try:
            classes = [classe[1] for classe in Ativos_Administrativos.CLASSE_ATIVO]
            return JsonResponse(list(classes), safe=False, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return JsonResponse({'detail': 'Nenhum registro encontrado.'}, status=status.HTTP_404_NOT_FOUND)
            
    
