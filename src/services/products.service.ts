import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';
import validateNewProduct from '../validations/validateNewProduct';

const create = async (product: ProductInputtableTypes): Promise<ServiceResponse<Product>> => {
  const error = validateNewProduct(product);
  if (error) return error;
  
  const newProduct = await ProductModel.create(product);
  return { status: 'CREATED', data: newProduct.dataValues };
};

export default {
  create,
};