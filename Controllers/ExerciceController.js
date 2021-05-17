const Exercice = require("../Models/Exercice");


let Test = "Zakaria";
let entrainementList = [];
let connection = require("../db");
let exerciceList = [];


// CE CONTROLLEUR CONTIENT TOUTES ES FONCTIONS LIES AUX EXERCICES


  // 1 afficher la liste des exercices
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


  //2 affiche la vue pour encoder un exercice
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


  //3 envoi les informations que j'ai encodé dans la base de données
  
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
  
  // 4. Montrer la liste avec les champs qui sont remplis de celui
  
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
  
  // 5. Appuyer sur sauver pour UPDATE et modifier un champ de la liste
  
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
  
  // 6. Supprimer un élément
  
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