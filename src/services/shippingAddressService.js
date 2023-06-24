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

  const updateCustomersSippingAddressInfo = async (pCustomerId, pAddressId) => {
    try {
      //`/customers/${pCustomerId}/shipping-addresses/${pAddressId}`
      const response = await api.put(`/shippingAddress/customersShippingAddress/${pCustomerId}/${pAddressId}`); // formdata
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