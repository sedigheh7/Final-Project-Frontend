import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';
import Home from './pages/Home.js';
import Shop from './pages/Shop.js';
import AboutMe from './pages/AboutMe.js';
import ContactUs from './pages/ContactUs.js';
import Cart from './pages/Cart.js';
import Profile from './pages/Profile.js';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import WelcomePage from './pages/WelcomePage.js';
import AddProduct from './components/AddProduct.js';
import Products from './components/Products.js';
import EditProfilePage from './components/EditProfile.js';
import ShippingAddress from './components/ShippingAddress.js';
import EditShippingAddressPage from './components/EditShippingAddress.js';
import CheckoutForm from './components/StripePayment.js'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "shop",
        element:<ProtectedRoute>
          <Shop />
        </ProtectedRoute> 
      },
      {
        path: "about-me",
        element: <AboutMe />
      },
      {
        path: "contact-us",
        element: <ContactUs />
      },
      {
        path: "cart",
        element: <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      },
      {
        path: "profile",
        element: <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      },
      {
        path: "dashboard",
        element:
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
      },
      {
        path: "welcome",
        element:
          <ProtectedRoute>
            <WelcomePage />
          </ProtectedRoute>
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "edit-profile",
        element: <EditProfilePage />
      },
      {
        path: "products",
        element: <Products />
      },
      {
        path: "add-product",
        element: <AddProduct />
      },
      {
        path: "add-shipping-address",
        element: <ShippingAddress />
      },
      {
        path: "Edit-shipping-address",
        element: <EditShippingAddressPage />
      },
      {
        path: "check-out",
        element: <CheckoutForm />
      }
    ],
    errorElement: <h1 className='text-center text-light'>404 not found :( </h1>
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-084e5d2qxzqgp6tm.us.auth0.com"
      clientId="cLJz8OPcKF63QhTHGdwc0xNXBKtVrsVZ"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
    <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>
);