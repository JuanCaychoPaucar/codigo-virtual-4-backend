use playa_estacionamiento;

# toda funcion de sql tiene que ir ligada con la clausula GROUP BY
# la clausula BROUP BY, sirve para hacer un ordenamiento del resultado del select, no es obligatorio que tenga GROUP BY

select count(veh_id), veh_id from t_registro
							group by veh_id;

select count(veh_id), veh_id, playa_id from t_registro
							group by playa_id, veh_id;

select count(veh_id) as "conteo vehiculo playa", veh_id, playa_id from t_registro
							group by playa_id, veh_id
                            order by count(veh_id) asc;
                            
# ------------------ EJERCICIO 1 ------------------
# Muestre todos los vehiculos ingresados en la playa con ID 1 y que me diga su nombre_playa
# PLACA		PLAYA	FECHA INGRESO	FECHA SALIDA

select veh_placa as PLACA, playa_nomb as PLAYA, reg_fechin as "FECHA INGRESO", reg_fechfin as "FECHA SALIDA"
		from t_playa inner join t_registro
		on t_playa.playa_id = t_registro.playa_id
		inner join t_vehiculo
		on t_registro.veh_id = t_vehiculo.veh_id
        where t_playa.playa_id = 1;


# ------------------ EJERCICIO 2 ------------------
# Indique todos los vehiculos ingresados entre el 02 y 05 de Noviembre, con sus montos respectivos
# PLACA		MARCA	FECHA INGRESO	FECHA SALIDA	MONTO

select veh_placa as PLACA, veh_marca as MARCA, reg_fechin as "FECHA INGRESO", reg_fechfin as "FECHA SALIDA", reg_monto as MONTO
		from t_vehiculo inner join t_registro
		on t_vehiculo.veh_id = t_registro.veh_id
        where t_registro.reg_fechin >= '2020-11-02 00:00:00' and t_registro.reg_fechfin <= '2020-11-05 23:59:59';


# ------------------ EJERCICIO 3 ------------------
# Muestre la lista de vehiculos con su numero de veces que tuviesen registros en cualquiera de las playas, en orden de mayor a menor veces
# PLACA		MARCA	MODELO	# VECES

select t_vehiculo.veh_placa as PLACA, t_vehiculo.veh_marca as MARCA, t_vehiculo.veh_modelo as MODELO, count(t_vehiculo.veh_id) as "# VECES"
		from t_registro inner join t_vehiculo
		on t_registro.veh_id = t_vehiculo.veh_id
		inner join t_playa
		on t_registro.playa_id = t_playa.playa_id
		group by t_vehiculo.veh_placa
		order by count(t_registro.playa_id) desc;

