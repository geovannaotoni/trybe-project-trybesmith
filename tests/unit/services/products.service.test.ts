import { expect } from 'chai';
import sinon from 'sinon';
import productMock from '../../mocks/product.mock';
import productsService from '../../../src/services/products.service';
import ProductModel from '../../../src/database/models/product.model';

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });

  it('#create: ao receber um produto válido, retorna o produto criado', async function () {
    const parameters = productMock.validProductBody;
    sinon.stub(ProductModel, 'create').resolves(ProductModel.build(productMock.validProductFromDB));

    const serviceResponse = await productsService.create(parameters);

    expect(serviceResponse.status).to.eq('CREATED');
    expect(serviceResponse.data).to.deep.eq(productMock.validProductFromDB);
  });

  it('#list: retorna a lista de produtos registrados no banco', async function () {
    sinon.stub(ProductModel, 'findAll').resolves(productMock.validProductListFromDB.map((product) => ProductModel.build(product)));

    const serviceResponse = await productsService.list();

    expect(serviceResponse.status).to.eq('SUCCESSFUL');
    expect(serviceResponse.data).to.deep.eq(productMock.validProductListFromDB);
  });
});
