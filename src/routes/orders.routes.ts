import { Router } from 'express';
import ordersController from '../controllers/orders.controller';
import authMiddleware from '../middlewares/auth.middleware';

const ordersRouter = Router();

ordersRouter.get('/', ordersController.list);
ordersRouter.post('/', authMiddleware, ordersController.create);

export default ordersRouter;