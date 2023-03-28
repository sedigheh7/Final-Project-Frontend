import { Outlet } from 'react-router-dom';
import NavigationBar from './NavigationBar';

function App() {
  return (
    <div className="App">
      <NavigationBar/>
      <Outlet/>
    </div>
  );
}
export default App;
