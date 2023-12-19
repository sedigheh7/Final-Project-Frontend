import React, {useContext} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CustomerContext } from "../contexts/customerContext";
import ShippingAddressService from "../services/shippingAddressService.js";
import "./ShippingAddress.css"

const ShippingAddressForm = () => {
  const initialValues = {
    lastName: '',
    firstName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  };

  const validationSchema = Yup.object().shape({
    lastName: Yup.string().required('Required'),
    firstName: Yup.string().required('Required'),
    addressLine1: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    postalCode: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
  });
  const customer = useContext(CustomerContext)
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await ShippingAddressService.saveShippingAddress(customer.id, values);
      
      // Reset the form after successful submission
      resetForm();
    } catch (error) {
      console.error(error);
      // Handle error here
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
        <div>
          <label htmlFor="firstName">Name</label>
          <Field type="text" id="firstName" name="firstName" />
          <ErrorMessage name="firstName" component="div" />
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <Field type="text" id="lastName" name="lastName" />
          <ErrorMessage name="lastName" component="div" />
        </div>

        <div>
          <label htmlFor="addressLine1">Address Line 1</label>
          <Field type="text" id="addressLine1" name="addressLine1" />
          <ErrorMessage name="addressLine1" component="div" />
        </div>

        <div>
          <label htmlFor="addressLine2">Address Line 2</label>
          <Field type="text" id="addressLine2" name="addressLine2" />
          <ErrorMessage name="addressLine2" component="div" />
        </div>

        <div>
          <label htmlFor="city">City</label>
          <Field type="text" id="city" name="city" />
          <ErrorMessage name="city" component="div" />
        </div>

        <div>
          <label htmlFor="state">State</label>
          <Field type="text" id="state" name="state" />
          <ErrorMessage name="state" component="div" />
        </div>

        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <Field type="text" id="postalCode" name="postalCode" />
          <ErrorMessage name="postalCode" component="div" />
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <Field type="text" id="country" name="country" />
          <ErrorMessage name="country" component="div" />
        </div>

        <button type="submit">Submit</button>
        <div style={{ height: "100px" }}>

          </div>
      </Form>
    </Formik>
    
  );
};

export default ShippingAddressForm;
