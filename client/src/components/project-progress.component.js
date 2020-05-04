import React, { Component, useState } from 'react';
import axios from 'axios';
import { ReactComponent as StarIcon } from '../svg/star-solid.svg';



function ProgressBar (){

    const [complete, setComplete] = useState(false);
    const buttonColor = complete ? "complete" : "incomplete";

    return (
        <button className={buttonColor + " progress-bar"} onClick={() => setComplete(!complete)}>
        </button>
    );
}

export default function  ProjectProgress() {

    return(
        <div>
            <div className="progress-container">
                <div className="progress-gauge">
                    <ProgressBar />
                    <ProgressBar />
                    <ProgressBar />
                    <ProgressBar />
                </div>
                <span className="progress-icon"><StarIcon /></span>
            </div>
            <div>
                <button className="updatebtn" onClick="">Update</button>
            </div>
        </div>
    );
}

// export default class ProjectProgress extends Component {


//     render () {
//         return(
//             <div className="progress-container">
//                 <div className="progress-gauge">
//                     <ProgressBar />
//                     <ProgressBar />
//                     <ProgressBar />
//                     <ProgressBar />
//                 </div>
//                  {/*render divs  */}
            
//             </div>
//         );
//     }
// }

