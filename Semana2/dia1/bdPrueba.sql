# Tipos de datos
# Numericos
# int que acepta valores desde -2147483648 hasta 2147483647
# tinyint (bool) entero que acepta valores de -128 a 127, cuando solo ingreso un valor (1 o 0), este se convierte internamente en bool
# bool => internamente se creara como tinyint que admitira valores 0 o 1
# smallint que acepta valores entre -32768 hast 32767
# float(m, d) , m => es la cantidad de numeros en total que vamos a tener (parte entera + parte decimal)
# parte decimal, d => la cantidad de decimales que vamos a tener en nuestra columna

# Tiempo y fecha
# date: su formato rd YYYY-MM-DD desde el 1000-01-01 hasta el 9999-12-31
# datetime: su formato es YYYY-MM-DD HH:MM:SS
# timestamp: no guarda ni guiones, ni dos puntos, ni espacios YYYYMMDDHHMMSS
# time: HH:MM:SS

# String
# char(lng): recibe un parametro, el cual va a ser la longitud para almacenar en esa variable
# varchar(lng): recibe un parametro en el cual va a ser la longitud MAXIMA para almacenar los datos
# text: es un tipo de dato que acepta almacenar hasta 65535 caracteres. generalmente se usa para alamcenar textos muy grandes y contraseñas

create database bdPrueba;

# Sirve para mostrar todas las bases de datos del servidor
show databases;

# Sirve para indicar en que base de datos voy a trabajar
use bdPrueba;

# para crear una tabla, necesitamos saber:
# nombre de la tabla
# nombre de los campos o atributos
# la definicion de cada campo

# create table nom_tabla (
#	nombre_columna tipo_columna *algunas_configuraciones_extras
# )

# not null => evita que al momento de ingresar un regitro, esa columna pueda carecer de informacion
# auto_increment => esto va de la mano con el tipo de dato int, puesto que al ser entero va a ser autoincrementable y generalmente se usa en las primary keys
# primary key => es usada para definir que la columna va a ser la llave primaria de la tabla, por lo que debe ser unica e irrepetible y generalmente debe ser int


create table t_alumno(
	alumno_id int auto_increment not null primary key,
    alumno_nombre varchar(35),
    alumno_fecnac date,
    alumno_email varchar(25),
    alumno_dni varchar(8)
);

alter table t_alumno modify alumno_email varchar(50);

# La forma correcta de insertar datos a una tabla es:
insert into t_alumno (alumno_nombre, alumno_fecnac, alumno_email, alumno_dni)
values ('Juan', '1983-01-19', 'jc_caycho_p@outlook.com', '12345678');

insert into t_alumno (alumno_nombre, alumno_fecnac, alumno_email, alumno_dni)
values ('Eduardo', '1985-08-01', 'ederiveromanqgmail.com', '73500746');

insert into t_alumno (alumno_nombre, alumno_fecnac, alumno_email, alumno_dni)
values ('Rosa Fiorella', '2003-03-15', 'rosita@gmail.com', '71234746');

select * from t_alumno;
select * from t_alumno where alumno_nombre = 'Eduardo';

#Crear una tabla de habilidades, en la cual se guarde la descripcion de la habilidad y su nivel

create table t_habilidad(
	habilidad_id int auto_increment not null primary key,
    habilidad_descripcion varchar(100),
    habilidad_nivel varchar(15),
    alumno_id int,
    foreign key(alumno_id) references t_alumno(alumno_id)
);

# 5 registros de habilidades
insert into t_habilidad(habilidad_descripcion, habilidad_nivel, alumno_id)
values	('Estudioso', 'Alto', 1),
		('Hiperactivo', 'Medio', 2),
        ('Deportista', 'Bajo', 3),
        ('Estudioso', 'Medio', 2),
        ('Cientifico', 'Alto', 1);
        
select * from t_habilidad;

# inner join: tiene que estar en los 2 lados
# left join: tiene que estar en el lado izquierdo
# right join: tiene que estar en el lado derecho
# full outer join: todas las coincidencias

select * from t_habilidad inner join t_alumno
on t_habilidad.alumno_id = t_alumno.alumno_id;

# crear una base de datos bdempresa, en el cual se tenga 2 tablas, una departamento y otra empleados.
# en la tabla departamento, debe ir: nom_dep, nivel
# en la tabla empleado debe ir el nombre, apellido y num_contrato
# Indicar la relacion que debe de tener esas 2 tablas

create database bdempresa;
use bdempresa;

create table t_departamento(
	dep_id int auto_increment not null primary key,
    dep_nomb varchar(25),
    dep_nivel int
);

create table t_empleado(
	emp_id int auto_increment not null primary key,
    emp_nomb varchar(30),
    emp_apellido varchar(45),
    emp_numcont varchar(5),
    dep_id int,
    foreign key(dep_id) references t_departamento(dep_id)
);

insert into t_departamento (dep_nomb, dep_nivel) values
                            ('Ventas',1),
                            ('Administracion',2),
                            ('Finanzas',2),
                            ('Marketing',3);

insert into t_empleado (emp_nomb, emp_apellido, emp_numcont, dep_id) values
                        ('juancho','rodriguez','0007',2),
                        ('rosa','martinez','0010',1),
                        ('hugo','mendieta','0145',3),
                        ('estaban','quito','0146',2),
                        ('eduardo','amado','1474',3),
                        ('roxana','obando','1245',NULL);
                        
select * from t_departamento
inner join t_empleado
on t_departamento.dep_id = t_empleado.dep_id;

# left join
select * from t_departamento
left join t_empleado
on t_departamento.dep_id = t_empleado.dep_id;

# right join
select * from t_departamento
right join t_empleado
on t_departamento.dep_id = t_empleado.dep_id;

# full outer join
select * from t_departamento
left join t_empleado
on t_departamento.dep_id = t_empleado.dep_id
union
select * from t_departamento
right join t_empleado
on t_departamento.dep_id = t_empleado.dep_id;