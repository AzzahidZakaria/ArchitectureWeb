const Exercice = require("../Models/Exercice");
const Entrainements = require("../Models/Entrainements");

let Test = "Zakaria";
let entrainementList = [];
let connection = require("../db");
let exerciceList = [];


// CE CONTROLLEUR CI CONTIENT LA PAGE D'ACCUEIL et LA FONCTIONNALITE DE RECHERCHE 



//renvoi la page d'accueil
exports.home = function (req, res) {
  res.render("home.ejs");
};



//pour faire une recherche dans la liste des exercices, sur base de son nom exact, renvoi une page contenant que l'exercice recherché

exports.Search = function (req, res) {
  let search = req.query.Search;
  connection.query(
    "select * from exercice join categorie on exercice.categorie_ID = categorie.idCategorie where nomExercice = ? ",
    search,
    function (error, resultSQL) {
      exerciceList = resultSQL;
      console.log(resultSQL);
      res.render("ExerciceList.ejs", { exercices: exerciceList });
    }
  );
};
