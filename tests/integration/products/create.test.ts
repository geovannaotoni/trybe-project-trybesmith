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
    sinon.stub(ProductModel, 'create').resolves(ProductModel.build(productMock.validProductFromDB));

    const httpResponse = await chai.request(app).post('/products').send(productMock.validProductBody);

    expect(httpResponse.status).to.be.equal(201);
    expect(httpResponse.body).to.be.deep.equal(productMock.validProductFromDB);
  });

  it('quando a requisição é feita com o campo nome vazio, deve retornar o status 422 e uma mensagem de erro', async function () {
    const httpResponse = await chai.request(app).post('/products').send(productMock.emptyNameProduct);

    expect(httpResponse.status).to.be.equal(422);
    expect(httpResponse.body).to.be.deep.equal({ message: '"name" is not allowed to be empty' });
  });

  it('quando a requisição é feita com faltando o campo nome, deve retornar o status 400 e uma mensagem de erro', async function () {
    const httpResponse = await chai.request(app).post('/products').send(productMock.withoutNameProduct);

    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: '"name" is required' });
  });
});
