import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Menu from "./components/Menu.jsx";
import RightSide from './components/RightSide.jsx';
import LeftSide from './components/LeftSide.jsx';
import Details from './components/Details';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Adduser from './components/Adduser';

function App() {
  // const user= true;
  return (
    
    <div className="App">
    <BrowserRouter>
    <Menu/>
    
   
    <Routes>
      <Route path='/' element={<LeftSide/>}></Route>
      <Route path='/login' element={<RightSide/>}></Route>
      {/* <Route path='/details' element={user ? <Navigate to="/details"/> : <Navigate to='/'/>}></Route> */}
      <Route path='/details' element={<Details/>}></Route>
      <Route path='/adduser' element={<Adduser/>}></Route>

    </Routes>
    </BrowserRouter>
    
    
    </div>
  );
 
}

export default App;
