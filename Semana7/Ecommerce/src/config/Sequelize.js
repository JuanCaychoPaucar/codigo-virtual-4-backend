const { Sequelize } = require('sequelize');
const almacen_model = require('../models/AlmacenModel');
const cabecera_venta_model = require('../models/CabeceraVentaModel');
const carrito_model = require('../models/CarritoModel');
const categoria_model = require('../models/CategoriaModel');
const detalle_venta_model = require('../models/DetalleVentaModel');
const imagen_model = require('../models/ImagenModel');
const lista_deseo_model = require('../models/ListaDeseoModel');
const producto_model = require('../models/ProductoModel');
const usuario_model = require('../models/UsuarioModel');


const conexion = new Sequelize(
    "ecommerce_virtual4", "root", "123456", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    timezone: "-05:00",
    logging: false,

    dialectOptions: {
        dateStrings: true
    }
}
);

// Se crean las tablas en la BD
const Almacen = almacen_model(conexion);
const CabeceraVenta = cabecera_venta_model(conexion);
const Carrito = carrito_model(conexion);
const Categoria = categoria_model(conexion);
const DetalleVenta = detalle_venta_model(conexion);
const Imagen = imagen_model(conexion);
const ListaDeseo = lista_deseo_model(conexion);
const Producto = producto_model(conexion);
const Usuario = usuario_model(conexion);

// crear las relaciones
Categoria.hasMany(Producto, { foreignKey: 'categoria_id' });
Producto.belongsTo(Categoria, { foreignKey: 'categoria_id' });

Almacen.hasMany(Producto, { foreignKey: 'almacen_id' });
Producto.belongsTo(Almacen, { foreignKey: 'almacen_id' });

Usuario.hasMany(CabeceraVenta, { foreignKey: 'usuario_id' });
CabeceraVenta.belongsTo(Usuario, { foreignKey: 'usuario_id' });

CabeceraVenta.hasMany(DetalleVenta, { foreignKey: 'cabventa_id' });
DetalleVenta.belongsTo(CabeceraVenta, { foreignKey: 'cabventa_id' });

Producto.hasMany(DetalleVenta, { foreignKey: 'producto_id' });
DetalleVenta.belongsTo(Producto, { foreignKey: 'producto_id' });

Imagen.hasMany(Producto, { foreignKey: 'imagen_id' });
Producto.belongsTo(Imagen, { foreignKey: 'imagen_id' });

Imagen.hasMany(Usuario, { foreignKey: 'imagen_id' });
Usuario.belongsTo(Imagen, { foreignKey: 'imagen_id' });

Producto.hasMany(Carrito, { foreignKey: 'producto_id' });
Carrito.belongsTo(Producto, { foreignKey: 'producto_id' });

Usuario.hasMany(Carrito, { foreignKey: 'usuario_id' });
Carrito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Producto.hasMany(ListaDeseo, { foreignKey: 'producto_id' });
ListaDeseo.belongsTo(Producto, { foreignKey: 'producto_id' });

Usuario.hasMany(ListaDeseo, { foreignKey: 'usuario_id' });
ListaDeseo.belongsTo(Usuario, { foreignKey: 'usuario_id' });


module.exports = {
    conexion: conexion,
    Almacen,
    CabeceraVenta,
    Carrito,
    Categoria,
    DetalleVenta,
    Imagen,
    ListaDeseo,
    Producto,
    Usuario,
}