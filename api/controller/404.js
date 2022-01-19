const get404 = (req, res) => {
  res.status(404).send({
    message: "Resource Not Found",
  });
};
export default get404;
