import { api } from "./httpService";

const saveShippingAddress = async (pCustomerId, shippingAddress) => {
    try {
      //TODO 
      const response = await api.post(`/customers/customersShippingAddress/${pCustomerId}`, shippingAddress);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateCustomersSippingAddressInfo = async (pCustomerId, shippingAddressData) => {
    try {
      //`/customers/${pCustomerId}/shipping-addresses/${pAddressId}`
      const response = await api.put(`/customers/customersShippingAddress/${pCustomerId}`, shippingAddressData); // formdata
      return response.data
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };
  
  const ShippingAddressService = {
    saveShippingAddress,
    updateCustomersSippingAddressInfo
  }
  export default ShippingAddressService