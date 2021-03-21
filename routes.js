const { request, response } = require('express');
let express = require('express');
let router = express.Router();

let Controller = require('./Controllers/Controller');


//Liste des routes :
router.get('/', (req,res) => res.redirect('/index'));

//page d'accueil
router.get('/index', Controller.home);

//LES EXERCICES

// page qui contient la liste de tous les exercices
router.get('/exerciceList', Controller.exerciceList);

//Vue qui contient le formulaire pour ajouter un exercice
router.get('/addExercice', Controller.addExercice);

// lorsqu'on appuie sur le bout sauver pour envoyer le formulaire
router.post('/exerciceList/New/', Controller.exerciceListNew);

//route qui affiche les informations de la vue  d'un exo lrosqu'on appui sur modifier
router.get('/exerciceList/Show/:idexercice', Controller.exerciceListUpdateShow);

//lorsqu'on appui sur sauver après avoir modifier et renvoi sur la liste
router.post('/exerciceList/Update/:idexercice', Controller.exerciceListUpdate);

//lorsqu'on appui sur supprimer un exercice
router.get('/exerciceList/Remove/:idexercice', Controller.exerciceListRemove);

//LES ENTRAINEMENTS

// renvoi la vue contenant les entrainements
router.get('/entrainement', Controller.entrainement);

// Renvoi la vue du formulaire pour encoder un entrainement
router.get('/AddEntrainement', Controller.AddEntrainement);

//




module.exports = router;