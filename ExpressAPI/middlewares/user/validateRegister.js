const Joi = require("joi");

module.exports = (req, res, next) => {
  try {
    let { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    next();
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
};

const validate = (data) => {
  const schema = Joi.object({
    name:Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(1024).required(),
    gender:Joi.string().min(4).max(6).required()
  });
  return schema.validate(data, { abortEarly: false });
};
