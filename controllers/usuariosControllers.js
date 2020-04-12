// import airtable database
const db = require("../models");

// define methods for usuarios controllers
module.exports = {
  // find all usuarios
  findAll: (req, res) => {
    db.db("Usuarios")
      .select({
        view: "Grid view",
        cellFormat: "json"
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function(record) {
            console.log("Retrieved", record.fields);
          });

          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  },
  findOne: (req, res) => {
    db.db("Usuarios")
      .select({
        filterByFormula: `(Usuario = '${req.params.usuario}')`
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function(record) {
            res.json(record.fields);
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  },
  create: (req, res) => {
    // console.log(req.body);
    db.db("Usuarios").create([req.body], function(err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function(record) {
        console.log(`New Usuario`, record.getId());
      });
    });
  }
};
