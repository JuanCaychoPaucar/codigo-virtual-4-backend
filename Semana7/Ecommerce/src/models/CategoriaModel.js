const { DataTypes } = require('sequelize');

const categoria_model = (conexion) => {
    // nombre en plural, json de los campos, json config de la tabla
    return conexion.define('categorias', {
        categoriaId: {
            primaryKey: true,
            field: 'categoria_id',
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        categoriaDescripcion: {
            field: 'categoria_descripcion',
            type: DataTypes.STRING(100),
            allowNull: false
        },
        categoriaNombre: {
            field: 'categoria_nombre',
            type: DataTypes.STRING(25),
            unique: true,
            allowNull: false
        }
    }, {
        tableName: 't_categoria',
        timestamps: false
    });
}

module.exports = categoria_model;