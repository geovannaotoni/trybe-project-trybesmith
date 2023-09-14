import { Request, Response } from 'express';
import mapStatusHttp from '../utils/mapStatusHttp';
import ordersService from '../services/orders.service';

const list = async (req: Request, res: Response) => {
  const serviceResponse = await ordersService.list();

  res.status(mapStatusHttp(serviceResponse.status)).json(serviceResponse.data);
};

export default {
  list,
};