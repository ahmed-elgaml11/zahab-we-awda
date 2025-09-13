import Joi from 'joi';

export const authValidators = {
  register: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('user', 'admin', 'moderator').default('user')
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  updateProfile: Joi.object({
    name: Joi.string().min(2).max(50),
    email: Joi.string().email()
  })
};

export const packageValidators = {
  create: Joi.object({
    title: Joi.object({
      en: Joi.string().required(),
      ar: Joi.string().required()
    }).required(),
    description: Joi.object({
      en: Joi.string().required(),
      ar: Joi.string().required()
    }).required(),
    price: Joi.number().min(0).required(),
    duration: Joi.number().min(1).required(),
    country: Joi.string().hex().length(24).required(),
    city: Joi.string().hex().length(24).required(),
    packageType: Joi.string().hex().length(24).required()
  })
};

export const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    req.body = value;
    next();
  };
};