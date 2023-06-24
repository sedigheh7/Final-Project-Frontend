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
  const handleEditShippingAddress = () => {
    navigate("/Edit-shipping-address")
  }
  if (!userProfile) {
    return null;
  }
  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5  text-md-left">
        <Col md={2}>
          <img
            src={userProfile?.picture}
            alt="Profile"
            className="profile-picture "
          />
        </Col>
        <Col md={6} className="mt-5 text-left profile-details bg-light">
        <h4 >profile:</h4>
          <p className="text-dark p">Name: {userProfile?.firstName}</p>
          <p className="lead text-dark">Email: {userProfile?.email}</p>
          <p className="text-dark">birthday: {userProfile?.birthday}</p>
          </Col>
          <Col md={4}>
          {" "}
          <button
            className="btn btn-primary btn-lg"
            onClick={handleEditProfile}
          >
            Edit profile
          </button>
          </Col>
          <Col md={2}></Col>
          <Col md={6} className=" text-left profile-details bg-light">
          <h4 >Shipping Address:</h4>
          <p> {userProfile?.ShippingAddress?.addressLine1},  
              {userProfile?.ShippingAddress?.city},
              {userProfile?.ShippingAddress?.postalCode} 
              {userProfile?.ShippingAddress?.state}, 
              {userProfile?.ShippingAddress?.country}
          </p>
          </Col>
        <Col md={4}>
        {" "}
          <button
            className="btn btn-primary btn-lg"
            onClick={handleEditShippingAddress}
          >
            Edit Shipping Address
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
