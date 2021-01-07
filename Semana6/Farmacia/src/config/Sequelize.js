// http://sequelize.org/master/manual/getting-started.html
// npm install mysql2

const { Sequelize } = require('sequelize');
const productoModel = require('../models/ProductoModel');
const tipoOperacionModel = require('../models/TipoOperacionModel');
const loteModel = require('../models/LoteModel');
const cabeceraOperacionModel = require('../models/CabeceraOperacionModel');
const detalleOperacionModel = require('../models/DetalleOperacionModel');

// 1ra forma de conexion a BD
// https://sequelize.readthedocs.io/en/1.7.0/docs/usage/
// const conexion = new Sequelize('mysql://usuario:password@host:puerto/base_datos');

// 2da forma de conexion a BD
const conexion = new Sequelize(
    // base_datos, usuario, contraseña
    "farmaciaSequelize", "root", "123456", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    timezone: "-05:00",  // para que los campos de auditoria se creen con la hora local
    logging: false, // sirve para que no muestre en la terminal todas las consultas SQL que se ejecutan internamente

    // opciones extras
    dialectOptions: {
        // para que al momento de mostrar fechas, las vuleva en String y no tener que hacer la conversion manual
        dateStrings: true
    }
}
);

// Aca se crean las tablas en la BD
const Producto = productoModel(conexion);
const TipoOperacion = tipoOperacionModel(conexion);
const Lote = loteModel(conexion);
const CabeceraOperacion = cabeceraOperacionModel(conexion);
const DetalleOperacion = detalleOperacionModel(conexion);

// Una vez definidos todos los modelos, se procede a crear las relaciones
// Producto tiene muchos Lotes
Producto.hasMany(Lote, { foreignKey: 'prod_id' });

// para usar las relaciones inversas ahora hacemos lo contrario
// Lote pertenece a Producto
Lote.belongsTo(Producto, { foreignKey: 'prod_id' });

TipoOperacion.hasMany(CabeceraOperacion, { foreignKey: 'tipo_ope_id' });
CabeceraOperacion.belongsTo(TipoOperacion, { foreignKey: 'tipo_ope_id' });

Lote.hasMany(DetalleOperacion, { foreignKey: 'lote_id' });
DetalleOperacion.belongsTo(Lote, { foreignKey: 'lote_id' });

CabeceraOperacion.hasMany(DetalleOperacion, { foreignKey: 'cab_ope_id' });
DetalleOperacion.belongsTo(CabeceraOperacion, { foreignKey: 'cab_ope_id' });


module.exports = {
    conexion,
    Producto,
    Lote,
    DetalleOperacion,
    CabeceraOperacion,
    TipoOperacion
}
