import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import UserModel from '../database/models/user.model';
import { CreateOrder, Order } from '../types/Order';
import { ServiceResponse, ServiceResponseError } from '../types/ServiceResponse';
import validateNewOrder from '../validations/validateNewOrder';

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

const verifyProductId = async (productIds: number[]): Promise<ServiceResponseError | undefined> => {
  const promises = productIds
    .map((productId) => ProductModel.findByPk(productId));
  const results = await Promise.all(promises);
  const foundProducts = results.every((result) => result);
  if (!foundProducts) {
    return { status: 'NOT_FOUND', data: { message: 'Some product not found' } };
  }
};

const create = async (order: CreateOrder): Promise<ServiceResponse<CreateOrder>> => {
  const error = validateNewOrder(order);
  if (error) return error;

  const { userId, productIds } = order;
  const foundUser = await UserModel.findOne({ where: { id: userId } });
  if (!foundUser) return { status: 'NOT_FOUND', data: { message: '"userId" not found' } };

  const errorFoundProducts = await verifyProductId(productIds);
  if (errorFoundProducts) return errorFoundProducts;
  
  const newOrder = await OrderModel.create({ userId });
  productIds.forEach((productId) => {
    ProductModel.update({ orderId: newOrder.dataValues.id }, { where: { id: productId } });
  });

  return { status: 'CREATED', data: { userId, productIds } };
};

export default {
  list,
  create,
};