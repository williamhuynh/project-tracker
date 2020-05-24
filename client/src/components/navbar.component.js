import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as UserIcon } from '../svg/user-solid.svg';
import { ReactComponent as PlusIcon } from '../svg/plus-solid.svg';
import { ReactComponent as HomeIcon } from '../svg/home-solid.svg';
import axios from 'axios';
import {useAuth0} from "../react-auth0-spa";
import NewProjectDialog from "./new-project-dialog.component";


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
            <a href={"/edit/" + props.id} className="icon-button">
                {props.icon}
            </a>
        </li>
    );
}

export default function Navbar () {


    //states for authentication
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    const [projects, setProjects] = useState([]);
    //
    //Initiate states for the new project dialog box
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDialogClickOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };
    //
    
    useEffect(() => {
        axios.get('/projects/')
        .then(response => {
            setProjects(response.data);
        });
    },[]);

    function ProjectItem(){
        return projects.map(p => (
            <ProjectList key={p.id} id={p._id} icon={p.name} />
        ))
    
    }
    
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <NavItem link="/" icon={<HomeIcon />}></NavItem>
                { ProjectItem() }   
                {/* <NavItem link="create" icon={<PlusIcon />}></NavItem> */}

                <li className="nav-item">
                    <button id="project-modal" className="icon-button" onClick ={handleDialogClickOpen}>
                        <PlusIcon />
                    </button>
                    <NewProjectDialog dialogOpen={dialogOpen} setDialogOpen = {setDialogOpen} />
                </li>

                {!isAuthenticated && (
                    
                    <li className="nav-item">
                    <button href="#" className="icon-button" onClick={() => loginWithRedirect({})}>
                        Log in
                    </button>
                    </li>
                    // <NavItem link="#" icon={<UserIcon />}></NavItem>
                )}

                {isAuthenticated && (
                    <NavItem link="#" icon={<UserIcon />}>
                        <DropDownMenu />
                    </NavItem>
                )}
            </ul>
        </nav>

    )

}