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

    let activity_content = controller_renders.activityFormContent();
    controller_renders.getUserInfo(userInfoHandler, { _id: usuario_id });

    function userInfoHandler(err, usuario) {
      if (err)
        res.json("ERR_USR", `Perdona, no hemos podido encontrar este usuario.`);

      let { hijos } = usuario;
      res.render("start", {
        id: usuario._id,
        af_0: usuario.af_0,
        view_data: start_data,
        hijos: hijos,
        activity_content: activity_content
      });
    }
  },
  encuestaActividadView: (req, res, next) => {
    let usuario_id = req.session.passport.user;

    let endsurvey_data = controller_renders.renderNavContent("auth");

    controller_renders.getUserInfo(
      function(err, usuario) {
        if (err) {
          res.json("ERR_USR", `Sorry, we couldn't get the requested user`);
          next();
        } else {
          let hijos = usuario.hijos;
          let active_hijos = req.body.active_hijos;

          // filter hijos from db based on ids from hijos from request body
          let chosen = hijos.filter((hijo, i) => {
            console.log(hijo.id, active_hijos, hijo.id === active_hijos);
            return hijo.id === active_hijos;
          });
          console.log("res", res);
          console.log(res.locals)((res["locals"]["id"] = usuario_id)),
            (res["locals"]["usuario"] = usuario),
            (res["locals"]["chosen_hijos"] = chosen),
            (res["locals"]["endsurvey_data"] = endsurvey_data);
          console.log(chosen);
          // res.render("start", {
          //   view_data: endsurvey_data,
          //   chosen_hijos: true
          // });
          next();
        }
      },
      {
        _id: usuario_id
      }
    );
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
    
    res.render("notfound");
  },
  accountView: (req, res) => {
    let account_data = controller_renders.renderNavContent("auth");
    res.render("userAccount", {
      id: req.session.passport.user,
      view_data: account_data,
      usuario: usuario
    });
  },
  prepareEndSurvey: (req, res) => {
    controller_renders.endsurveyContent(
      req.body.hijos,
      req.session.passport.user,
      function(err, data) {
        if (err) return err;

        req.session["data"] = data;
        res.redirect("endsurvey");
      }
    );
  },
  showEndSurvey: (req, res) => {
    let endsurvey_data = controller_renders.renderNavContent("auth");
    return res.render("endsurvey", {
      id: req.session.passport.user,
      endsurvey_data: endsurvey_data,
      survey_people: req.session.data
    });
  }
};
