import React, { useEffect, useState,useContext } from 'react';
import CustomerService from "../services/customerService";
import './EditProfile.css';
import { CustomerContext } from "../contexts/customerContext";

const EditProfilePage = () => {
  const [formData, setFormData] = useState({
    // Initialize the form fields with user data
    firstName: '',
    lastName: '',
    birthday:'',
    email:'',
    addressLine1:'',
    city:'',
    postalCode:'',
    state:'',
    country:'',
    // Add other form fields
  });
  const customer = useContext(CustomerContext)
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await CustomerService.getCustomersProfile(customer.id); // Adjust the API endpoint as per your server configuration
        console.log(response)
        const { firstName, lastName,birthday,email,ShippingAddress:{addressLine1,city,postalCode,state,country} /* other fields */ } = response;
        console.log("peson data",response)
        setFormData({ firstName,
                     lastName,
                      birthday,
                      email,
                      addressLine1,
                      city,
                      postalCode,
                      state,
                      country
                      /* other fields */ });
      } catch (error) {
        console.error('Error retrieving user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await CustomerService.updateCustomerInfo(customer.id, formData); // Adjust the API endpoint as per your server configuration
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='editprofile-form'>
        <h1>Edit Profile:</h1>
      <label>
        First Name:
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
      </label>
      <label>
        Last Name:
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
      </label>
      <label>
      Birthday:
        <input type="text" name="birthday" value={formData.birthday} onChange={handleChange} />
      </label>
      <label>
      email:
        <input type="text" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <h1>Shipping Address:</h1>
      <label>
      addressLine1:
        <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} />
      </label> <label>
      city:
        <input type="text" name="city" value={formData.city} onChange={handleChange} />
      </label> <label>
      postalCode:
        <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} />
      </label> <label>
      state:
        <input type="text" name="state" value={formData.state} onChange={handleChange} />
      </label> <label>
      country:
        <input type="text" name="country" value={formData.country} onChange={handleChange} />
      </label>
      {/* Add other form fields */}
      <button type="submit">Save</button>
    </form>
  );
};

export default EditProfilePage;
