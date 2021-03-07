const { request, response } = require('express');
let express = require('express');
let router = express.Router();


//Liste des routes :
router.get('/', (req,res) => res.redirect('/index'));
router.get('/index', (request, response) =>
{

response.render('home.ejs' ,{name : "Zakaria" });
});

module.exports = router;