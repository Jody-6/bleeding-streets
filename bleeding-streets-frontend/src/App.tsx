import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Login from './components/Login';
import Character from './components/Character';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Characters from './components/Characters';
import Navbar from './components/Navbar';
import RollDice from './components/Roll-Dice';


function App() {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  
  if(!token) {
    return <Login setToken={setToken} setUsername={setUsername}/>
  }

  return (
    <div className="App container mx-auto">
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Characters token={token} username={username} setIsEdit={setIsEdit} />}/>
          <Route path="/character/:characterid" element={<Character token={token} isEdit={isEdit}/>}/>
          <Route path="/character" element={<Character token={token} isEdit={isEdit}/>}/>
          <Route path="/roll-dice" element={<RollDice />}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
