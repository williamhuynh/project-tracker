import React, { Component, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ProjectProgress from "./project-progress.component";
import { ReactComponent as TimesIcon } from '../svg/times-solid.svg';


function addUpdate(projectid, updatetext) {
 
    const updatejson = {
        projectid: projectid,
        update: updatetext,
    }
    axios.post('/updates/new', updatejson)
    .then(res => console.log(res.data));
};


export default function ProjectModal (props) {

    //setting state to capture the text in the update box
    const [update, setUpdate] = useState("");
    const [lastUpdate, setLastUpdate] = useState("");
    const [description, setDescription] = useState("");

    const [clickedDescription, setClickedDescription] = useState(false);
    const descriptionRef = useRef();

    //setup states for checking if we have clicked the new update box
    const [newUpdate, setNewUpdate] = useState(false);
    const newUpdateText = useRef();
    const modalRef = useRef();

    useEffect(() => {
        //add when mounted
        if(props.show) {
            document.addEventListener("mousedown", handleClickNewUpdate);
            document.addEventListener("mousedown", handleClickModal);

       
            
        } else {
            document.removeEventListener("mousedown", handleClickNewUpdate);
            document.removeEventListener("mousedown", handleClickModal);

        }

        //return function to be called with unmounted
        return () => {
            document.removeEventListener("mousedown", handleClickNewUpdate);
            document.removeEventListener("mousedown", handleClickModal);
        };
    });

    useEffect(() => {
        if(props.show) {
            axios.get('/updates/last/'+props.project._id)
            .then (res => setLastUpdate(res.data[0].update))
            .catch(err => console.log(err));
        }

    },[lastUpdate, update, props.show]);

    const handleClickNewUpdate = e => {
        if(newUpdateText.current.contains(e.target)) {
        //     //inside click
            return;
        };
        //outside click
        setNewUpdate(false);
    };

    const handleClickModal = e => {
        if(modalRef.current.contains(e.target)) {
        //     //inside click
            return;
        };
        //outside click
        props.close();
    };
    
    if(!props.show) {
        return null
    } else {

        return (   

        <div className="backdrop">
            <div className="modal" ref={modalRef}>
                <div className="modal-nav">
                    <button className="modal-close-button" onClick={props.close}>
                        <TimesIcon />
                    </button>
                </div>
                <div className="modal-header">
                    <div className="modal-project-picture">
                        <span className="modal-project-icon"></span>
                    </div>
                    <div className="modal-bar-right">   
                        <div className="modal-title">
                            {props.project.name}
                        </div>
                        <div className="modal-subtitle">
                            {props.project.category}
                        </div>
                        <ProjectProgress project={props.project} />
                    </div>
                </div>
                <div className="modal-main-grid">
                    <div className="previous-status">
                        <div className="previous-title">Previous update...</div>
                        <textarea disabled className="previous-update" value={lastUpdate}>
                        
                        </textarea>
                        <button className="previous-status-seeallbtn">See all updates (TBD)</button>
                    </div>
                    <div ref={newUpdateText} className="new-status">
                        <div className="new-status-title">New Update</div>
                        <textarea id="updatetextarea" onClick={() => setNewUpdate(true)} onChange={e => setUpdate(e.target.value)} className="new-status-update" placeholder="Write your new update and press save...">
                        </textarea>
                        {newUpdate && <button className="new-status-savebtn" onClick={() => {addUpdate(props.project._id,update); setUpdate(""); document.getElementById('updatetextarea').value="";}}>Update</button>}
                    </div>
                    <div className="modal-description">
                        <div className="modal-description-title">Description and Notes</div>
                        <textarea className="modal-description-content" value={props.project.description}>
                            

                        </textarea>
                        <button className="modal-description-savebtn">Save</button>
                    </div>

                    <div className="modal-project-images"></div>
                </div>
            </div>
        </div>
        );
    }
};
