const { DataTypes } = require('sequelize');

const usuario_model = (conexion) => {
    return conexion.define('usuarios', {
        usuarioId: {
            primaryKey: true,
            field: 'usuario_id',
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        usuarioCorreo: {
            field: 'usuario_correo',
            type: DataTypes.STRING(30),
            unique: true,
            validate: {
                isEmail: true,
                isAlphanumeric: true,
                len: [10, 30]
            }
        },
        usuarioNombre: {
            field: 'usuario_nombre',
            type: DataTypes.STRING(45),
            unique: true,
            allowNull: false
        },
        usuarioDireccion: {
            field: 'usuario_direccion',
            type: DataTypes.STRING(45)
        },
        usuarioTelefono: {
            field: 'usuario_telefono',
            type: DataTypes.STRING(10),
            validate: {
                min: 9000000000,
                max: 9999999999,
                isNumeric: true
            }
        },
        usuarioHash: {
            field: 'usuario_hash',
            type: DataTypes.TEXT
        },
        usuarioSalt: {
            field: 'usuario_salt',
            type: DataTypes.TEXT
        },
        usuarioFechaNacimiento: {
            field: 'usuario_fecha_nacimiento',
            type: DataTypes.DATEONLY
        }
    }, {
        tableName: 't_usuario',
        timestamps: false
    })
}

module.exports = usuario_model;

// validaciones
// https://sequelize.org/master/manual/validations-and-constraints.html#per-attribute-validations