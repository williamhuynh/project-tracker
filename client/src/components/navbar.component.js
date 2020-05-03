import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as UserIcon } from '../svg/user-solid.svg';
import { ReactComponent as PlusIcon } from '../svg/plus-solid.svg';
import { ReactComponent as HomeIcon } from '../svg/home-solid.svg';
import axios from 'axios';



function NavItem(props) {

    const [open, setOpen] = useState(false);

    return (
        <li className="nav-item">
            <a href={props.link} className="icon-button" onClick={() => setOpen(!open)}>
                {props.icon}
            </a>

            {open && props.children}
        </li>
    );
}


function DropDownMenu() {

    function DropDownItem(props){
        return (
            <a href="#" className="menu-item">
                <span className="icon-button">{props.icon}</span>
                {props.children}
            </a>
        );
    }

    return (
        <div className="dropdown">
            <DropDownItem>My Profile</DropDownItem>
            <DropDownItem>Settings</DropDownItem>
            <DropDownItem>Logout</DropDownItem>
        </div>
    );
}

function ProjectList(props){
    return (
        <li className="nav-item">
            <a href={props.id} className="icon-button">
                {props.icon}
            </a>
        </li>
    );
}

export default class Navbar extends Component {

    constructor(props){
        super(props);

        this.state = {projects: []};
    }

    componentDidMount() {
        axios.get('/projects/')
            .then(response => {
                this.setState({projects: response.data})
            })
    }
    

    ProjectItem(){
        return this.state.projects.map(p => (
            <ProjectList id={p._id} icon={p.name} />
        ))
    
    }
    

    render() {
        return (
            <nav className="navbar">
                <ul className="navbar-nav">
                    <NavItem link="/" icon={<HomeIcon />}></NavItem>
                    { this.ProjectItem() }   
                    {/* <li className="nav-item active">
                        <Link to="/" className="nav-link">Projects</Link>
                    </li> */}
                    <NavItem link="create" icon={<PlusIcon />}></NavItem>
                    {/* <NavItem link="user" icon="New User"></NavItem> */}
                    <NavItem link="#" icon={<UserIcon />}>
                        <DropDownMenu />
                    </NavItem>

                    {/* <li className="nav-item active">
                        <Link to="/create" className="nav-link">Add New Project</Link>
                    </li>
                    
                    <li className="nav-item active">
                        <Link to="/user" className="nav-link">Create User</Link>
                    </li> */}
                </ul>
            </nav>

        )
    }
}