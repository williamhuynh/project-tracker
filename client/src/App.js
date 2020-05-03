import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Navbar from "./components/navbar.component";
import ProjectsList from "./components/projects-list.component";
import EditProject from "./components/edit-project.component";
import CreateProject from "./components/create-project.component";
import CreateUser from "./components/create-user.component";

function TopBar(){
  return (
    <div className="top-bar">
      <span className="title">Project Tracker App</span>
    </div>
  );
}


function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <TopBar />
        <div className="main-container">
          <Route path="/" exact component={ProjectsList} />
          <Route path="/edit/:id" component={EditProject} />
          <Route path="/create" component={CreateProject} />
          <Route path="/user" component={CreateUser} />
        </div>
      </div>
    </Router>
  );
}

export default App;
