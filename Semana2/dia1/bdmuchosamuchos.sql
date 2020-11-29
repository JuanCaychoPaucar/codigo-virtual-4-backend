# crear una tabla alumno que tenga su id_alumno, nombre, apellido, grado,
# fecha de nacimiento
# y una tabla curso que tenga id_curso, nombre_curso, dificultad
# y una relacion de muchos a muchos
# crear bd llamada muchosamuchos

create database muchosamuchos;
use muchosamuchos;

create table alumno(
	id_alumno int auto_increment not null primary key,
    nombre varchar(30),
    apellido varchar(30),
    grado varchar(10),
    fec_nac date
);

create table curso(
	id_curso int auto_increment not null primary key,
    nom_curso varchar(30),
    dificultad varchar(20)
);

create table alumno_curso(
id_alumno_curso int auto_increment not null primary key,
id_alumno int,
id_curso int,
foreign key (id_alumno) references alumno(id_alumno),
foreign key (id_curso) references curso(id_curso)
);

insert into alumno(nombre, apellido, grado, fec_nac)
values 	('Eduardo', 'Juarez', 'Quinto', '1992-08-01'),
		('Christopher', 'Rodriguez', 'Cuarto', '1993-07-10'),
        ('Raul', 'Pinto', 'Primero', '1996-02-05'),
        ('Cristina', 'Espinoza', 'Quinto', '1992-10-21'),
        ('Valeria', 'Acevedo', 'Cuarto', '1993-05-18');
        
insert into curso (nom_curso, dificultad)
values	('Matematica I', 'Facil'),
		('Fisica I', 'Facil'),
		('Matematica II', 'Intermedio'),
		('CTA', 'Dificil'),
		('Biologia', 'Dificil');

insert into alumno_curso (id_alumno, id_curso)
values	
		(1,2),(4,2), # todos los de quinto llevan Fisica I
		(1,4),(4,4), # todos los de quinto llevan CTA
		(2,3),(5,3), # todos los de cuarto llevan Matematica II
		(2,5),(5,5), # todos los de cuarto llevan Biologia
		(3,1),(3,3); # todos los de primero llevan Matematica I y Matematica II
        
select nombre as Nombre, apellido as Apellido, nom_curso as Curso from alumno
inner join alumno_curso
on alumno.id_alumno = alumno_curso.id_alumno
inner join curso
on alumno_curso.id_curso = curso.id_curso;

select fec_nac from alumno;

select * from alumno
where year(fec_nac) >= 1992 and year(fec_nac) <= 1994
