import React, { Component, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { DialogActions, Button, IconButton, Input } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CropSquareRoundedIcon from '@material-ui/icons/CropSquareRounded';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';
import DeveloperModeRoundedIcon from '@material-ui/icons/DeveloperModeRounded';
import BrushRoundedIcon from '@material-ui/icons/BrushRounded';
import TheatersRoundedIcon from '@material-ui/icons/TheatersRounded';
import PolymerRoundedIcon from '@material-ui/icons/PolymerRounded';
import Avatar from '@material-ui/core/Avatar';


import { storage } from '../firebase';




function SubmitProject(username, projectName, description, category, progresspercent, imageURL) {
    
    // const fd = new FormData();
    // console.log (fd);
    // console.log(image != null);
    // preventDefault();
    // if (image != null){
    //     fd.append('image', image, image.name)
    //     console.log (fd);
    // }

    const project = {
        username: username,
        name: projectName,
        description: description,
        category: category,
        progresspercent: progresspercent,
        image: imageURL
    }

    console.log(project);

    axios.post('/projects/add', project)
        .then(res => console.log(res.data));

    // props.setDialogOpen(false)
};

function UploadFile(image, ref, setState) {
    //setState parameter is optional. This is a function and can be any setState function, setting the download URL.
    const metadata = {
        contentType: 'image/jpeg'
    };
 
    const uploadTask = storage.ref(ref + '/' + image.name).put(image, metadata);
    uploadTask.on('state_changed', 
        snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                console.log('Upload is paused');
                break;
                case 'running':
                console.log('Upload is running');
                break;
            }
        },
        error => {
            console.log(error);
        },
        () => {
            uploadTask.snapshot.ref.getDownloadURL()
                .then(downloadURL => {
                    console.log('File available at', downloadURL);
                    //Test if parameter for setState has been provided. This is to set the downloadURL state to any state variable
                    if(setState !== undefined){
                        setState(downloadURL);
                    }
              });
        }
    )
}

export default function NewProjectDialog (props) {

    const categories = [
        {value: 'Coding',},
        {value: 'Cooking',},
        {value: 'Exercise',},
        {value: 'Textiles',},
    ];

    const [users, setUsers] = useState([]);

    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [username, setUsername] = useState("");

    const [image, setImage] = useState("");
    const [imageURL, setImageURL] = useState("");

    const fileInput = useRef();


    const [iconPreview, setIconPreview] = useState(true);
    const [option1Preview, setOption1Preview] = useState(false);
    const [option2Preview, setOption2Preview] = useState(false);
    const [option3Preview, setOption3Preview] = useState(false);
    const [uploadPreview, setUploadPreview] = useState(false);

    const hidePreview = () => {
        setIconPreview(false);
        setOption1Preview(false);
        setOption2Preview(false);
        setOption3Preview(false);
        setUploadPreview(false);
    };

    const onUploadHandler = () => {
        UploadFile(image, "images", setImageURL);
    };

    useEffect(()=> {
        axios.get('/users')
        .then(response => {
            console.log(response);
            if (response.data.length > 0) {
                setUsers(response.data.map(user => user.username));
                // setUsers(response.data.username);

            }
        })
    },[])

    useEffect(() => {

        if(image !==""){
            onUploadHandler();
            hidePreview();
            setUploadPreview(true);
        };
    },[image]);

    const onSubmitHandler = () => {

        SubmitProject(username, projectName, description, category, 0, imageURL)
    }


    return(
        <div>
             <Dialog className="newproject-dialogue" onClose={() => props.setDialogOpen(false)} onBackdropClick={() => props.setDialogOpen(false)} aria-labelledby="newproject-dialog" open={props.dialogOpen} maxWidth="md" fullWidth>
                <DialogTitle onClose={() => props.setDialogOpen(false)}>
                    Add a new project
                    <IconButton onClick={()=> props.setDialogOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent className="newproject-content">
                    <div className = "newproject-grid">
                        <div className = "newproject-left">
                            <form>
                                <TextField autoFocus onChange={ event => setProjectName(event.target.value)} id="project-name" label="Project name" varient="outlined" fullWidth autoComplete='off'/>
                                <TextField onChange={ event => setDescription(event.target.value)} id="project-description" label="Description" placeholder="A short description of the project" varient="outlined" multiline rows={4} fullWidth/>
                                <TextField onChange={ event => setCategory(event.target.value)} id="project-category" label="Category" varient="outlined" select fullWidth>
                                    {categories.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField onChange={ event => setUsername(event.target.value)} id="project-user" label="User" varient="outlined" select fullWidth>
                                    {users.map((user) => (
                                            <MenuItem key={user} value={user}>
                                                {user}
                                            </MenuItem>
                                    ))}
                                </TextField>
                            </form>
                        </div>
                        <div className="newproject-right">
                            <div className="newproject-right-content">

                                {iconPreview && <PolymerRoundedIcon className="newproject-picture-icon newproject-picture-default"/>}
                                {option1Preview && <DeveloperModeRoundedIcon className="newproject-option1-icon newproject-picture-icon"/>}
                                {option2Preview && <BrushRoundedIcon className="newproject-option2-icon newproject-picture-icon"/>}
                                {option3Preview && <TheatersRoundedIcon className="newproject-option3-icon newproject-picture-icon"/>}
                                {uploadPreview && <Avatar src={imageURL} className="newproject-picture-icon">Uploading...</Avatar>}

                                <DeveloperModeRoundedIcon onClick = {() => {hidePreview(); setOption1Preview(true)}} className="newproject-option1-icon newproject-option-select newproject-option1-gridarea"/>
                                <BrushRoundedIcon onClick = {() => {hidePreview(); setOption2Preview(true)}} className="newproject-option2-icon newproject-option-select newproject-option2-gridarea"/>
                                <TheatersRoundedIcon onClick = {() => {hidePreview(); setOption3Preview(true)}} className="newproject-option3-icon newproject-option-select newproject-option3-gridarea"/>
                                <input style={{display:'none'}} type="file" ref={fileInput} onChange={ event => setImage(event.target.files[0])} />
                                <Button className="newproject-imageupload-btn newproject-option4-gridarea" onClick = {() => fileInput.current.click()}>Upload Image</Button>
                            </div>

                            {/* <Button onClick = {() => onUploadHandler()}>Upload Image</Button> */}
                            {/* setImageURL(UploadFile(image)) */}
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => onSubmitHandler()}>
                        CREATE
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
