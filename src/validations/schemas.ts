import Joi from 'joi';

const addProductSchema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.string().min(3).required(),
  orderId: Joi.number().required(),
});

const addOrderSchema = Joi.object({
  userId: Joi.number().integer().min(1).required()
    .strict(),
  productIds: Joi.array().items(Joi.number()).min(1).required()
    .messages({
      'array.min': '"productIds" must include only numbers',
    }),
});

export {
  addProductSchema,
  addOrderSchema,
};