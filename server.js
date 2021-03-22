// Import express
let express = require('express');

// Initialize the app
let app = express();

let connection = require('./db.js');

// var mysql = require("mysql");
// //Database connection
// var connection = mysql.createConnection({

//     host : 'localhost',
//     user : 'root',
//     password : 'root',
//     database : 'exercices'
// });

// connection.connect(function(error) { if (error) console.log (error);});


// app.use(express.urlencoded((extended: True )));

app.use(express.urlencoded());

// Send message for default URL
//  app.get('/', (req, res) => res.send('Hello World !'));

//Setting Middleware
//je dis que Public est le dossier contenant les fichiers statiques
app.use(express.static("Public"));



//importe l'objet router pour pouvoir rediriger vers le fichier /routes contenant toutes mes routes
let router = require('./routes');
//associe le fichier des routes à l'app, qui estl'instance d'express
app.use('/', router);

// Setup server port
let port = 8000;

// Launch app to listen to specified port
app.listen(port, function () {
    console.log('Server running on port ' + port);
});