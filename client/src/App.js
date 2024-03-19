import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Admin from './Admin';
import Add from './Add';
import Edit from './Edit';
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path='/' element= {<Admin/>}></Route>
         <Route path='/Add' element= {<Add/>}></Route> 
         <Route path='/edit/:id}' element={<Edit/>}></Route> 

      </Routes>    
    </BrowserRouter>
  );
}

export default App;

 


   