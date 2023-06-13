import React, { useContext,useEffect, useState, } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CustomerContext } from "../contexts/customerContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Profile.css";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
export const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const customer = useContext(CustomerContext)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/v1/customers/profile/${customer.id}`
        ); // Adjust the API endpoint as per your server configuration
        setUserProfile(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error retrieving user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };
  if (!userProfile) {
    return null;
  }
  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5  text-md-left">
        <Col md={2}>
          <img
            src={userProfile.picture}
            alt="Profile"
            className="profile-picture "
          />
        </Col>
        <Col md className="mt-5 text-left profile-details bg-light">
          <p className="text-dark p">Name: {userProfile.firstName}</p>
          <p className="lead text-dark">Email: {userProfile.email}</p>
          <p className="text-dark">birthday: {userProfile.birthday}</p>
          <p className="text-light p">{userProfile.role}</p>
          <p className="mt-5">Shipping Address:</p>
          <p> {userProfile.ShippingAddress.addressLine1},  
              {userProfile.ShippingAddress.city},
              {userProfile.ShippingAddress.postalCode} 
              {userProfile.ShippingAddress.state}, 
              {userProfile.ShippingAddress.country}
          </p>
          
        </Col>
        <Col>
          {" "}
          <button
            className="btn btn-primary btn-lg"
            onClick={handleEditProfile}
          >
            Edit
          </button>
        </Col>
      </Row>
      <Row></Row>
    </Container>
  );
};

export default Profile;



   {/* const handleEditProfile = () => { */}


{
  /* <h2>Shipping Address</h2>
      <p>Address Line 1: {userProfile.ShippingAddress.addressLine1}</p>
      <p>City: {userProfile.ShippingAddress.city}</p>
      Display other shipping address fields */
}

{
  /* <h2>Payment Method</h2>
      <p>Card Holder Name: {userProfile.PaymentMethod.cardHolderName}</p>
      <p>Card Number: {userProfile.PaymentMethod.cardNumber}</p> */
}
{
  /* Display other payment method fields */
}
//       <button onClick={handleEditProfile}>Edit</button>
//     </div>
//   );
// };

// export default ProfilePage;
