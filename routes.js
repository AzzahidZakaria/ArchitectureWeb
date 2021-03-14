const { request, response } = require('express');
let express = require('express');
let router = express.Router();

let Controller = require('./Controllers/Controller');


//Liste des routes :
router.get('/', (req,res) => res.redirect('/index'));


router.get('/index', Controller.home);
router.get('/exerciceList', Controller.exerciceList);
router.get('/exerciceList/Show/:idexercice', Controller.exerciceListUpdateShow);
router.post('/exerciceList/Update/:idexercice', Controller.exerciceListUpdate);
router.get('/exerciceList/Remove/:idexercice', Controller.exerciceListRemove);
router.get('/addExercice', Controller.addExercice);
router.post('/exerciceList/New/', Controller.exerciceListNew);
router.get('/entrainement', Controller.entrainement);


module.exports = router;