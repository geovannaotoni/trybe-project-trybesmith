import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { CreateOrder, Order } from '../../../src/types/Order';
import orderMock from '../../mocks/order.mock';
import { ServiceResponse } from '../../../src/types/ServiceResponse';
import ordersService from '../../../src/services/orders.service';
import ordersController from '../../../src/controllers/orders.controller';

chai.use(sinonChai);

describe('OrdersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('#list: retorna a lista de orders do banco de dados', async function () {
    const serviceResponse: ServiceResponse<Order[]> = {
      status: 'SUCCESSFUL',
      data: orderMock.validOrderListFromDB,
    }
    sinon.stub(ordersService, 'list').resolves(serviceResponse);

    await ordersController.list(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(serviceResponse.data);
  });

  it('#create: ao receber um produto válido, retorna o produto criado', async function () {
    req.body = orderMock.validOrderToCreate;
    const serviceResponse: ServiceResponse<CreateOrder> = {
      status: 'CREATED',
      data: orderMock.validOrderToCreate,
    }
    sinon.stub(ordersService, 'create').resolves(serviceResponse);

    await ordersController.create(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(serviceResponse.data);
  });
});
