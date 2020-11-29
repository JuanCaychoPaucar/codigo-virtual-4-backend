# Crear una base de datos de una playa de estacionamiento, en el cual se guarden los vehiculos que ingresaron y tener un registro de vehiculos.
# Una tabla vehiculos debe tener su id, placa, marca, año, modelo, color.
# Tambien, la Playa de estacionamiento tiene 3 lugares:
# Calle San Francisco 204
# San Juan de Dios 132
# Av. Estados Unidos 505
# Por lo que debe de tener una tabla Playa, con su id, direccion, cantidad.
# La BD se debe de llamar Playa_Estacionamiento

# relacion con linea punteada (----) : Son relaciones debiles, es decir, si eliminamos una tabla, esta no afecta a otra tabla
# relacion con linea continua (____) : Son relaciones fuertes

use playa_estacionamiento;
insert into t_vehiculo (veh_placa, veh_marca, veh_modelo, veh_color, veh_anio) values
 ('V3A527','VOLKSWAGEN','TIGUAN','BLANCO','2018'),
 ('ABC345','FORD','FIESTA','AMARILLO','2015'),
 ('T4F567','RENAULT','KOLEOS','NEGRO','2018'),
 ('AVF465','DAEWOO','TICO','AZUL','2016'),
 ('GNB867','HYUNDAI','SANTA FE','NEGRO','2018');
 
insert into t_playa (playa_nomb, playa_capacidad) values
 ('Calle San Francisco 204', 30),
 ('San Juan de Dios 132', 25),
 ('Av EEUU 505', 10);
 
insert into t_registro (veh_id, playa_id, reg_fechin, reg_fechfin, reg_monto) values
 (1,1,'2020-11-05 10:20','2020-11-05 11:33', 10.50),
 (1,2,'2020-11-02 17:20','2020-11-02 19:33', 12),
 (2,1,'2020-11-04 10:20','2020-11-04 11:33', 14),
 (3,1,'2020-11-04 10:20','2020-11-04 11:33', 8),
 (3,3,'2020-11-05 10:05','2020-11-05 11:33', 6),
 (4,3,'2020-11-01 10:25','2020-11-01 11:33', 4.50),
 (4,3,'2020-11-01 19:34','2020-11-01 20:45', 4.50),
 (5,1,'2020-10-05 10:20','2020-10-05 11:33', 10.50),
 (5,2,'2020-10-05 10:20','2020-10-05 11:33', 10.50),
 (1,1,'2020-10-05 10:20','2020-10-05 11:33', 5);

