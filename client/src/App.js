// client/src/App.js
import React from 'react';

import {BrowserRouter,Routes,Route, Router} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
// import Index from './components/index';

// import Layout from './components/';
// import Index from './components/';

// const WithNavbar = () => 
// <Layout>
//       <switch>  
//         <Routes>
//           {/* <Route path='/signup' element= {<Signup/>}></Route> */}
//           <Route path='/home' element= { <Home/>  }></Route>
//           <Route path='/Index' element= { <Index/>  }></Route>
//         </Routes>
//       </switch>
// </Layout>;

function App() {
  return ( 
    // <Provider store={store}>    
    <BrowserRouter className="App"> 
          <switch>  
              <Routes>
                <Route path='/' element={<Login/>} />
                <Route path='/home' element= { <Home/>  }></Route>
                {/* <Route  component={WithNavbar} /> */}
              </Routes>
          </switch> 
    </BrowserRouter>
    // </Provider>
  );
}

export default App;




      // <Routes>
      //   <Route path='/' element= {<Login/>} />
      //   <Route path='/signup' element= {<Signup/>}></Route>
      //   <Route path='/home' element= { <Home/>  }></Route>
      //   <Route component={WithNavbar}></Route> 
      // </Routes>
