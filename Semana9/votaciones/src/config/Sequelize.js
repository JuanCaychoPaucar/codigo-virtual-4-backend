const { Sequelize } = require('sequelize');
const congresista_model = require('../models/CongresistaModel');
const elector_model = require('../models/ElectorModel');
const partido_model = require('../models/PartidoModel');
const voto_congresal_model = require('../models/VotoCongresalModel');
const voto_model = require('../models/VotoModel');

const conexion = new Sequelize(
    "elecciones", "root", "123456",
    {
        host: "localhost",
        dialect: "mysql",
        timezone: "-05:00",
        logging: false,
        dialectOptions: {
            dateString: true
        }
    }
);

const Congresista = congresista_model(conexion);
const Elector = elector_model(conexion);
const Partido = partido_model(conexion);
const VotoCongresal = voto_congresal_model(conexion);
const Voto = voto_model(conexion);


//* CREAR LAS RELACIONES

//! relacion de uno a uno, pero aun asi se debe de crear la FK
Elector.hasOne(Voto, { foreignKey: { name: 'elector_dni', allowNull: false } });
Voto.belongsTo(Elector, { foreignKey: 'elector_dni' });

/**
 * Podemos controlar la forma en la cual va a accionar la llave foranea cuando su padre sea eliminado.
 * !TODAS ESTAS FORMAS VALEN PARA CUALQUIER TIPO DE RELACION (ONE-TO-ONE | ONE-TO-MANY)
 * 
 * RESTRICT => No va a permitir la eliminacion
 * CASCADE => Eliminara al padre y luego a todos los hijos
 * NO ACTION => Lo deja asi tal y como esta, con la FK sin modificar
 * SET NULL => Cambiar el valor de la FK a null
 * SET DEFAULT => Este va de la mano con el defaultValue, y si es eliminado se reemplazara su valor por el defaultValue
 * 
 * ejemplo de relacion muchos a muchos (donde la tabla itermedia se crea, pero almacena solamente las PK)
 * Elector.belongsToMany(Voto, { through: 'ElectorVoto' })
 * Voto.belongsToMany(Elector, { through: 'ElectorVoto' })
 * 
 */

Elector.hasMany(VotoCongresal, { foreignKey: 'elector_dni', onDelete: 'CASCADE' });
VotoCongresal.belongsTo(Elector, { foreignKey: 'elector_dni' });

Partido.hasMany(Voto, { foreignKey: { name: 'partido_id', allowNull: false } });
Voto.belongsTo(Partido, { foreignKey: 'partido_id' });

Partido.hasMany(Congresista, { foreignKey: { name: 'partido_id', allowNull: false } });
Congresista.belongsTo(Partido, { foreignKey: 'partido_id' });

Congresista.hasMany(VotoCongresal, { foreignKey: { name: 'congresista_id', allowNull: false } });
VotoCongresal.belongsTo(Congresista, { foreignKey: 'congresista_id' });


module.exports = {
    conexion,
    Congresista,
    Elector,
    Partido,
    VotoCongresal,
    Voto,
}