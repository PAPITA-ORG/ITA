module.exports = {
  login: (req, res) => {
    res.render("index");
  },
  sobreView: (req, res) => {
    res.render("sobre");
  },
  subscribeView: (req, res) => {
    let subscribeForm = require("./controllerRenders/");

    subscribeForm.findComunas(renderSubscribe);

    function renderSubscribe(err, subscribeForm) {
      if (err) {
        res.json("RSRC", "Could not retrieve expected database resources");
      } else {
        res.render("subscribe", { data: subscribeForm, errors: [] });
      }
    }
  },
  startView: (req, res) => {
    res.render("start", { id: req.session.passport.user });
  },
  registro: (req, res) => {
    res.render("registro");
  },
  tutorialView: (req, res) => {
    res.render("tutorial", { id: req.session.passport.user });
  },
  notfoundView: (req, res) => {
    res.render("notfound");
  }
};
