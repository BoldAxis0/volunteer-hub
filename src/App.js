import React from "react";
import { Routes, Route } from 'react-router-dom';
import TopNavBar from "./TopNavBar";
import Userpage from "./Userpage"; // Import the 'userPage' component
import Homepage from "./Homepage"; // Import the 'Homepage' component
import Adminpage from "./Adminpage"; // Import the 'Adminpage' component

function App() {

  return (
    <div>
      <TopNavBar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/user" element={<Userpage />} />
        <Route path="/admin" element={<Adminpage />} />
      </Routes>

    </div>
  );
}


export default App;
