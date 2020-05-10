import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import ProjectProgress from "./project-progress.component";


export default function ProjectModal (props) {

    // const [clickedModal, setClickedModal] = useState(false)

    // const modal = document.getElementsByClassName('modal');
    // window.onclick = function (event) {

    //     if (this.document.getElementById('modal-close-button')) {
    //         if (event.target.className !== 'modal'){
    //             // {props.close}
    //             // setClickedModal(false)
    //             // this.document.getElementById('modal-close-button').click();
    //             console.log(event.target);
    //         };
    //     }
    // };


    if(!props.show) {
        return null
    } else {

        return (   

        <div className="backdrop">
            <div className="modal">
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
                        <ProjectProgress />
                    </div>
                </div>
                <div className="modal-main-grid">
                    <div className="previous-status">
                        <div className="previous-title">Previous update...</div>
                        <textarea disabled className="previous-update">- Created back end server code
- Built an app front end wireframe on Figma (link)
- I had a great idea on focusing the app around projects and keeping it light-weight. Simpler than Trello. All about progress not tracking tasks. This is a motivaotir
- What about Gamify? Every check-in can add points to the project
- Now to focus on building the front-page of this app</textarea>

                    </div>
                    <div className="new-status">
                        <div className="new-status-title">New Update</div>
                        <textarea className="new-status-update" placeholder="Write your new update and press save..."></textarea>
                    </div>
                    <div className="modal-description">
                        <div className="modal-description-title">Description and Notes</div>
                        <textarea className="modal-description-content">
- This is coding project to develop a web-app. Also trying to learn JS/React framework
- Source code is on Git, and is stored locally on the WSL Ubuntu distribution
- This was spawned as part of Coding with Friends SPring 2020 (link)
                        </textarea>
                    </div>

                    <div className="modal-project-images"></div>
                </div>

                <div className="footer">
                    <button id="modal-close-button" onClick={props.close}>
                    Close
                    </button>
                </div>
            </div>
        </div>
        );
    }
};
