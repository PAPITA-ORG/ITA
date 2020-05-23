module.exports = {
  login: (req, res) => {
    res.render("index");
  },
  sobreView: (req, res) => {
    res.render("sobre");
  },
  startView: (req, res) => {
    res.render("start", { id: req.session.passport.user });

  },
  startNewView: (req, res) => {
    res.render("start_new");

  },
  registro: (req, res) => {
    res.render("registro");
  },
  tutorialView: (req, res) => {
    res.render("tutorial", { id: req.session.passport.user });
  },
};
