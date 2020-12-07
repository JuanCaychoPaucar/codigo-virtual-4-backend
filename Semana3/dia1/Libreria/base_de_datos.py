# https://flask-sqlalchemy.palletsprojects.com/en/2.x/
# pip install flask-sqlalchemy
# pip install mysqlclient, si sale error ir a la siguiente pagina:
# https://www.lfd.uci.edu/~gohlke/pythonlibs/#mysqlclient
# luego ejecutar:
# pip install mysqlclient-1.4.6-cp39-cp39-win_amd64.whl

# si sale error 2059, es porque el motor de bd esta rechazando la conexion
# entonces ejecutamos lo siguiente dentro del mysqlworkbench
# alter user 'root'@'localhost' identified with mysql_native_password by '123456'

# por si necesitamos actualizar pip
# py -m pip install --upgrade pip

from flask_sqlalchemy import SQLAlchemy

bd = SQLAlchemy()






