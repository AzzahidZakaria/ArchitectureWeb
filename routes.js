const { request, response } = require('express');
let express = require('express');
let router = express.Router();

let Controller = require('./Controllers/Controller');
let ExerciceController = require('./Controllers/ExerciceController');
let EntrainementController = require('./Controllers/EntrainementController');


//Liste des routes :
router.get('/', (req,res) => res.redirect('/index'));

//page d'accueil
router.get('/index', Controller.home);


//LES EXERCICES

// page qui contient la liste de tous les exercices
router.get('/exerciceList', ExerciceController.exerciceList);

//Vue qui contient le formulaire pour ajouter un exercice
router.get('/addExercice', ExerciceController.addExercice);

// lorsqu'on appuie sur le bouton sauver pour envoyer le formulaire
router.post('/exerciceList/New/', ExerciceController.exerciceListNew);

//route qui affiche les informations de la vue  d'un exo lrosqu'on appui sur modifier
router.get('/exerciceList/Show/:idexercice', ExerciceController.exerciceListUpdateShow);

//lorsqu'on appui sur sauver après avoir modifier et renvoi sur la liste
router.post('/exerciceList/Update/:idexercice', ExerciceController.exerciceListUpdate);

//lorsqu'on appui sur supprimer un exercice
router.get('/exerciceList/Remove/:idexercice', ExerciceController.exerciceListRemove);


//LES ENTRAINEMENTS

// renvoi la vue contenant les entrainements
router.get('/entrainement', EntrainementController.entrainement);

// Renvoi la vue du formulaire pour encoder un entrainement
router.get('/addEntrainement', EntrainementController.AddEntrainement);

//Quand j'appuie sur sauver l'entrainement
router.post('/addEntrainement/New/', EntrainementController.AddEntrainementNew);

//route pour supprimer un entrainement donné
router.get('/delete-entrainement/:identrainement', EntrainementController.DeleteEntrainement);



//LES EXERCICES DANS LES ENTRAINEMENTS

//route pour ajouter un exercice à un entrainement
router.post('/add-exercice-entrainement', EntrainementController.AddExerciceEntrainement);


//route pour supprimer un exercice à un entrainement
router.get('/delete-exercice-entrainement/:identrainementexercice', EntrainementController.DeleteExerciceEntrainement);


//RECHERCHE

//Route pour faire une recherche
router.get('/Search', Controller.Search);

module.exports = router;