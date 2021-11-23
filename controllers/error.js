exports.get404 = (req, res, next) => {
  res.render("404", {
    title: "404 - Page Not Found",
    path: req.url,
  });
};

exports.get500 = (req, res, next) => {
  res.render("500", {
    title: "500 - Server Error",
    path: req.url,
  });
};
