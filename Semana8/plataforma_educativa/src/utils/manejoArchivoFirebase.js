const { Storage } = require('@google-cloud/storage');

// Inicializo mi objeto de Firebase para poder conectarme con mi Bucket
const credenciales = {
    projectId: 'codigo-backend-juan',  // esta en la pestaña General de la configuracion del proyecto de Firebase
    keyFilename: './src/credenciales_firebase.json'
}

const storage = new Storage(credenciales);

// Se crea la variable bucket que se usa como referencia al link del storage
const bucket = storage.bucket('codigo-backend-juan.appspot.com'); // ! no se copia con el protocolo, solamente depues del //. Esta en Storage de Firebase

const subirArchivo = (archivo) => {
    return new Promise((resolve, reject) => {
        if (!archivo) {
            reject('No se encontró el archivo'); // se ejecutara en el catch
        }

        // * modificamos el nombre original para prevenir que el usuario pueda sobreescribir un archivo con el mismo nombre
        const nuevoNombre = `${archivo.originalname}_${Date.now()}`;

        // * Comenzamos a cargar nuestro archivo con el nuevo nombre, pero aun no se sube a Firebase
        const fileUpload = bucket.file(nuevoNombre);

        // * Agregamos configuracion adicional de nuestro archivo a subir como su metadata
        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: archivo.mimetype
            }
        });

        // Si hay un error al momento de subir el archivo, ingresaremos a su estado "error"
        blobStream.on('error', (error) => {
            reject(`Hubo un error al subir el archivo: ${error}`);
        });

        // Si el archivo terminó de subirse satisfactoriamente, ingresaremos a su estado "finish"
        blobStream.on('finish', () => {
            fileUpload.getSignedUrl({
                action: 'read',
                expires: '12-12-2021'  // DD-MM-YYYY
            })
                .then(link => resolve(link))
                .catch(error => reject(`Error al devolver el link: ${error}`));
        });

        // * ACA ES DONDE SE SUBE EL ARCHIVO
        blobStream.end(archivo.buffer);
    })
}

module.exports = {
    subirArchivo
}