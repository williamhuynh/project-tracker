import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { ReactComponent as StarIcon } from '../svg/star-solid.svg';


function ProgressBar (props){

    const [complete1, setComplete1] = useState(false);
    const [complete2, setComplete2] = useState(false);
    const [complete3, setComplete3] = useState(false);
    const [complete4, setComplete4] = useState(false);

    const buttonColor1 = complete1 ? "complete" : "incomplete";
    const buttonColor2 = complete2 ? "complete" : "incomplete";
    const buttonColor3 = complete3 ? "complete" : "incomplete";
    const buttonColor4 = complete4 ? "complete" : "incomplete";

    useEffect(() => {
        
        switch (true) {
            case (props.percentage <= 0.25):
                setComplete1(true);
                setComplete2(false);
                setComplete3(false);
                setComplete4(false);
                break;
            case (props.percentage <= 0.5):
                setComplete1(true);
                setComplete2(true);
                setComplete3(false);
                setComplete4(false);
                break;
            case (props.percentage <= 0.75):
                setComplete1(true);
                setComplete2(true);
                setComplete3(true);
                setComplete4(false);
                break;
            default:
                setComplete1(true);
                setComplete2(true);
                setComplete3(true);
                setComplete4(true);
        }

        console.log(props.percentage);

    },[props.percentage]);

    return (
        <div className="progress-gauge">
            <button className={buttonColor1 + " progress-bar"} onClick={() => props.setPercentage(0.25) + props.setShowUpdateBtn(true) + props.setClickedUpdateBtn(false)}>
            </button>
            <button className={buttonColor2 + " progress-bar"} onClick={() => props.setPercentage(0.5) + props.setShowUpdateBtn(true) + props.setClickedUpdateBtn(false)}>
            </button>
            <button className={buttonColor3 + " progress-bar"} onClick={() => props.setPercentage(0.75) + props.setShowUpdateBtn(true) + props.setClickedUpdateBtn(false)}>
            </button>
            <button className={buttonColor4 + " progress-bar"} onClick={() => props.setPercentage(1) + props.setShowUpdateBtn(true) + props.setClickedUpdateBtn(false)}>
            </button>    
        </div>
    );
}

function updateProgress (props, percentage){

    const project = {
        username: props.username,
        name: props.name,
        description: props.description,
        category: props.category,
        progresspercent: percentage
    }
    axios.post('/projects/'+props._id, project)
        .then(res => console.log(res.data))
        .then(() => console.log("Milestone Updated"));

}; 

export default function  ProjectProgress(props) {

    const [showUpdateBtn, setShowUpdateBtn] = useState(false);
    const [percentage, setPercentage] = useState(props.project.progresspercent);
    const [clickedUpdateBtn, setClickedUpdateBtn] = useState(false);

    const updateClass = clickedUpdateBtn ? "progess-save-change-btn-clicked" : "progess-save-change-btn-unclicked";
    const updateText = clickedUpdateBtn ? "Saved!" : "Save Change";
    const updateActive = clickedUpdateBtn ? true : false;
 
    return(
        <div>
            <div className="progress-container">
                {/* <div className="progress-gauge"> */}
                    <ProgressBar percentage={percentage} setPercentage = {setPercentage} setShowUpdateBtn = {setShowUpdateBtn} setClickedUpdateBtn = {setClickedUpdateBtn} />
                    {/* <ProgressBar />
                    <ProgressBar />
                    <ProgressBar /> */}
                {/* </div> */}
                <span className="progress-icon"><StarIcon /></span>
                {showUpdateBtn && <button onClick = {() => updateProgress(props.project, percentage) + setClickedUpdateBtn(true)} className={"progess-save-change-btn " + updateClass} disabled={updateActive}> {updateText} </button>}
            </div>

        </div>
    );
}