import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing, Detail, Home, Form, } from './Views/index';
import { NavBar, NavBarHome } from './Components/NavBar/NavBar';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route exact path='/' element={<Landing />} />

          <Route path='/home' element={
            <React.Fragment>
              <NavBarHome />
              <Home />
            </React.Fragment>} />

          <Route path='/create' element={
            <React.Fragment>
              <NavBar />
              <Form />
            </React.Fragment> } />

          <Route path='/detail:id' element={
            <React.Fragment>
              <NavBar />
              <Detail />
            </React.Fragment> } />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
