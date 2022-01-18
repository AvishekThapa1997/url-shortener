export const getIndex = (req, res, next) => {
  res.render("index", {
    result: false,
  });
};
