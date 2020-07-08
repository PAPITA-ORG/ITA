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
          href: "/account"
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
    let subscribeForm = require("./controllerRenders/");
    let subscribe_view = renderContent("index");

    subscribeForm.findComunas(renderSubscribe);

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
  },
  accountView: (req, res) => {
    let account_data = renderContent("auth");
    res.render("userAccount", {
      id: req.session.passport.user,
      view_data: account_data
    });
  }
};
