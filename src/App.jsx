import './App.css'
import CreateTeam from './components/CreateTeam'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import Teams from './components/Teams';
function App() {

  return (
    <>
    
  <Navbar/>
  <Routes>
    <Route path='/' element={<Homepage/>} ></Route>
    <Route path='/create-team' element={<CreateTeam/>}></Route>    
    <Route path='/teams' element={<Teams/>}></Route>
    </Routes>  
    
    </>
  )
}

export default App
