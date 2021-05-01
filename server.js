// Import express
let express = require("express");

// Initialize the app
let app = express();

let connection = require("./db.js");

//Setting Middleware
app.use(express.urlencoded());

// Send message for default URL
//  app.get('/', (req, res) => res.send('Hello World !'));

//je dis que Public est le dossier contenant les fichiers statiques
app.use(express.static("Public"));

// de manière à envoyer du json et qu'il soit correctement interprété
app.use(express.json());

//importe l'objet router pour pouvoir rediriger vers le fichier /routes contenant toutes mes routes
let router = require("./routes");
//associe le fichier des routes à l'app, qui estl'instance d'express
app.use("/", router);

// Setup server port
let port = 8000;

// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Server running on port " + port);
});
