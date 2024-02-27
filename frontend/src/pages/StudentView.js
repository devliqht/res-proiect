import './../css/Home.css'
import './../css/Button3.css'
import SchoolLogo from '../assets/logo.png'
import Html5QrcodePlugin from '../components/QRCodeScanner'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';  



const StudentView = () => {
    return (
        <div className="studentView">
            <div className="studentProfile">
                <div className="studentProfileHeader">
                    <img className="schoolLogo" src={SchoolLogo}></img>
                    <h2>Signed in with Google (usc.edu.ph)</h2>
                </div>
                <div className="studentDetail">
                    <h3>Name:</h3>
                    <p>Matt Erron G. Cabarrubias</p>
                </div>

                <div className="studentDetail">
                    <h3>Student ID:</h3>
                    <p>22103604<i class="fa-solid fa-pen-to-square"></i></p>
                </div>

                <div className="studentDetail">
                    <h3>Blocksection:</h3>
                    <p>STEM 12 - ST<i class="fa-solid fa-pen-to-square"></i></p>
                </div>

                <div className="studentDetail">
                    <h3>Lab group:</h3>
                    <p>31<i class="fa-solid fa-pen-to-square"></i> </p>
                </div>
            </div>

        </div>
        
    )
}

const MainStudentView = () => {
    const [ temp, setTemp ] = useState('')
    const navigate = useNavigate();
    const onNewScanResult = (decodedText, decodedResult) => {
        setTemp(temp)
       navigate("/studentView/"+decodedText)
    };
    return (
        <div className="home-student">
          <StudentView />
          <Html5QrcodePlugin
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={(onNewScanResult)}
            />
        </div>
    )
}
const StudentViewWithLogForm = ({experiment}) => {

    const SaveData = async (event) => { 
        event.preventDefault();
    }
    
    return (
        <form className="logForm" onSubmit={SaveData}>
            <h2>Log Information</h2>
            <hr></hr>
            <div className="experiment">
                <div className="experimentInformation">
                    <h3>Experiment Name: </h3>
                    <div className="nice-form-group">
                        <input 
                        id="addExperimentName" 
                        type="text" 
                        placeholder="" 
                        required
                        value={experiment.experimentName} 
                        />
                    </div>
                </div>
                <div className="experimentInformation">
                    <h3>Experiment No: </h3>
                    <div className="nice-form-group">
                        <input 
                        id="addExperimentNo" 
                        type="Number" 
                        placeholder="" 
                        required
                        value={experiment.experimentNo} 
                        />
                    </div>
                </div>
            </div>

            <div className="apparatusInfo">
                <h2>Apparatus List</h2>
                <div className="apparatusList">
                    {experiment.apparatusList.map(apparatusArr => (
                        <div className="apparatus" key={apparatusArr._id}>
                            <h3>{apparatusArr.apparatus}</h3>
                            <p></p>
                        </div>
                    ))}
                </div>
            </div>
            <button id="submit-button" className="button-3" role="button" type="submit">Submit</button>
        </form>
    )
}
export {
    StudentView,
    MainStudentView,
    StudentViewWithLogForm
}