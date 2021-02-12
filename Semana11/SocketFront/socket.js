// io(), lo importamos del cdn que hemos colocado en el archivo index.html
// https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.1.1/socket.io.min.js

//* conectamos al puerto del backend
const socket = io('http://127.0.0.1:3000');

const input = document.getElementById('mensaje');
const btnEnviar = document.getElementById('btnEnviar');
const username = document.getElementById('username');
const btnRegistrar = document.getElementById('btnIngresar');
const login = document.getElementById('login');
const chat = document.getElementById('chat');
chat.style.display = "none";

const estado = document.getElementById('estado');
const listaMensajes = document.getElementById('listaMensajes');

// Para poder ver si el backend esta funcioando correctamente, llamo al metodo connect()
socket.on('connect', () => {
    // id del socket es el mismo, en el front y back
    console.log(socket.id);

    if (socket.connected) {
        estado.classList.remove('bg-danger');
        estado.classList.add('bg-success');
        estado.innerText = "ONLINE"
    }
    console.log(socket.connected);
    console.log("discon", socket.disconnected);
});



socket.on('disconnect', (reason) => {
    /**
     * me devuelve (al igual que en el back, la razon por la cual se desconecto y las razones son las mismas)
     * io server disconnect
     * io client disconnect
     * ping timeout
     * transport close
     * transport error
     */
    console.log(reason);
    console.log('Me desconecte !!!');

    estado.classList.remove('bg-success');
    estado.classList.add('bg-danger');
    estado.innerText = "OFFLINE"
})


btnRegistrar.addEventListener('click', (e) => {
    // socket.disconnect(); // forma de desconectarme del sistema de sockets manualmente
    // socket.open(); // forma de conectarme manualmente al sistema de sockets

    e.preventDefault();
    // mandar el username al socket y que este lo reciba y lo imprima en pantalla
    socket.emit('registrar', username.value);
});



btnEnviar.addEventListener('click', (e) => {
    e.preventDefault();

    const mensaje = input.value;

    // emit(), srive para mandar mediante la ruta, un contenido para que lo pueda recibir el back (socket)
    //* este emit() es para enviar al backend
    socket.emit('mensaje-nuevo', mensaje); // (llave, valor)
    // console.log(input.value);
})

//* recibimos del front
socket.on('enviar-mensajes', (mensajes) => {
    // console.log("mensajes del front : ", mensajes);
    listaMensajes.innerHTML = '';

    for (const key in mensajes) {
        const mensaje = document.createElement('li');
        mensaje.className = 'list-group-item';
        mensaje.innerText = `usuario dice ${mensajes[key]}`;
        listaMensajes.appendChild(mensaje);
        input.value = '';
    }
});

socket.on('lista-usuarios', (usuarios) => {
    login.style.display = "none";
    chat.style.display = "";
    console.log("usuarios del front : ", usuarios);
})