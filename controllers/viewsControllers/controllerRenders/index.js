// import Comunas, and usuario model
const Comuna = require("../../../models").comunas;
const Usuario = require("../../../models").usuarios;

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
          educacion: {
            label: "Nivel Educativo",
            options: [
              "basica incompleta",
              "basica completa",
              "media incompleta",
              "media completa",
              "tecnico",
              "profesional",
              "postgrado"
            ]
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
  },
  renderNavContent: content_name => {
    let content;
    if (content_name === "index") {
      content = {
        home: [
          {
            icon_class: "fa fa-home icon-3x",
            icon_id: "home",
            href: "/"
          },
          {
            icon_class: "fa fa-user-plus icon-3x",
            icon_id: "user-plus",
            href: "/sobre"
          }
        ]
      };
      return content;
    } else if (content_name === "auth") {
      content = {
        auth: [
          {
            icon_class: "fa fa-user icon-3x",
            icon_id: "user",
            href: "/perfil"
          },
          {
            icon_class: "fa fa-chart-line icon-3x",
            icon_id: "chart-line",
            href: "/stats"
          },
          {
            icon_class: "fa fa-door-open icon-3x",
            icon_id: "btn-logout"
          },
          {
            icon_class: "fa fa-hiking icon-3x",
            icon_id: "hiking",
            href: "/start"
          }
        ]
      };

      return content;
    }
  },
  getUserInfo: (cb, query) => {
    Usuario.findOne(query)
      .populate("hijos")
      .exec(function(err, usuario) {
        if (err) {
          let usr_err = new Error(
            "USR_ERR",
            "Sorry, we failed to retrieve the user."
          );
          cb(usr_err);
        } else {
          cb(null, usuario);
        }
      });
  }
};