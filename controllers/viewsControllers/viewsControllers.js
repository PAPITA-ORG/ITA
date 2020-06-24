const controller_renders = require("./controllerRenders/");

function renderContent(content_name) {
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
}

module.exports = {
  login: (req, res) => {
    let index_data = renderContent("index");
    res.render("index", { view_data: index_data });
  },
  sobreView: (req, res) => {
    let sobre_data = renderContent("index");
    res.render("sobre", { view_data: sobre_data });
  },
  subscribeView: (req, res) => {
    let subscribe_view = renderContent("index");

    controller_renders.findComunas(renderSubscribe);

    function renderSubscribe(err, subscribeForm) {
      if (err) {
        res.json("RSRC", "Could not retrieve expected database resources");
      } else {
        res.render("subscribe", {
          data: subscribeForm,
          errors: [],
          view_data: subscribe_view
        });
      }
    }
  },
  startView: (req, res) => {
    let start_data = renderContent("auth");
    res.render("start", {
      id: req.session.passport.user,
      view_data: start_data
    });
  },
  encuestaActividadView: (req, res) => {
    debugger;
    let usuario_id = req.session.passport.user;
    controller_renders.getUserInfo(userInfoHandler, {
      _id: usuario_id
    });

    function userInfoHandler(err, usuario) {
      if (err) res.json("ERR_USR", `Sorry, we couldn't get the requested user`);

      let { hijos } = usuario;
      let active_hijos = req.body.active_hijos;

      // filter hijos from db based on ids from hijos from request body
      hijos = hijos.filter(hijo => hijo._id === active_hijos);

      res.render("encuesta-actividad", { usuario: usuario, hijos: hijos });
    }
  },
  registro: (req, res) => {
    let registro_data = renderContent("index");
    res.render("registro", { view_data: registro_data });
  },
  tutorialView: (req, res) => {
    let tutorial_data = renderContent("auth");
    res.render("tutorial", {
      id: req.session.passport.user,
      view_data: tutorial_data
    });
  },
  notfoundView: (req, res) => {
    res.render("notfound");
  }
};
