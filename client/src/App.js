import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { useAuth0 } from "./react-auth0-spa";


import Navbar from "./components/navbar.component";
import ProjectsList from "./components/projects-list.component";
import EditProject from "./components/edit-project.component";
import CreateProject from "./components/create-project.component";
import CreateUser from "./components/create-user.component";

import { StylesProvider } from '@material-ui/core/styles';


function TopBar(){
  return (
    <div className="top-bar">
      <span className="title">Make</span>
    </div>
  );
}


function App() {

  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <StylesProvider injectFirst>
    {/* Your component tree.
        Styled components can override Material-UI's styles. */}
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
    </StylesProvider>

  );
}

export default App;
