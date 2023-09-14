import Joi from 'joi';

const addProductSchema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.string().min(3).required(),
  orderId: Joi.number().required(),
});

export default addProductSchema;