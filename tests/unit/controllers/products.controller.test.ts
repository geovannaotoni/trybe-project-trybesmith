import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import productsController from '../../../src/controllers/products.controller';
import productsService from '../../../src/services/products.service';
import { ServiceResponse } from '../../../src/types/ServiceResponse';
import { Product } from '../../../src/types/Product';
import productMock from '../../mocks/product.mock';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('#list: retorna a lista de produtos do banco de dados', async function () {
    const serviceResponse: ServiceResponse<Product[]> = {
      status: 'SUCCESSFUL',
      data: productMock.validProductListFromDB,
    }
    sinon.stub(productsService, 'list').resolves(serviceResponse);

    await productsController.list(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(serviceResponse.data);
  });

  it('#create: ao receber um produto válido, retorna o produto criado', async function () {
    req.body = productMock.validProductBody;
    const serviceResponse: ServiceResponse<Product> = {
      status: 'CREATED',
      data: productMock.validProductFromDB,
    }
    sinon.stub(productsService, 'create').resolves(serviceResponse);

    await productsController.create(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(serviceResponse.data);
  });
});
