const Joi = require("joi");

const corporateJoiMiddleware = function (req, res, next) {
  const joiModel = Joi.object().keys({
    name: Joi.string().required().messages({
      "any.required": "Name is required",
    }),
    description: Joi.string().required().messages({
      "any.required": "Description is required",
    }),
    imageUrl: Joi.string().required().messages({
      "any.required": "Image is required",
    }),
    mobile: Joi.string()
      .regex(/^[0-9]{10}$/)
      .length(10)
      .required()
      .messages({
        "any.required": "Mobile is required",
        "string.pattern.base": `Invalid mobile number`,
      }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .optional()
      .messages({
        "any.required": "Email is required",
      }),
    website: Joi.string().optional().messages({
      "any.required": "website is required",
    }),
    stateId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .length(24)
      .required()
      .messages({
        "any.required": "state id is required",
        "string.pattern.base": `Invalid _id`,
      }),
    cityId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .length(24)
      .required()
      .messages({
        "any.required": "city id is required",
        "string.pattern.base": `Invalid _id`,
      }),
    address: Joi.string().optional().messages({
      "any.required": "Address is required",
    }),
    foundedDate: Joi.number().integer().positive().optional().messages({
      "any.required": "Founded date is required",
    }),
  });
  let result = joiModel.validate(req.body);
  if (result.error) {
    return res.json({
      meta: { msg: result.error.details[0].message, status: false },
    });
  } else {
    return next();
  }
};

const changeStatusJoiMiddleware = function (req, res, next) {
  const joiModel = Joi.object().keys({
    _id: Joi.string().required().messages({
      "any.required": "_id is required",
    }),
    status: Joi.string()
      .required()
      .valid("active", "deactive", "ACTIVE", "DEACTIVE")
      .messages({
        "any.required": "status is required",
      }),
  });
  let result = joiModel.validate(req.body);
  if (result.error) {
    return res.json({
      meta: { msg: result.error.details[0].message, status: false },
    });
  } else {
    return next();
  }
};

module.exports = {
  corporateJoiMiddleware,
  changeStatusJoiMiddleware,
};
