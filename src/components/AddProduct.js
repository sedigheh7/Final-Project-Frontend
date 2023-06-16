import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./AddProduct.css";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    code: "",
    size: "",
    description: "",
    price: "",
    productImage: "", // New state for the image URL
  });
  const initialValues = {
    code: "",
   size: "",
    description: "",
    price: "",
    productImage: "",
  };

  const validationSchema = Yup.object({
    code: Yup.string().required("Code is required"),
    size: Yup.string().required("Size is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
    productImage: Yup.mixed().required("Image is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    
    try {
      console.log(values);
      const { code, size, description, price, productImage } = values;

      // Create a new FormData object
      const formDataToSave = new FormData();
      formDataToSave.append("code", code);
      formDataToSave.append("size", size);
      formDataToSave.append("description", description);
      formDataToSave.append("price", price);
      formDataToSave.append("productImage", productImage);

      // Upload the image and get the URL
      const response = await fetch("http://localhost:9000/api/v1/products", {
        method: "POST",
        body: formDataToSave,
      });
      // const data = await response.json();
      resetForm();
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
        render={({ values, handleSubmit, setFieldValue }) => {
          return (
            <Form className="form" enctype="multipart/form-data">
              <div className="form-group">
                <label htmlFor="code">Code</label>
                <Field type="text" id="code" name="code" className="input" />
                <ErrorMessage name="code" component="div" className="error-message" />
              </div>
              <div className="form-group">
                <label htmlFor="size">Size</label>
                <Field type="text" id="size" name="size" className="input" />
                <ErrorMessage name="size" component="div" className="error-message" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <Field
                  type="text"
                  id="description"
                  name="description"
                  className="input"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <Field type="number" id="price" name="price" className="input" />
                <ErrorMessage name="price" component="div" className="error-message" />
              </div>
              <div className="form-group">
                <label htmlFor="productImage">Image URL</label>
        
                <input
                  id="productImage"
                  name="productImage"
                  type="file"
                  onChange={(event) => {
                    setFieldValue("productImage", event.currentTarget.files[0]);
                  }}
                />
                <ErrorMessage
                  name="productImage"
                  component="div"
                  className="error-message"
                />
              </div>
              <button type="submit" className="submit-button">
                Add
              </button>
            </Form>
          )}}>
      </Formik>
    </div>
  );
};




export default AddProduct;
