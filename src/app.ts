import express from 'express';
import productsRouter from './routes/products.routes';
import ordersRouter from './routes/orders.routes';

const app = express();

app.use(express.json());
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

export default app;
