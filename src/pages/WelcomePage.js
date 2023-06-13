import { useAuth0 } from "@auth0/auth0-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import CustomerService from "../services/customerService";

export default function WelcomePage() {
    let navigate = useNavigate();
    const { user } = useAuth0();
    const initialValues = {
        firstName: user?.given_name,
        lastName: user?.family_name,
        birthday: "",
        email: user?.email,
        privacyPolicyAccepted: false,
    };

    const onSubmit = async (values) => {
        try {
            const { privacyPolicyAccepted, ...welcomeForm } = values;
            await CustomerService.saveCustomer(welcomeForm)
            navigate(0)
        } catch (error) {
            console.log(error);
        }
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        birthday: Yup.date().required("Birthday is required"),
        email: Yup.string().required("Email is required"),
        privacyPolicyAccepted: Yup.boolean().oneOf([true], "Required"),
    });

    return (
        <Container>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="bg-glass">
                        <div className="form-group">
                            <label htmlFor="email" className="text-white">Email</label>
                            <Field type="text" name="email" className="form-control" />
                            <ErrorMessage name="email" component="div" className="text-danger fw-bold display-6" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="firstName" className="text-white">First Name</label>
                            <Field type="text" name="firstName" className="form-control" />
                            <ErrorMessage name="firstName" component="div" className="text-danger fw-bold display-6" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName" className="text-white">Last Name</label>
                            <Field type="text" name="lastName" className="form-control" />
                            <ErrorMessage name="lastName" component="div" className="text-danger fw-bold display-6" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="birthday" className="text-white">Birthday</label>
                            <Field type="date" name="birthday" className="form-control" />
                            <ErrorMessage name="birthday" component="div" className="text-danger fw-bold display-6" />
                        </div>
                        <div className="form-group form-check">
                            <Field
                                type="checkbox"
                                name="privacyPolicyAccepted"
                                className="form-check-input"
                                id="privacyPolicyAccepted"
                            />
                            <label htmlFor="privacyPolicyAccepted" className="form-check-label text-white">
                                I accept the Privacy Policy
                            </label>
                            <ErrorMessage
                                component="div"
                                name="privacyPolicyAccepted"
                                className="text-danger"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}