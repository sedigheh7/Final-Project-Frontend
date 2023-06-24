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
  });
  const customer = useContext(CustomerContext)
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await CustomerService.getCustomersProfile(customer.id);
        console.log(response)
        const { firstName, lastName,birthday,email} = response;
        console.log("peson data",response)
        setFormData({ firstName,
                     lastName,
                      birthday,
                      email,
                      });
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
      <button type="submit">Save</button>
    </form>
  );
};

export default EditProfilePage;
