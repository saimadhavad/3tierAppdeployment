// import logo from './logo.svg';
import './App.css';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Tasks from './components/Tasks';
import Leaves from './components/Leaves';
import EditProfile from './components/EditProfile';
import {BrowserRouter, Route, Routes} from 'react-router-dom';


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signin/>}></Route>        
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path="/tasks" element={<Tasks/>}></Route>
        <Route path="/leaves" element={<Leaves/>}></Route>
        <Route path="/editProfile" element={<EditProfile/>}></Route>
      </Routes>
    </BrowserRouter>

    // <div className="App">
    //   <Signup/>
    // </div>
  );
}

export default App;
