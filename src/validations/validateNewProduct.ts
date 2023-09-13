import { ProductInputtableTypes } from '../database/models/product.model';
import { ServiceResponseError } from '../types/ServiceResponse';

const validateNewProduct = (product: ProductInputtableTypes): ServiceResponseError | undefined => {
  const { name, price, orderId } = product;

  if (!name || !price || !orderId) {
    return { status: 'INVALID_DATA', data: { message: 'Product data is invalid' } };
  }
};

export default validateNewProduct;