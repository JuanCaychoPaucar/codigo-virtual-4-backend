// npm i @google-cloud/storage
const { Storage } = require('@google-cloud/storage');

// Inicializo mi objeto de Firebase para poder conectarme con mi Bucket
const credenciales = {
    projectId: 'codigo-backend-juan',  // esta en la pestaña General de la configuracion del proyecto de Firebase
    keyFilename: './src/credenciales_firebase.json'  // archivo JSON donde estan las credenciales
}

const storage = new Storage(credenciales);

// Se crea la variable bucket que se usa como referencia al link del storage
const bucket = storage.bucket('codigo-backend-juan.appspot.com'); // ! no se copia con el protocolo, solamente depues del //. Esta en Storage de Firebase (gs://codigo-backend-juan.appspot.com)



const devolverNombreArchivo = (url) => {
    let nombre = url.substring(
        url.lastIndexOf("/") + 1,
        url.lastIndexOf("?")
    );

    let nombreSplit = nombre.split('%20'); //! para colocarle el espacio en blanco en el nombre de la imagen, si lo tuvieran
    // concatenar
    let nombreConcatenado = "";

    for (let i = 0; i < nombreSplit.length; i++) {
        nombreConcatenado = nombreConcatenado + nombreSplit[i] + ' ';
    }

    return nombreConcatenado.trim();
}



const subirArchivo = (archivo) => {

    //* resolve => se maneja mediant el then
    //* reject => se maneja mediante el catch

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
                contentType: archivo.mimetype  //  indicamos que tipo de archivo estamos subiendo a Firebase
            }
        });

        //* Si hay un error al momento de subir el archivo, ingresaremos a su estado "error"
        blobStream.on('error', (error) => {
            reject(`Hubo un error al subir el archivo: ${error}`);  // se ejecutara en el catch
        });

        //* Si el archivo terminó de subirse satisfactoriamente, ingresaremos a su estado "finish"
        blobStream.on('finish', () => {
            fileUpload
                .getSignedUrl({
                    action: 'read',
                    expires: '12-31-2021'  //! MM-DD-YYYY
                })
                .then(link => resolve(link))
                .catch(error => reject(`Error al devolver el link: ${error}`));
        });

        // * ACA ES DONDE SE SUBE EL ARCHIVO
        blobStream.end(archivo.buffer);  //.buffer => el archivo en formato hexadecimal
    })
}


const eliminarArchivoFirebase = async (url) => {
    /**
     * Al momento de eliminar un archivo que no existe ya en Firebase storage, me indica por consola que no existe.
     * Como se podria controlar para indicar al cliente que se eleimono de la BD pero no se encontro el archivo en el storage
     */
    let nombre = devolverNombreArchivo(url);

    try {
        let rpta = await bucket.file(nombre).delete();
        console.log(rpta);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }

}

module.exports = {
    subirArchivo,
    eliminarArchivoFirebase
}