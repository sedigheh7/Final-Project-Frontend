import { api } from "./httpService";

const getAllProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const createProduct = async (product) => {
  try {
    const response = await api.post('/products', product);
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const updateProduct = async (id, product) => {
  try {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const deleteProductById = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const productService = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
};

export default productService;
