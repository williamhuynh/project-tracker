import React, { Component, useState, useEffect } from 'react';
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
            <a href={"/edit/" + props.id} className="icon-button">
                {props.icon}
            </a>
        </li>
    );
}

export default function Navbar () {


    // componentDidMount() {
    //     axios.get('/projects/')
    //         .then(response => {
    //             this.setState({projects: response.data})
    //         })
    // }
    

    const [projects, setProjects] = useState([]);
    
    useEffect(() => {
        axios.get('/projects/')
        .then(response => {
            setProjects(response.data);
        });
    });

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
                <NavItem link="create" icon={<PlusIcon />}></NavItem>
                <NavItem link="#" icon={<UserIcon />}>
                    <DropDownMenu />
                </NavItem>
            </ul>
        </nav>

    )

}