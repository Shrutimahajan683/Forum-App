import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Feed from './pages/Feed/Feed.tsx';
import SignIn from './pages/Auth/SignIn.tsx';
import SignUp from './pages/Auth/Signup.tsx';
import './styles/main.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
