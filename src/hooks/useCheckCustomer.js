import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import userService from '../services/customerService';
import { useNavigate } from 'react-router-dom';

const useCheckCustomer = () => {
  const { user, isAuthenticated } = useAuth0();
  let navigate = useNavigate();
  const [currentCustomer, setCurrentCustomer] = useState(user);
  const checkCustomer = async () => {
    if (isAuthenticated) {
      const remoteCustomer = await userService.getCustomer(user.email);
      if (remoteCustomer) {
        setCurrentCustomer({
          ...user,
          role:remoteCustomer.role,
          id:remoteCustomer.id
        })
        navigate('/dashboard');
      } else {
        navigate('/welcome');
      }
    }
  };

  useEffect(() => {
    checkCustomer();
  }, [isAuthenticated]);

  // // Return any necessary values as an array or an object
  return currentCustomer;
};

export default useCheckCustomer;
// get customer profile includ shipping adress
//userService.getCustomersProfile
