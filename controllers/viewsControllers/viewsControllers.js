const controller_renders = require("./controllerRenders/");

module.exports = {
  login: (req, res) => {
    let index_data = controller_renders.renderNavContent("index");
    res.render("index", { view_data: index_data });
  },
  sobreView: (req, res) => {
    let sobre_data = controller_renders.renderNavContent("index");
    res.render("sobre", { view_data: sobre_data });
  },
  subscribeView: (req, res) => {
    let subscribe_view = controller_renders.renderNavContent("index");

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
    let start_data = controller_renders.renderNavContent("auth");
    let usuario_id = req.session.passport.user;

    controller_renders.getUserInfo(userInfoHandler, { _id: usuario_id });

    function userInfoHandler(err, usuario) {
      if (err) res.json("ERR_USR", `Sorry, we couldn't get the requested user`);

      let { hijos } = usuario;

      res.render("start", {
        id: usuario._id,
        view_data: start_data,
        hijos: hijos
      });
    }
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
    let registro_data = controller_renders.renderNavContent("index");
    res.render("registro", { view_data: registro_data });
  },
  tutorialView: (req, res) => {
    let tutorial_data = controller_renders.renderNavContent("auth");
    res.render("tutorial", {
      id: req.session.passport.user,
      view_data: tutorial_data
    });
  },
  notfoundView: (req, res) => {
    let notfound_data = req.session.passport.user? 
    (controller_renders.renderNavContent("auth")):
    (controller_renders.renderNavContent("index"))
    res.render("notfound",{ 
      view_data: notfound_data, 
      id: req.session.passport.user 
    });
    
  }
};
