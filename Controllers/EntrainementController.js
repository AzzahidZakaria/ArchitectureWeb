
const Entrainements = require("../Models/Entrainements");

let Test = "Zakaria";
let entrainementList = [];
let connection = require("../db");
let exerciceList = [];


// route qui envoi la liste des entrainemnts

exports.entrainement = function (req, response) {
    connection.query("SELECT * FROM exercice ", function (error, resultSQL) {
      if (error) {
        response.status(400).send(error);
      } else {
        exerciceList = resultSQL;
      }
    });
  
    connection.query(" SELECT * FROM entrainement ", function (error, resultSQL) {
      if (error) {
        response.status(400).send(error);
      } else {
        response.status(200);
        let resultEntrainement = {};
        entrainementList = resultSQL;
        entrainementList.forEach(function (entrainement, index) {
          connection.query(
            " SELECT * FROM entrainement_exercice JOIN exercice ON entrainement_exercice.exercice_ID = exercice.idExercice" +
              " JOIN entrainement ON entrainement_exercice.entrainement_ID = entrainement.idEntrainement WHERE entrainement_ID = ? ",
            entrainement.idEntrainement,
            function (error, resultSQL) {
              if (error) {
                response.status(400).send(error);
              } else {
                resultEntrainement[entrainement.idEntrainement] = resultSQL;
  
                if (entrainementList.length - 1 == index) {
                  console.log("Avant le render", resultEntrainement);
                  response.render("Entrainement.ejs", {
                    name: Test,
                    EntrainementList: resultEntrainement,
                    exerciceList: exerciceList,
                  });
                }
              }
            }
          );
        });
      }
    });
  };
  
  // route qui va renvoyer une vue pour ajouter un entrainement
  
  exports.AddEntrainement = function (req, res) {
    let categorieList = [];
  
    connection.query("select * from categorie", function (error, resultSQL) {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(200);
        console.log(resultSQL);
        categorieList = resultSQL;
  
        res.render("AddEntrainement.ejs", { categorieList: categorieList });
      }
    });
  };
  
  exports.AddEntrainementNew = function (request, response) {
  
  
      let entrainement = new Entrainements(
          request.body.repos,
          request.body.idEntrainement);
      
        connection.query(
          "INSERT INTO entrainement set ?",
          entrainement,
          function (error, resultSQL) {
            if (error) {
              response.status(400).send(error);
            } else {
              response.status(201).redirect("/entrainement");
            }
          }
        );
      };
  
  
  
  // afin de supprimer un entrainement donné
  
  exports.DeleteEntrainement = function (request, response) {
  
      let idEntrainement = request.params.idEntrainement;
      let nomExercice = request.body.nomExercice;
    
      connection.query(
        "DELETE from entrainement WHERE idEntrainement =?",
        idEntrainement,
        function (error, resultSQL) {
          if (error) {
            response.status(400).send(error);
          } else {
            console.log(exerciceList);
            response.redirect("/entrainement");
          }
        }
      );
    };
  
  
  
  
  exports.AddExerciceEntrainement = function (request, response) {
    let exercice = request.body.exercice;
    let entrainement = request.body.entrainement;
    console.log("j'ai ajouter ca :", entrainement, exercice);
    connection.query(
      "INSERT INTO entrainement_exercice (exercice_ID,entrainement_ID) VALUES (?)",
      [[exercice, entrainement]],
      function (error, resultSQL) {
        if (error) {
          response.status(400).send(error);
        } else {
          response.status(201).redirect("/Entrainement");
        }
      }
    );
  };
  
  exports.DeleteExerciceEntrainement = function (request, response) {
    let identrainementexercice = request.params.identrainementexercice;
  
    connection.query(
      "DELETE from entrainement_exercice WHERE identrainement_exercice =? ",
      identrainementexercice,
      function (error, resultSQL) {
        if (error) {
          response.status(400).send(error);
        } else {
          console.log(exerciceList);
          response.redirect("/Entrainement");
        }
      }
    );
  };