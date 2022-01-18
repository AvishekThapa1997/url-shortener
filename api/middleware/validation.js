import { validationResult } from "express-validator";
const validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const validationError = errors.array({
      onlyFirstError: true,
    });
    return res.status(422).send({
      errors: {
        message: validationError[0].msg,
      },
    });
  }
  next();
};
export default validation;
