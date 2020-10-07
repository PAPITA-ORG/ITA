module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Logueate para acceder a sus recursos!");
    res.redirect("/");
  }
};
