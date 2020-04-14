module.exports = {
  indexView: (req, res) => {
    res.render("index");
  },
  sobreView: (req, res) => {
    res.render("sobre");
  },
  teamView: (req, res) => {
    res.render("team");
  },
  startView: (req, res) => {
    res.render("start");
  },
  startNewView: (req, res) => {
    res.render("start_new");
  },
  registroView: (req, res) => {
    res.render("registro");
  },
  selectorView: (req, res) => {
    res.render("selector");
  },
  endView: (req, res) => {
    res.render("end");
  }
};
