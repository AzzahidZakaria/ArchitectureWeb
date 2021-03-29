const Exercice = require("../Models/Exercice");


let Test = "Zakaria";
let entrainementList = [];
let connection = require("../db");
let exerciceList = [];


// CE CONTROLLEUR CONTIENT TOUTES ES FONCTIONS LIES AUX EXERCICES

exports.addExercice = function (req, res) {
    let categorieList = [];
  
    connection.query("select * from categorie", function (error, resultSQL) {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(200);
        console.log(resultSQL);
        categorieList = resultSQL;
  
        res.render("AddExercice.ejs", { categorieList: categorieList });
      }
    });
  };
  
  exports.exerciceList = function (request, response) {
    connection.query(
      "select * from exercice join categorie on exercice.categorie_ID = categorie.idCategorie ORDER BY idexercice ",
      function (error, resultSQL) {
        if (error) {
          response.status(400).send(error);
        } else {
          response.status(200);
          exerciceList = resultSQL;
          console.log(exerciceList);
          response.render("exerciceList.ejs", { exercices: exerciceList });
        }
      }
    );
  };
  
  exports.exerciceListNew = function (request, response) {
    let exercice = new Exercice(
      request.body.nomExercice,
      request.body.difficulty,
      request.body.reps,
      request.body.description,
      request.body.categorie
    );
  
    connection.query(
      "INSERT INTO exercice set ?",
      exercice,
      function (error, resultSQL) {
        if (error) {
          response.status(400).send(error);
        } else {
          response.status(201).redirect("/exerciceList");
        }
      }
    );
  };
  
  // Montrer la liste avec les champs qui sont remplis de celui
  
  exports.exerciceListUpdateShow = function (request, response) {
    let idexercice = request.params.idexercice;
  
    connection.query("select * from categorie", function (error, resultSQL) {
      if (error) {
        response.status(400).send(error);
      } else {
        response.status(200);
        console.log(resultSQL);
        categorieList = resultSQL;
  
        connection.query(
          "SELECT * FROM exercice WHERE idexercice =?",
          idexercice,
          function (error, resultSQL) {
            if (error) {
              response.status(400).send(error);
            } else {
              console.log(exerciceList);
              response.render("exerciceUpdate.ejs", {
                exercice: resultSQL[0],
                categorieList: categorieList,
              });
            }
          }
        );
      }
    });
  };
  
  // Appuyer sur sauver pour UPDATE et modifier un champ de la liste
  
  exports.exerciceListUpdate = function (request, response) {
    let idexercice = request.params.idexercice;
    let exercice = new Exercice(
      request.body.nomExercice,
      request.body.difficulty,
      request.body.reps,
      request.body.description,
      request.body.categorie
    );
  
    connection.query(
      "UPDATE exercice set ? WHERE idexercice =?",
      [exercice, idexercice],
      function (error, resultSQL) {
        if (error) {
          response.status(400).send(error);
        } else {
          console.log(exerciceList);
          response.status(202).redirect("/exerciceList");
        }
      }
    );
  };
  
  //Supprimer un élément
  
  exports.exerciceListRemove = function (request, response) {
    let idexercice = request.params.idexercice;
    let nomExercice = request.body.nomExercice;
  
    connection.query(
      "DELETE from exercice WHERE idexercice =?",
      idexercice,
      function (error, resultSQL) {
        if (error) {
          response.status(400).send(error);
        } else {
          console.log(exerciceList);
          response.redirect("/exerciceList");
        }
      }
    );
  };