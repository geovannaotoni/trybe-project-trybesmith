import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { Order } from '../types/Order';
import { ServiceResponse } from '../types/ServiceResponse';

const list = async (): Promise<ServiceResponse<Order[]>> => {
  const orders = await OrderModel.findAll(
    { include: { model: ProductModel, as: 'productIds', attributes: ['id'] } },
  );

  const orderDataValues = orders.map((order) => order.dataValues);
  const ordersList = orderDataValues
    .map((order) => {
      const productIds = order.productIds?.map((product) => {
        const productIdsList = typeof product === 'object' ? product.id : product;
        return productIdsList;
      });
      return { ...order, productIds };
    });

  return { status: 'SUCCESSFUL', data: ordersList };
};

export default {
  list,
};