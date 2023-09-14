import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import OrderModel from '../../../src/database/models/order.model';
import orderMock from '../../mocks/order.mock';
import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('GET /orders', function () { 
  beforeEach(function () { sinon.restore(); });
  it('quando a requisição é bem-sucedida, deve retornar o status 200 e os dados dos pedidos', async function () {
    sinon.stub(OrderModel, 'findAll').resolves(
      orderMock.validOrderListFromDB
        .map((order) => OrderModel.build(order, {
          include: [ { model: ProductModel, as: 'productIds', attributes: ['id'] } ]
        })));

    const httpResponse = await chai.request(app).get('/orders');

    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal(orderMock.validOrderListResponse);
  });
});
