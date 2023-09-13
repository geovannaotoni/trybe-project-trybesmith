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

const list = async (): Promise<ServiceResponse<Product[]>> => {
  const products = await ProductModel.findAll();

  return { 
    status: 'SUCCESSFUL', 
    data: products.map((product) => product.dataValues), // ou product.toJSON()
  };
};

export default {
  create,
  list,
};