// DataTypes => indicar que valor va a recibir cierta columna
// http://sequelize.org/master/manual/model-basics.html#data-types
const { DataTypes } = require('sequelize');

const producto_model = (conexion) => {
    // productos => nombre para la relacion inversa (similar a related_name en Django)

    // conexion.define('nombre_relacion_inversa', {campos}, {configuraciones})
    let producto = conexion.define('productos', {
        // aca van todas nuestras columnas
        // http://sequelize.org/master/manual/model-basics.html#column-options
        productoId: {
            primaryKey: true, // sirve para indicar cual va a ser la PK
            autoIncrement: true,
            type: DataTypes.INTEGER,
            field: 'prod_id', // nombre del campo en la BD
            allowNull: false
        },
        productoNombre: {
            type: DataTypes.STRING(45), // si no coloco la longitud en STRING, va a ser de longitud 1, osea VARCHAR(1)
            field: 'prod_nomb',
            unique: true
        },
        productoPrecio: {
            type: DataTypes.DECIMAL(5, 2),
            field: 'prod_precio'
        },
        productoRegistroSanitario: {
            type: DataTypes.STRING(25),
            field: 'prod_regsan'
        }
    }, {
        tableName: 't_producto',  // nombre de la tabla
        timestamps: true  // se crearan las columnas por defecto: createAt y updateAt (NO LLEVA CAMELCASE)
    });

    return producto;
}

module.exports = producto_model;

/**
 * timestamps
 * creacion => registra automaticamente la hora y fecha en que se creó un nuevo registro
 * actualizacion => registra automaticamente la hora y fecha en que hubo algun cambio en algun registro
 */