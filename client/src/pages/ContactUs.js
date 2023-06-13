import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const ContactUs = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().max(15, "Must be 15 character or less").required("Please enter your name"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    phone: Yup.string().required("Please enter your phone number"),
    message: Yup.string().required("Please enter your message"),
  });

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  const handleSubmit = async(values, { resetForm }) => {
    try {
      const response = await fetch('http://localhost:9000/api/v1/customers/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
  
      // const data = await response.json();
      // console.log(data);
      resetForm();
    } catch (error) {
      console.error(error);
    }
  
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col xs={3}></Col>
        <Col>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "30%",
                      }}
                    >
                      <Field
                        name="name"
                        placeholder="Your Name"
                        className="form first-row-form"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "30%",
                      }}
                    >
                      <Field
                        name="email"
                        placeholder="Your Email"
                        className="form first-row-form"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "30%",
                      }}
                    >
                      <Field
                        name="phone"
                        placeholder="Your Phone"
                        className="form first-row-form"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <Field
                      name="message"
                      as="textarea"
                      placeholder="Write Your Message Here"
                      rows="10"
                      style={{ marginTop: "1rem" }}
                      className="form"
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>

                  <button type="submit" className="btn-send-email">
                    Send Email
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
        <Col xs={3}></Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
