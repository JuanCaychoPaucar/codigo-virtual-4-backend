const { DataTypes } = require('sequelize');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const usuario_model = (conexion) => {
    let usuario = conexion.define('usuarios', {
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
                min: 900000000,
                max: 999999999,
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
        },
        usuarioTipo: {
            field: 'usuario_tipo',
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false
        }
    }, {
        tableName: 't_usuario',
        timestamps: false
    })


    // Si queremos usar prototypes, se recomienda no usar arrow functions sino usar funciones anonimas

    // encriptamos la contraseña
    // creamos un metodo llamado setSaltAndHash
    usuario.prototype.setSaltAndHash = function (password) {
        // uso su metodo randomBytes, el cual va a generar una cadena aleatoria de bytes,
        // con una longitud de 16 bits y luego eso lo convierto a String
        this.usuarioSalt = crypto.randomBytes(16).toString('hex');

        // crypto.pbkdf2Sync(password, salt, iterations, keylen, digest)
        this.usuarioHash = crypto.pbkdf2Sync(password, this.usuarioSalt, 1000, 64, "sha512").toString('hex');
    }

    usuario.prototype.generarJWT = function () {
        // generar payload => es la parte intermedia de la JWT y sirve para guardar informacion de tiempo de vida e informacion adicional:
        // como el nombre de usuario, tipo de usuario, etc

        let payload = {
            usuarioId: this.usuarioId,
            usuarioNombre: this.usuarioNombre,
            usuarioTipo: this.usuarioTipo,
            usuarioCorreo: this.usuarioCorreo
        }

        let password = process.env.JWT_SECRET || 'codigo4';
        // https://www.npmjs.com/package/jsonwebtoken

        // sign(payload, contraseña, configuracion)
        // expiresIn: int, str => si yo le mando un entero lo tomara como segundos, '1h'
        let token = jwt.sign(payload, password, { expiresIn: 60 }, { algorithm: 'RS256' });
        return token;
    }


    usuario.prototype.validarPassword = function (password) {
        let hashTemporal = crypto.pbkdf2Sync(password, this.usuarioSalt, 1000, 64, "sha512").toString('hex');
        return hashTemporal === this.usuarioHash ? true : false;
    }

    return usuario;
}

module.exports = usuario_model;

// validaciones
// https://sequelize.org/master/manual/validations-and-constraints.html#per-attribute-validations

// randomBytes
// https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback

// crypto
// https://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2sync_password_salt_iterations_keylen_digest