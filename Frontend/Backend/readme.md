---
runme:
  id: 01HJK1RJWY2679VCG5JSPC2QJC
  version: v2.0
---

# Aplicação Django - World

## A aplicação sendo desenvolvida nesse momento é uma aplicação django nomeada world. Nela temos os campos localidade, unidades de sistema, ativos e usuários.

<p>Este Backend se trata de uma API RESTful destinada a ser integrado à um front-end Vite React. A base da aplicação utiliza GeoDjango para tratativa de dados geoespaciais que serão coletados no front. então, para isso deve-se seguir a <a href='https://docs.djangoproject.com/en/4.2/ref/contrib/gis/'>Seguinte documentação.</a></p>

<p>É de suma importância que instale o Postgresql e o StackBuilder para que instale uma extensão do postgres chamada OSGeo4W, da qual terá a lib GDAL que temos que instalar na pasta C:/, logo em seguida devem ser mudadas as variáveis de ambiente para que o GDAL seja devidamente reconhecido no computador.</p>

```sh {"id":"01HJK1RJWY2679VCG5JRC9VVCJ"}
set OSGEO4W_ROOT=C:\OSGeo4W
set GDAL_DATA=%OSGEO4W_ROOT%\apps\gdal\share\gdal
set PROJ_LIB=%OSGEO4W_ROOT%\share\proj
set PATH=%PATH%;%OSGEO4W_ROOT%\bin
reg ADD "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v Path /t REG_EXPAND_SZ /f /d "%PATH%"
reg ADD "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v GDAL_DATA /t REG_EXPAND_SZ /f /d "%GDAL_DATA%"
reg ADD "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v PROJ_LIB /t REG_EXPAND_SZ /f /d "%PROJ_LIB%"


```

<p>Logo após deve-se verificar corretamente se o arquivo Settings.py está referenciando sua lib GDAL, caso contrário precisa referenciar o arquivo gdal(versão).dll</p>
<i>Por fim deve-se instalar a extensão psycopg ou psycopg2 para o funcionamento correto. Além de django, djangorestframework, asgiref, numpy e tzdata.</i>

## Não se esqueça de sempre que for mudar algo no projeto backend, rode python manage.py makemigrations e python manage.py migrate para as mudanças serem registradas pelo framework.

Para rodar o server é só digitar python manage.py runserver, no newvenv.

A senha padrão para usuários é padronizado, permitindo uma senha não nula padrão.