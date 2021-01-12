const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
// Sequelize.NOW

const cabecera_operacion_model = (conexion) => {
    let cabecera = conexion.define('cabecera_operaciones', {
        cabeceraOperacionId: {
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            type: DataTypes.INTEGER,
            field: 'cab_ope_id',
        },
        cabeceraOperacionFecha: { // que su valor por defecto sea el dia de hoy
            type: DataTypes.DATE,
            field: 'cab_ope_fech',
            defaultValue: Sequelize.NOW
        }, 
        cabeceraOperacionNombre: { // minimo 5 palabras y que solo sea letras
            type: DataTypes.STRING(45),
            field: 'cab_ope_nomb',
            validate: {
                len: [5,45]
            }
        }, 
        cabeceraOperaciondireccion: { // que solo sea alfanumerico
            type: DataTypes.STRING(45),
            field: 'cab_ope_direc',
            validate: {
                // isAlphanumeric: true
            }
        }, 
        cabeceraOperacionTotal: { // minimo 25 y maximo 1000
            type: DataTypes.DECIMAL(5,2),
            field: 'cab_ope_total',
            validate: {
                min: 25,
                max: 1000
            }
        }, 
        cabeceraOperacionIGV: {
            type: DataTypes.DECIMAL(5,2),
            field: 'cab_ope_igv',
        },
        cabeceraOperacionRUC: {
            type: DataTypes.STRING(11),
            field: 'cab_ope_ruc',
        }
    }, {
        tableName: 't_cabecera_operacion',
        timestamps: false,
    });

    return cabecera;
}

module.exports = cabecera_operacion_model;