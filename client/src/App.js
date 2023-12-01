
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import SecureUpload from './components/SecureUpload';
import DisplayUpload from './components/DisplayUpload';
import DisplayVideo from './components/DisplayVideo';


function App() {
  return (
    <div className="App">

      <nav>
         <Link to="secure-upload"><h1>Click Here For Upload Image & Videos & Other Details </h1></Link>
      </nav>
      <br />
      <br />
      <Routes>
        <Route />
        <Route path="secure-upload" element={<SecureUpload />} />
        <Route path="display-upload" element={<DisplayUpload />} />
        <Route path="/video/:id" element={<DisplayVideo />} />
      </Routes>
    </div>
  );
}

export default App;
