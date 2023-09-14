import { Request, Response } from 'express';
import loginService from '../services/login.service';
import mapStatusHttp from '../utils/mapStatusHttp';

async function login(req: Request, res: Response) {
  const serviceResponse = await loginService.verifyLogin(req.body);
  
  return res.status(mapStatusHttp(serviceResponse.status)).json(serviceResponse.data);  
}

export default {
  login,
};