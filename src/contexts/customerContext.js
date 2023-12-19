import { useAuth0 } from "@auth0/auth0-react";
import { createContext } from "react";
import { initializeHttpService } from "../services/httpService";
import useCheckCustomer from "../hooks/useCheckCustomer";
import { BsCheckLg } from "react-icons/bs";

export const CustomerContext = createContext();

export const CustomerContextProvider = ({children}) => {
    const { getAccessTokenSilently } = useAuth0();
    initializeHttpService(getAccessTokenSilently, "http://localhost:9000/api/v1/");
    let customer = useCheckCustomer();

    return (
        <CustomerContext.Provider value={customer}>
            {children}
        </CustomerContext.Provider>
    )
}