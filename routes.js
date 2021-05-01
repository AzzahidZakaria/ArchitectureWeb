const { request, response } = require("express");
let express = require("express");
let router = express.Router();

let Controller = require("./Controllers/Controller");
let ExerciceController = require("./Controllers/ExerciceController");
let ExerciceControllerApi = require("./Controllers/ExerciceControllerApi");
let EntrainementController = require("./Controllers/EntrainementController");
let EntrainementControllerApi = require("./Controllers/EntrainementControllerApi");

//Liste des routes :
router.get("/", (req, res) => res.redirect("/index"));

//page d'accueil
router.get("/index", Controller.home);

//LES EXERCICES

// page qui contient la liste de tous les exercices
router.get("/exerciceList", ExerciceController.exerciceList);

//Vue qui contient le formulaire pour ajouter un exercice
router.get("/addExercice", ExerciceController.addExercice);

// lorsqu'on appuie sur le bouton sauver pour envoyer le formulaire
router.post("/exerciceList/New/", ExerciceController.exerciceListNew);

//route qui affiche les informations de la vue  d'un exo lrosqu'on appui sur modifier
router.get("/exerciceList/Show/:idexercice",ExerciceController.exerciceListUpdateShow);

//lorsqu'on appui sur sauver après avoir modifier et renvoi sur la liste
router.post("/exerciceList/Update/:idexercice",ExerciceController.exerciceListUpdate);

//lorsqu'on appui sur supprimer un exercice
router.get("/exerciceList/Remove/:idexercice",ExerciceController.exerciceListRemove);

//// ************* EXERCICE APIs ***************////

    // page qui contient la liste de tous les exercices / ok
    router.get("/api/exerciceList", ExerciceControllerApi.exerciceList);

    // lorsqu'on appuie sur le bouton sauver pour envoyer le contenu du formulaire / ok
    router.post("/api/exerciceList/New/", ExerciceControllerApi.exerciceListNew);

    //lorsqu'on appui sur sauver après avoir modifier et renvoi sur la liste / ok
    router.put("/api/exerciceList/Update/:idexercice",ExerciceControllerApi.exerciceListUpdate);

    //lorsqu'on appui sur supprimer un exercice / ok
    router.delete("/api/exerciceList/Remove/:idexercice",ExerciceControllerApi.exerciceListRemove);

//LES ENTRAINEMENTS

// renvoi la liste contenant les entrainements
router.get("/entrainement", EntrainementController.entrainement);

// Renvoi la vue du formulaire pour encoder un entrainement
router.get("/addEntrainement", EntrainementController.AddEntrainement);

//Quand j'appuie sur sauver l'entrainement
router.post("/addEntrainement/New/", EntrainementController.AddEntrainementNew);

//route pour supprimer un entrainement donné
router.get("/delete-entrainement/:idEntrainement",EntrainementController.DeleteEntrainement);

//route pour changer le statut
router.get("/change-statut/:idEntrainement/:statut",EntrainementController.changeStatut);

//// ******** ENTRAINEMENT API ********* ///

    // renvoi la vue contenant les entrainements / ok
    router.get("/api/entrainement", EntrainementControllerApi.entrainement);


    //Quand j'appuie sur le bouton sauver l'entrainement / ok
    router.post("/api/addEntrainement/New/",EntrainementControllerApi.AddEntrainementNew);

    //route pour supprimer un entrainement donné / ok
    router.delete("/api/delete-entrainement/:idEntrainement",EntrainementControllerApi.DeleteEntrainement);

//LES EXERCICES DANS LES ENTRAINEMENTS

//route pour ajouter un exercice à un entrainement
router.post("/add-exercice-entrainement",EntrainementController.AddExerciceEntrainement);

//route pour supprimer un exercice à un entrainement
router.get("/delete-exercice-entrainement/:identrainementexercice",EntrainementController.DeleteExerciceEntrainement);

// *********** API LES EXERCICES DANS LES ENTRAINEMENTS ************ //

    //route pour ajouter un exercice à un entrainement / ok
    router.post("/api/add-exercice-entrainement",EntrainementControllerApi.AddExerciceEntrainement);

    //route pour supprimer un exercice à un entrainement / ok
    router.delete("/api/delete-exercice-entrainement/:identrainementexercice",EntrainementControllerApi.DeleteExerciceEntrainement);

//RECHERCHE

//Route pour faire une recherche
router.get("/Search", Controller.Search);

module.exports = router;
