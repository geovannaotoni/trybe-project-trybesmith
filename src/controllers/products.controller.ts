import { Request, Response } from 'express';
import productsService from '../services/products.service';
import mapStatusHttp from '../utils/mapStatusHttp';

const create = async (req: Request, res: Response) => {
  const { name, price, orderId } = req.body;
  const serviceResponse = await productsService.create({ name, price, orderId });

  res.status(mapStatusHttp(serviceResponse.status)).json(serviceResponse.data);
};

const list = async (req: Request, res: Response) => {
  const serviceResponse = await productsService.list();

  res.status(mapStatusHttp(serviceResponse.status)).json(serviceResponse.data);
};

export default {
  create,
  list,
};