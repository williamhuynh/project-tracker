import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">Navbar</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link">Projects</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/create" className="nav-link">Add New Project</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/user" className="nav-link">Create User</Link>
                        </li>
                    </ul>
                 </div>
            </nav>

        )
    }
}