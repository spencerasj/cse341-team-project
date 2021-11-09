module.exports = (req, res, next) => {
  // Uncomment this to require login
  // if (!req.session.isLoggedIn) {
  //   return res.redirect("/login");
  // }
  next();
};
