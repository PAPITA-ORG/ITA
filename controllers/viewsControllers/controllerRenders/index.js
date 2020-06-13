// import Comunas model
const Comuna = require("../../../models").comunas;

module.exports = {
  findComunas: cb => {
    Comuna.find().exec(function(err, comunas) {
      if (err) {
        console.log("Something is wrong with db communication...");
        cb(err);
      } else {
        let subscribeForm = {
          correo: {
            name: "correo",
            label: "Correo",
            value: ""
          },
          password: {
            name: "password",
            label: "Correo"
          },
          edad: {
            label: "Edad",
            name: "edad"
          },
          parentesco: {
            label: "Parentesco",
            options: [
              "mama",
              "papa",
              "abuelo",
              "abuela",
              "otro familiar",
              "otro no familiar"
            ],
            name: "parentesco",
            type: "select",
            selected: ""
          },
          genero: {
            label: "Genero",
            options: ["prefiero no decir", "otro", "mujer", "hombre"],
            name: "genero",
            type: "select",
            selected: ""
          },
          comuna: {
            label: "Comuna",
            options: comunas,
            name: "comunaCod",
            type: "select",
            selected: ""
          },
          sliderInputs: [
            {
              label: "Siempre puedo resolver problemas si trato lo suficiente",
              name: "i1",
              value: "50"
            },
            {
              label: "Es facil lograr mis metas y mantener mis objetivos",
              name: "i2",
              value: "50"
            },
            {
              label: "Se como manejar situaciones imprevistas",
              name: "i3",
              value: "50"
            },
            {
              label: "Puedo mantener la calma ante nuevas dificultades",
              name: "i4",
              value: "50"
            },
            {
              label: "Cuando tengo problemas, logro pensar varias soluciones",
              name: "i5",
              value: "50"
            }
          ]
        };
        cb(null, subscribeForm);
      }
    });
  }
};
