const Entrainements = require("../Models/Entrainements");

let Test = "Zakaria";
let entrainementList = [];
let connection = require("../db");
let exerciceList = [];

// CE CONTROLLEUR CONTIENT TOUTES ES FONCTIONS LIES AU ENTRAINEMENT


// route qui envoi la liste des entrainemnts / ok

exports.entrainement = function (req, response) {
  
    connection.query(" SELECT * FROM entrainement ", function (error, resultSQL) {
      if (error) {
        response.status(400).json({'error':error});
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
                response.status(400).json({'error':error});
              } else {
                resultEntrainement[entrainement.idEntrainement] = resultSQL;
  
                if (entrainementList.length - 1 == index) {
                   console.log("Avant le render", resultEntrainement);
                  response.status(201).json(resultEntrainement);
                }
              }
            }
          );
        });
      }
    });
  };
  
  // route qui va renvoyer une vue pour ajouter un entrainement
  // renvoi un formulaire donc inutile
  
  // exports.AddEntrainement = function (req, res) {
  //   let categorieList = [];
  
  //   connection.query("select * from categorie", function (error, resultSQL) {
  //     if (error) {
  //       res.status(400).send(error);
  //     } else {
  //       res.status(200);
  //       console.log(resultSQL);
  //       categorieList = resultSQL;
  
  //       res.render("AddEntrainement.ejs", { categorieList: categorieList });
  //     }
  //   });
  // };
  

  // ok, requete post man correct :
  //     { "repos": 500, "Done": "true" }
  exports.AddEntrainementNew = function (request, response) {
  
  
      let entrainement = new Entrainements(request.body.repos,false);
      
        connection.query(
          "INSERT INTO entrainement set ?",
          entrainement,
          function (error, resultSQL) {
            if (error) {
              response.status(400).send(error);
            } else {
              console.log(request.body.repos);
              response.status(201).json([{"message":"success"}]);
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
            response.status(400).json({'error':error});
          } else {
            console.log(exerciceList);
            response.status(201).json([{"message":"success"}]);
          }
        }
      );
    };
  
  
  
  // requete postman correcte :
  //{ "exercice": 1, "entrainement": 1 }
  exports.AddExerciceEntrainement = function (request, response) {
    let exercice = request.body.exercice;
    let entrainement = request.body.entrainement;
    console.log("j'ai ajouter ca :", entrainement, exercice);
    connection.query(
      "INSERT INTO entrainement_exercice (exercice_ID,entrainement_ID) VALUES (?)",
      [[exercice, entrainement]],
      function (error, resultSQL) {
        if (error) {
          response.status(400).json({'error':error});
        } else {
          response.status(201).json([{"message":"success"}]);
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
          response.status(400).json({'error':error});
        } else {
          console.log(exerciceList);
          response.status(201).json([{"message":"success"}]);
        }
      }
    );
  };

//route 
exports.changeStatut = function (request, response) {
  let idEntrainement = request.params.idEntrainement
  let statut = request.params.statut;
  if (statut == 1) {
    statut = 0;
    
  }else{
    statut = 1;
  }
  console.log(statut);
  connection.query(
    "UPDATE entrainement set Done=? WHERE idEntrainement =?",
    [statut, idEntrainement],
    function (error, resultSQL) {
      if (error) {
        response.status(400).json({'error':error});
      } else {
        
        console.log(!statut);
        response.status(201).json([{"message":"success"}]);
      }
    }
  );
};