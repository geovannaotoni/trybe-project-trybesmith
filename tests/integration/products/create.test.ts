import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import ProductModel from '../../../src/database/models/product.model';
import productMock from '../../mocks/product.mock';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('quando a requisição é feita com dados válidos, deve retornar o status 201 e os dados do produto criado', async function () {
    sinon.stub(ProductModel, 'create').resolves(ProductModel.build(productMock.validTransactionFromDB));

    const httpResponse = await chai.request(app).post('/products').send(productMock.validTransactionBody);

    expect(httpResponse.status).to.be.equal(201);
    expect(httpResponse.body).to.be.deep.equal(productMock.validTransactionFromDB);
  });

  it('quando a requisição é feita com dados inválidos, deve retornar o status 400 e uma mensagem de erro', async function () {
    const httpResponse = await chai.request(app).post('/products').send(productMock.emptyNameTransaction);

    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Product data is invalid'});
  });
});
