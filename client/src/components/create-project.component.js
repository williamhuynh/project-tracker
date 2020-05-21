import React, { Component } from 'react';
import axios from 'axios';

export default class CreateProject extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeProgresspercent = this.onChangeProgresspercent.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            name: '',
            description: '',
            category: '',
            users: [],
            progresspercent: '',
        }
    }

    componentDidMount(){
        axios.get('/users')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    });
                }
            })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeCategory(e) {
        this.setState({
            category: e.target.value
        });
    }

    onChangeProgresspercent(e) {
        this.setState({
            progresspercent: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();

        const project = {
            username: this.state.username,
            name: this.state.name,
            description: this.state.description,
            category: this.state.category,
            progresspercent: this.state.progresspercent
        }

        console.log(project);

        axios.post('/projects/add', project)
            .then(res => console.log(res.data));

        window.location = '/';
    }


    render () {

        return (
            <div>
                <h3>New Project Form</h3>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput" required className="form-control" value={this.state.username} onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function(user) {
                                    return <option key={user} value={user}>{user}</option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Project Name</label>
                        <input type="text" required className="form-control" value={this.state.name} onChange={this.onChangeName} />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" required className="form-control" value={this.state.description} onChange={this.onChangeDescription} />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <input type="text" required className="form-control" value={this.state.category} onChange={this.onChangeCategory} />
                    </div>

                    <div className="form-group">
                        <label>progresspercent</label>
                        <input type="text" required className="form-control" value={this.state.progresspercent} onChange={this.onChangeProgresspercent} />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Add New Project" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )

    }
}