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
          response.json("exerciceList.ejs", { exercices: exerciceList });
        }
      }
    );
  };