
import * as React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css';

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Welcome to React Router!</h1>
        <nav>
          <Link to="/">Home</Link> | &nbsp;
          <Link to="/LandingPage">LandingPage</Link> | &nbsp; 
          <Link to="/LoginPage">LoginPage</Link> | &nbsp; 
          <Link to="/RegisterPage">RegisterPage</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="LandingPage" element={<LandingPage />} />
          <Route path="LoginPage" element={<LoginPage />} />
          <Route path="RegisterPage" element={<RegisterPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      
    </>
  );
}


export default App;
