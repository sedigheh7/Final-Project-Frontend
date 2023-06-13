import { api } from "./httpService";

const getCustomer = async (email) => {
  try {
    //TODO 
    const response = await api.get(`/customers/profile/email/${email}`);
    return response.data  //user object
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const saveCustomer = async (customer) => {
  try {
    //TODO 
    const response = await api.post(`/customers`, customer);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getCustomers = async () => {
  try {
    const response = await api.get(`/customers`);
    return response.data
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
const getCustomersProfile = async (id) => {
  try {
    const response = await api.get(`/customers/profile/${id}`);
    return response.data
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const updateCustomerInfo = async (pCustomerId, pCustomerObject) => {
  try {
    const response = await api.put(`/customers/${pCustomerId}`,pCustomerObject);
    return response.data
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};


const userService = {
    getCustomer,
    saveCustomer,
    getCustomers,
    getCustomersProfile,
    updateCustomerInfo
};

export default userService;
