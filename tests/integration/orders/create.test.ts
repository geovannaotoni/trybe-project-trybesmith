import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../../../src/app';
import orderMock from '../../mocks/order.mock';
import UserModel from '../../../src/database/models/user.model';
import userMock from '../../mocks/user.mock';
import ProductModel from '../../../src/database/models/product.model';
import productMock from '../../mocks/product.mock';
import OrderModel from '../../../src/database/models/order.model';

chai.use(chaiHttp);

describe('POST /orders', function () { 
  beforeEach(function () { sinon.restore(); });

  it('quando a requisição é feita com dados válidos, deve retornar o status 201 e os dados do order criado', async function () {
    sinon.stub(jwt, 'verify').resolves({ username: userMock.existingUser.username });
    sinon.stub(UserModel, 'findOne').resolves(UserModel.build(userMock.existingUser));
    sinon.stub(ProductModel, 'findByPk')
      .onCall(0).resolves(ProductModel.build(productMock.validProductListFromDB[0]))
      .onCall(1).resolves(ProductModel.build(productMock.validProductListFromDB[1]));

    sinon.stub(OrderModel, 'create').resolves(OrderModel.build(orderMock.newOrderFromDB));
    sinon.stub(ProductModel, 'update').resolves([1]);


    const httpResponse = await chai.request(app).post('/orders').send(orderMock.validOrderToCreate).set('Authorization', 'genericToken');

    expect(httpResponse.status).to.be.equal(201);
    expect(httpResponse.body).to.be.deep.equal(orderMock.validOrderToCreate);
  });

  it('quando a requisição é feita com o campo productIds sendo um array vazio, deve retornar o status 422 e uma mensagem de erro', async function () {
    sinon.stub(jwt, 'verify').resolves({ username: userMock.existingUser.username });
    sinon.stub(UserModel, 'findOne').resolves(UserModel.build(userMock.existingUser));

    const httpResponse = await chai.request(app).post('/orders').send(orderMock.orderToCreateEmptyProductsId).set('Authorization', 'genericToken');

    expect(httpResponse.status).to.be.equal(422);
    expect(httpResponse.body).to.be.deep.equal({ message: '"productIds" must include only numbers' });
  });

  it('quando a requisição é feita sem o campo de userId, deve retornar o status 422 e uma mensagem de erro', async function () {
    sinon.stub(jwt, 'verify').resolves({ username: userMock.existingUser.username });
    sinon.stub(UserModel, 'findOne').resolves(UserModel.build(userMock.existingUser));

    const httpResponse = await chai.request(app).post('/orders').send(orderMock.orderToCreateWithoutUserId).set('Authorization', 'genericToken');

    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: '"userId" is required' });
  });

  it('quando a requisição é feita com dados de productIds inválidos, deve retornar o status 404 e uma mensagem de erro', async function () {
    sinon.stub(jwt, 'verify').resolves({ username: userMock.existingUser.username });
    sinon.stub(UserModel, 'findOne').resolves(UserModel.build(userMock.existingUser));
    sinon.stub(ProductModel, 'findByPk').resolves(null);

    const httpResponse = await chai.request(app).post('/orders').send(orderMock.invalidOrderToCreate).set('Authorization', 'genericToken');

    expect(httpResponse.status).to.be.equal(404);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Some product not found' });
  });
});
