// Importa el módulo de express y path
const express = require('express');
const path = require('path');

// Crea una instancia de la aplicación de express
const app = express();

// Define el puerto en el que el servidor va a escuchar
const PORT = 3000;

// Configura la carpeta `assets` para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'assets')));

// Arreglo de nombres de usuarios
const usuarios = ["Juan", "Jocelyn", "Astrid", "Maria", "Ignacia", "Javier", "Brian"];

// Ruta para obtener el JSON con usuarios
app.get('/abracadabra/usuarios', (req, res) => {
    res.json({ usuarios });
});
// Middleware para verificar que el usuario existe en el arreglo
app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    const { usuario } = req.params;
    if (usuarios.includes(usuario)) {
        res.redirect('/'); // Redirige a la página principal
    } else {
        res.sendFile(path.join(__dirname, 'assets', 'who.jpeg'));
    }
});



// Ruta para mostrar la imagen correcta según el número aleatorio
app.get('/abracadabra/conejo/:n', (req, res) => {
    const n = parseInt(req.params.n, 10);
    const randomNum = Math.floor(Math.random() * 4) + 1;
    if (n === randomNum) {
        res.sendFile(path.join(__dirname, 'assets', 'conejo.jpg'));
    } else {
        res.sendFile(path.join(__dirname, 'assets', 'voldemort.jpg'));
    }
});
// Ruta principal para servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets', 'index.html'));
});


// Ruta genérica para manejar rutas no definidas
app.use((req, res) => {
    res.status(404).send('Esta página no existe...');
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
