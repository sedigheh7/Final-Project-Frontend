import { Outlet } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from "./components/Footer";
import { CustomerContextProvider} from './contexts/customerContext.js'
import {CartContextProvider} from './contexts/cartContext.js'
function App() {
  
  return (
    <div className="App">
      <CustomerContextProvider>
      <CartContextProvider>
      <NavigationBar />
      <Outlet/>
      <div style={{height:"100px"}}>

      </div>
      <Footer />
      </CartContextProvider>
      </CustomerContextProvider>
    </div>
  );
}
export default App;
