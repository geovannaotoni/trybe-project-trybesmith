import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import ProductModel from '../../../src/database/models/product.model';
import productMock from '../../mocks/product.mock';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('quando a requisição é bem-sucedida, deve retornar o status 200 e os dados dos produtos', async function () {
    sinon.stub(ProductModel, 'findAll').resolves([
      ProductModel.build(productMock.validProductListFromDB[0]),
      ProductModel.build(productMock.validProductListFromDB[1]),
    ]);

    const httpResponse = await chai.request(app).get('/products');

    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal(productMock.validProductListFromDB);
  });
});
