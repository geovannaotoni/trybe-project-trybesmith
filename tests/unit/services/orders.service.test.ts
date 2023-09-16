import { expect } from 'chai';
import sinon from 'sinon';
import orderMock from '../../mocks/order.mock';
import OrderModel from '../../../src/database/models/order.model';
import ProductModel from '../../../src/database/models/product.model';
import ordersService from '../../../src/services/orders.service';
import UserModel from '../../../src/database/models/user.model';
import userMock from '../../mocks/user.mock';
import productMock from '../../mocks/product.mock';

describe('OrdersService', function () {
  beforeEach(function () { sinon.restore(); });

  it('#create: ao receber um produto válido, retorna o produto criado', async function () {
    const parameters = orderMock.validOrderToCreate;
    sinon.stub(UserModel, 'findOne').resolves(UserModel.build(userMock.existingUser));
    sinon.stub(ProductModel, 'findByPk').resolves(ProductModel.build(productMock.validProductListFromDB[0]));
    sinon.stub(OrderModel, 'create').resolves(ProductModel.build(productMock.validProductFromDB));
    sinon.stub(ProductModel, 'update').resolves([1]);

    const serviceResponse = await ordersService.create(parameters);

    expect(serviceResponse.status).to.eq('CREATED');
    expect(serviceResponse.data).to.deep.eq(orderMock.validOrderToCreate);
  });

  it('#list: retorna a lista de orders registrados no banco', async function () {
    sinon.stub(OrderModel, 'findAll').resolves(
      orderMock.validOrderListFromDB
        .map((order) => OrderModel.build(order, {
          include: [ { model: ProductModel, as: 'productIds', attributes: ['id'] } ]
        })));

    const serviceResponse = await ordersService.list();

    expect(serviceResponse.status).to.eq('SUCCESSFUL');
    expect(serviceResponse.data).to.deep.eq(orderMock.validOrderListResponse);
  });
});
