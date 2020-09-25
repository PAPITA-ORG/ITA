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
          nombres: {
            name: "nombres",
            label: "Nombre(s)"
          },
          apellidos: {
            name: "apellidos",
            label: "Apellido(s)"
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
              "Cuidador principal",
              "Cuidador secundario",
              "Otro familiar",
              "Otro no familiar"
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
          educacion: {
            label: "Ultimo grado completado",
            options: [
              "Ninguno",
              "Enseñanza básica",
              "Enseñanza media",
              "Técnico superior",
              "Profesional (Instituto)",
              "Profesional (Universidad)",
              "Magíster o Doctorado"
            ],
            name: "educacion",
            type: "select",
            selected: ""
          },
          sliderInputs: [
            {
              label: "Soy capaz de entretenerme con mi niñ@.",
              name: "i1",
              value: "50"
            },
            {
              label: "Puedo planificar actividades que mi niñ@ disfruta.",
              name: "i2",
              value: "50"
            },
            {
              label: "Sé que soy un@ cuidador@ suficientemente buen@.",
              name: "i3",
              value: "50"
            },
            {
              label:
                "Puedo mantener coordinación de mis actividades de cuidador@.",
              name: "i4",
              value: "50"
            },
            {
              label:
                "Saber que otr@s tienen dificultades similares lo hace mas fácil para mí.",
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
        ],
        contentRouteBlocked: true
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
            "Perdona, no hemos podido encontrar este usuario."
          );
          cb(usr_err);
        } else {
          // usuario
          //   .populate("historials")
          //   .execPopulate()
          //   .then(res => {
          return cb(null, usuario);
          // })
          // .catch(err => res.json(err));
        }
      });
  },
  activityFormContent: () => {
    let content = {
      activity_btns: [
        {
          src: "/images/personaje-08.png",
          data_value: "3"
        },
        {
          src: "/images/personaje-07.png",
          data_value: "2"
        },
        {
          src: "/images/personaje-06.png",
          data_value: "1"
        },
        {
          src: "/images/stats.png"
        }
      ],
      attrs: {
        class_name: "activity-img"
      }
    };

    return content;
  },
  endsurveyContent: (hijos, userID, cb) => {
    // create tabs for user and all participating children
    return module.exports.getUserInfo(
      function(err, usuario) {
        if (err) return cb(`Error: ${err}`);

        let nombres = usuario.hijos.map((hijo, i) => {
          if (hijo.id === hijos[i]) return hijo.nombre;
          return;
        });

        nombres.push(usuario.correo);

        return cb(null, nombres);
      },
      { _id: userID }
    );
  }
};
