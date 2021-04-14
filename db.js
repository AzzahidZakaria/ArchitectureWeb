//déclaration afin de créer la connexion avec La DB

var mysql = require("mysql");
//Database connection
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "exercices",
});

connection.connect(function (error) {
  if (error) console.log(error);
});

// création d'une variable qui va permettre d'appeler la fonction create connnection dans le controller

module.exports = connection;
