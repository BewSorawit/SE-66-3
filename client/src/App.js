// client/src/App.js
import React from 'react';
import Index from './components/index';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SendToManager from './SendToManager';
import FCviews from './FCviews';
import AfterSend from './AfterSend';

function App() {
  return (
    <div className="App">
      {/* <Index /> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FCviews />}></Route>
          <Route path="/send/:branchID" element={<SendToManager />}></Route>
          <Route path='/AfterSend' element={<AfterSend />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
