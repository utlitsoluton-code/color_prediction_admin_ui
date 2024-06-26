const Joi = require("joi");

const slotJoiMiddleware = function (req, res, next) {
  const joiModel = Joi.object().keys({
    slotNumber: Joi.number().integer().positive().required().messages({
      "any.required": "Slot number is required",
    }),
    slotName: Joi.string().required().messages({
      "any.required": "Slot name is required",
    }),
    startDate: Joi.date().timestamp("javascript").required().messages({
      "any.required": "Start date is required",
    }),
    startTime: Joi.date().timestamp("javascript").required().messages({
      "any.required": "Start time required",
    }),
    endTime: Joi.date().timestamp("javascript").required().messages({
      "any.required": "End time is required",
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
  slotJoiMiddleware,
  changeStatusJoiMiddleware,
};
