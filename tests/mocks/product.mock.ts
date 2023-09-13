import { ProductInputtableTypes } from '../../src/database/models/product.model';
import { Product } from '../../src/types/Product';

const validProductBody: ProductInputtableTypes = {
  "name": "Martelo de Thor",
  "price": "30 peças de ouro",
  "orderId": 4
};

const validProductFromDB: Product = {
  "id": 1,
  "name": "Martelo de Thor",
  "price": "30 peças de ouro",
  "orderId": 4
}

const emptyNameProduct: ProductInputtableTypes = {
  "id": 1,
  "name": "",
  "price": "30 peças de ouro",
  "orderId": 4
}

export default {
  validTransactionBody: validProductBody,
  validTransactionFromDB: validProductFromDB,
  emptyNameTransaction: emptyNameProduct,
};