import React,{useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./AddProduct.css";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    description: '',
    price: '',
    image: '',
    imageURL: '', // New state for the image URL
  });
  const initialValues = {
    code: '',
    size: '',
    description: '',
    price: '',
    image: null
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    size: Yup.string().required('Size is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required').positive('Price must be positive'),
    image: Yup.mixed().required('Image is required'),
  });

  const handleSubmit = async (values) => {
    try {
      console.log(values);
      const { name, size, description, price, image } = values;
  
      // Create a new FormData object
      const formData = new FormData();
      formData.append('name', name);
      formData.append('size', size);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('productImage', image);
  
      // Upload the image and get the URL
      const response = await fetch('/api/v1/products', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
  
      // Set the imageURL in the form data state
      setFormData((prevState) => ({
        ...prevState,
        imageURL: data.image, // Assuming the image URL is returned in the response as 'image'
      }));
  
      // Clear input fields or show success message
      // ...
  
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="container-add-product">
      <h2>Add Product</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="form" enctype="multipart/form-data">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" className="input" />
            <ErrorMessage name="name" component="div" className="error-message" />
          </div>
          <div className="form-group">
            <label htmlFor="size">Size</label>
            <Field type="text" id="size" name="size" className="input" />
            <ErrorMessage name="size" component="div" className="error-message" />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <Field type="text" id="description" name="description" className="input" />
            <ErrorMessage name="description" component="div" className="error-message" />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <Field type="number" id="price" name="price" className="input" />
            <ErrorMessage name="price" component="div" className="error-message" />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <Field type="file" id="image" name="image" className="input" />
            <ErrorMessage name="image" component="div" className="error-message" />
          </div>
          <button type="submit" className="submit-button">Add</button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddProduct;
