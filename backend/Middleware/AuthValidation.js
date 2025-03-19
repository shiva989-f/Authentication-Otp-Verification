import joi from "joi";

export const registerValidation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(3).max(60).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(60).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const message = error?.details[0]?.message || "Fields are not valid";
    return res.status(400).json({ message: message, error });
  }
  next();
};

export const loginValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(60).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const message = error?.details[0]?.message || "Fields are not valid";
    return res.status(400).json({ message: message, error });
  }
  next();
};
