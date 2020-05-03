import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


const Project = props => (
    <tr>
        <td>{props.project.name}</td>
        <td>{props.project.description}</td>
        <td>{props.project.category}</td>
        <td>{props.project.username}</td>

        <td>
            <Link to={"/edit/"+props.project._id}>Edit</Link> | <a href="#" onClick={() => {props.deleteProject(props.project._id) }}>Delete</a>
        </td>
    </tr>
)


export default class ProjectsList extends Component {

    constructor(props){
        super(props);

        this.deleteProject = this.deleteProject.bind(this);

        this.state = {projects: []};
    }

    componentDidMount() {
        axios.get('/projects/')
            .then(response => {
                this.setState({projects: response.data})
            })
    }

    deleteProject(id) {
        axios.delete('/projects/'+id)
            .then(res => console.log(res.data));
        this.setState({
            projects: this.state.projects.filter(el => el._id !== id)
        })
    }

    projectList(){
        return this.state.projects.map(currentproject => {
            return <Project project={currentproject} deleteProject={this.deleteProject} key={currentproject.id}/>
        })
    }

    render () {

        return (
            <div>
                <h3>All Projects</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Project Name</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>User</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.projectList() }
                    </tbody>
                </table>
            </div>
        )

    }
}