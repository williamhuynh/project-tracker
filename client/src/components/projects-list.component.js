import React, { Component, useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import ProjectProgress from "./project-progress.component";
import ProjectModal from "./project-modal.component";
import { ReactComponent as StarRegIcon } from '../svg/star-regular.svg';
import { ReactComponent as EditRegIcon } from '../svg/edit-regular.svg';
import { ReactComponent as ClockRegIcon } from '../svg/clock-regular.svg';


function Project (props) {

    const [showModal, setShowModal] = useState(false);

    return (        
        <div className="project-wrapper">
            <div className="project-profile">
                <div className="project-picture">
                    <span className="project-icon"></span>
                </div>
                <div className="project-title">
                    {props.project.name}
                </div>
            </div>
            <div className="project-progress">
                <ProjectProgress />
                <ProjectEdit />
            </div>
            <div>
                <button className="updatebtn" onClick={()=> setShowModal(!showModal)}>Update</button>
                    <ProjectModal show = {showModal} close={()=> setShowModal(false)} project={props.project}></ ProjectModal>
                <button className="deletebtn" onClick={() => deleteProject(props.project._id)}>Delete</button>
            </div>
            
        </div>
        // <tr>
        //     <td>{props.project.name}</td>
        //     <td>{props.project.description}</td>
        //     <td>{props.project.category}</td>
        //     <td>{props.project.username}</td>
        
        //     <td>
        //         <Link to={"/edit/"+props.project._id}>Edit</Link> | <a href="#" onClick={() => {props.deleteProject(props.project._id) }}>Delete</a>
        //     </td>
        // </tr>
    );
} 

function  deleteProject (id) {
    axios.delete('/projects/'+id)
        .then(res => console.log(res.data));
    // setProjects(projects.filter(el => el._id !== id));
};

function ProjectEdit () {
    return(
        <div className="project-edit-wrappers">
            <span className="add-goal-icon progress-edit-icons"><StarRegIcon /></span>
            <span className="edit-icon progress-edit-icons"><EditRegIcon /></span>
            <span className="reminder-icon progress-edit-icons"><ClockRegIcon /></span>
        </div>
    );
}


function projectList (projects) {
    return projects.map(currentproject => (
         <Project project={currentproject} key={currentproject.id}/>
    ))
};

export default function ProjectsList () {
    
    const [projects, setProjects] = useState([]);
    
    useEffect(() => {
        axios.get('/projects/')
        .then(response => {
            setProjects(response.data);
        });
    });
   
    return (
        <div>
            <span className="project-home">Project Home</span>
            {projectList(projects)}
        </div>
    );
}

// export default class ProjectsList extends Component {

//     constructor(props){
//         super(props);

//         // this.deleteProject = this.deleteProject.bind(this);

//         this.state = {projects: []};
//     }

//     componentDidMount() {
//         axios.get('/projects/')
//             .then(response => {
//                 this.setState({projects: response.data})
//             })
//     }

//     // deleteProject(id) {
//     //     axios.delete('/projects/'+id)
//     //         .then(res => console.log(res.data));
//     //     this.setState({
//     //         projects: this.state.projects.filter(el => el._id !== id)
//     //     })
//     // }

//     projectList(){
//         return this.state.projects.map(currentproject => (
//              <Project project={currentproject} deleteProject={this.deleteProject} key={currentproject.id}/>
//         ))
//     }

//     render () {

//         return (
//             <div>
//                 <span className="project-home">Project Home</span>
                
//                 {this. projectList()}
                
//                 {/* <table className="table">
//                     <thead className="thead-light">
//                         <tr>
//                             <th>Project Name</th>
//                             <th>Description</th>
//                             <th>Category</th>
//                             <th>User</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         { this.projectList() }
//                     </tbody>
//                 </table> */}
//             </div>
//         )

//     }
// }