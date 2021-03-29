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

// exports.addExercice = function (req, res) {
//   let categorieList = [];

//   connection.query("select * from categorie", function (error, resultSQL) {
//     if (error) {
//       res.status(400).send(error);
//     } else {
//       res.status(200);
//       console.log(resultSQL);
//       categorieList = resultSQL;

//       res.render("AddExercice.ejs", { categorieList: categorieList });
//     }
//   });
// };

// exports.exerciceList = function (request, response) {
//   connection.query(
//     "select * from exercice join categorie on exercice.categorie_ID = categorie.idCategorie ORDER BY idexercice ",
//     function (error, resultSQL) {
//       if (error) {
//         response.status(400).send(error);
//       } else {
//         response.status(200);
//         exerciceList = resultSQL;
//         console.log(exerciceList);
//         response.render("exerciceList.ejs", { exercices: exerciceList });
//       }
//     }
//   );
// };

// exports.exerciceListNew = function (request, response) {
//   let exercice = new Exercice(
//     request.body.nomExercice,
//     request.body.difficulty,
//     request.body.reps,
//     request.body.description,
//     request.body.categorie
//   );

//   connection.query(
//     "INSERT INTO exercice set ?",
//     exercice,
//     function (error, resultSQL) {
//       if (error) {
//         response.status(400).send(error);
//       } else {
//         response.status(201).redirect("/exerciceList");
//       }
//     }
//   );
// };

// // Montrer la liste avec les champs qui sont remplis de celui

// exports.exerciceListUpdateShow = function (request, response) {
//   let idexercice = request.params.idexercice;

//   connection.query("select * from categorie", function (error, resultSQL) {
//     if (error) {
//       response.status(400).send(error);
//     } else {
//       response.status(200);
//       console.log(resultSQL);
//       categorieList = resultSQL;

//       connection.query(
//         "SELECT * FROM exercice WHERE idexercice =?",
//         idexercice,
//         function (error, resultSQL) {
//           if (error) {
//             response.status(400).send(error);
//           } else {
//             console.log(exerciceList);
//             response.render("exerciceUpdate.ejs", {
//               exercice: resultSQL[0],
//               categorieList: categorieList,
//             });
//           }
//         }
//       );
//     }
//   });
// };

// // Appuyer sur sauver pour UPDATE et modifier un champ de la liste

// exports.exerciceListUpdate = function (request, response) {
//   let idexercice = request.params.idexercice;
//   let exercice = new Exercice(
//     request.body.nomExercice,
//     request.body.difficulty,
//     request.body.reps,
//     request.body.description,
//     request.body.categorie
//   );

//   connection.query(
//     "UPDATE exercice set ? WHERE idexercice =?",
//     [exercice, idexercice],
//     function (error, resultSQL) {
//       if (error) {
//         response.status(400).send(error);
//       } else {
//         console.log(exerciceList);
//         response.status(202).redirect("/exerciceList");
//       }
//     }
//   );
// };

// //Supprimer un élément

// exports.exerciceListRemove = function (request, response) {
//   let idexercice = request.params.idexercice;
//   let nomExercice = request.body.nomExercice;

//   connection.query(
//     "DELETE from exercice WHERE idexercice =?",
//     idexercice,
//     function (error, resultSQL) {
//       if (error) {
//         response.status(400).send(error);
//       } else {
//         console.log(exerciceList);
//         response.redirect("/exerciceList");
//       }
//     }
//   );
// };

// // route qui envoi la liste des entrainemnts

// exports.entrainement = function (req, response) {
//   connection.query("SELECT * FROM exercice ", function (error, resultSQL) {
//     if (error) {
//       response.status(400).send(error);
//     } else {
//       exerciceList = resultSQL;
//     }
//   });

//   connection.query(" SELECT * FROM entrainement ", function (error, resultSQL) {
//     if (error) {
//       response.status(400).send(error);
//     } else {
//       response.status(200);
//       let resultEntrainement = {};
//       entrainementList = resultSQL;
//       entrainementList.forEach(function (entrainement, index) {
//         connection.query(
//           " SELECT * FROM entrainement_exercice JOIN exercice ON entrainement_exercice.exercice_ID = exercice.idExercice" +
//             " JOIN entrainement ON entrainement_exercice.entrainement_ID = entrainement.idEntrainement WHERE entrainement_ID = ? ",
//           entrainement.idEntrainement,
//           function (error, resultSQL) {
//             if (error) {
//               response.status(400).send(error);
//             } else {
//               resultEntrainement[entrainement.idEntrainement] = resultSQL;

//               if (entrainementList.length - 1 == index) {
//                 console.log("Avant le render", resultEntrainement);
//                 response.render("Entrainement.ejs", {
//                   name: Test,
//                   EntrainementList: resultEntrainement,
//                   exerciceList: exerciceList,
//                 });
//               }
//             }
//           }
//         );
//       });
//     }
//   });
// };

// // route qui va renvoyer une vue pour ajouter un entrainement

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

// exports.AddEntrainementNew = function (request, response) {


//     let entrainement = new Entrainements(
//         request.body.repos,
//         request.body.idEntrainement);
    
//       connection.query(
//         "INSERT INTO entrainement set ?",
//         entrainement,
//         function (error, resultSQL) {
//           if (error) {
//             response.status(400).send(error);
//           } else {
//             response.status(201).redirect("/entrainement");
//           }
//         }
//       );
//     };



// // afin de supprimer un entrainement donné

// exports.DeleteEntrainement = function (request, response) {

//     let idEntrainement = request.params.idEntrainement;
//     let nomExercice = request.body.nomExercice;
  
//     connection.query(
//       "DELETE from entrainement WHERE idEntrainement =?",
//       idEntrainement,
//       function (error, resultSQL) {
//         if (error) {
//           response.status(400).send(error);
//         } else {
//           console.log(exerciceList);
//           response.redirect("/entrainement");
//         }
//       }
//     );
//   };




// exports.AddExerciceEntrainement = function (request, response) {
//   let exercice = request.body.exercice;
//   let entrainement = request.body.entrainement;
//   console.log("j'ai ajouter ca :", entrainement, exercice);
//   connection.query(
//     "INSERT INTO entrainement_exercice (exercice_ID,entrainement_ID) VALUES (?)",
//     [[exercice, entrainement]],
//     function (error, resultSQL) {
//       if (error) {
//         response.status(400).send(error);
//       } else {
//         response.status(201).redirect("/Entrainement");
//       }
//     }
//   );
// };

// exports.DeleteExerciceEntrainement = function (request, response) {
//   let identrainementexercice = request.params.identrainementexercice;

//   connection.query(
//     "DELETE from entrainement_exercice WHERE identrainement_exercice =? ",
//     identrainementexercice,
//     function (error, resultSQL) {
//       if (error) {
//         response.status(400).send(error);
//       } else {
//         console.log(exerciceList);
//         response.redirect("/Entrainement");
//       }
//     }
//   );
// };



//pour faire une recherche dans la liste des exercices, sur base de son nom exact, renvoi une page contenant que l'exercice recherché

exports.Search = function (req, res) {
  let champ = req.query.Search;
  connection.query(
    "select * from exercice join categorie on exercice.categorie_ID = categorie.idCategorie where nomExercice = ? ",
    champ,
    function (error, resultSQL) {
      exerciceList = resultSQL;
      console.log(resultSQL);
      res.render("ExerciceList.ejs", { exercices: exerciceList });
    }
  );
};
