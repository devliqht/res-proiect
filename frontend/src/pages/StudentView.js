import './../css/Home.css'
import './../css/Button3.css'
import SchoolLogo from '../assets/logo.png'
import Html5QrcodePlugin from '../components/QRCodeScanner'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';  
import { useLogsContext } from '../hooks/useLogsContext'

import { jwtDecode } from "jwt-decode";


const clientID = "415073517857-9dqb2modgtnhq3g59n284c4de2c4d2h9.apps.googleusercontent.com";

const StudentView = () => {
    useEffect(() => {
        const fetchLogs = async () => {
          const response = await fetch('/api/logs')
          const json = await response.json()
    
          if (response.ok) {
              console.log("LOGS Database Response OK")
              console.log(json);
          } else {
              console.log("LOGS Database Response NOT OK")
          }
        }
    
        fetchLogs()
      }, []) 

      const [ user, setUser ] = useState({});
      const [ signedIn, setSigned ] = useState(false);
    
      function handleSignOut(event) {
        setUser({});
        document.getElementById("sign-in-button").hidden = false;
        setSigned(false);
      }
    
      function handleCallbackResponse(response) { 
        console.log("Encoded JWT ID Token: " + response.credential);
        var userObject = jwtDecode(response.credential);
        console.log(userObject);
        setUser(userObject);
    
        let email = userObject.email;
        if (email.includes("usc.edu.ph") == true) {
          console.log("usc account");
          document.getElementById("sign-in-button").hidden = true;
          setSigned(true);
        } else {
          console.log("not usc account");
          setSigned(false);
          document.getElementById("error").innerText = "Please use USC Account."
    
        }
      }
      useEffect(() => {
        /*global google*/
        console.log(user);
        google.accounts.id.initialize({
          client_id: "415073517857-9dqb2modgtnhq3g59n284c4de2c4d2h9.apps.googleusercontent.com",
          callback: handleCallbackResponse
        })
    
        google.accounts.id.renderButton(
          document.getElementById("sign-in-button"),
          { theme: "outline", size: "large"}
        );
      }, []);
    return (
        <div className="studentView">
            <div className="studentProfile">

                { signedIn == false && 
                <div className="sign-in">
                    <div className="wrapper">
                        <h1>Welcome to Group 2's Research Project.</h1>
                        <p>Please sign in.</p>
                        <div id="sign-in-button"></div>
                        <p id="error" style={{color: 'var(--uscred)', fontSize: '2em'}}></p>
                    </div>
                </div>
                }
                { signedIn == true && 
                <div className="signed-in">
                    <div className="studentProfileHeader">
                        <h1>Account Details</h1>
                    </div>
                    <div className="studentDetail">
                        <h3>Name:</h3>
                        <p>{user.name}</p>
                    </div>

                    <div className="studentDetail">
                        <h3>Student ID:</h3>
                        <div className="nice-form-group">
                            <input 
                            id="addExperimentName" 
                            type="text" 
                            placeholder="" 
                            required
                            value=""
                            />
                        </div>
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

                }

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
    const [ studentName, setStudentName ] = useState("");
    const [ studentID, setStudentID ] = useState("");
    const [ studentBlocksection, setStudentBlock ] = useState("");
    const [ studentGroup, setStudentGroup ] = useState("");
    const [ logTimeAndDate, setCurrentDate] = useState('');
    useEffect(() => {
      const formatDate = () => {
        const date = new Date();
        const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
        const day = date.getDate();
        const year = date.getFullYear();
        const formattedDate = `${month}-${day}-${year}`;
        setCurrentDate(formattedDate);
      };

      formatDate(); // Call the function once when the component mounts
    }, []); 

    useEffect(() => {
        const fetchLogs = async () => {
          const response = await fetch('/api/logs')
          const json = await response.json()
    
          if (response.ok) {
              console.log("LOGS Database Response OK")
              console.log(json);
          } else {
              console.log("LOGS Database Response NOT OK")
          }
        }
    
        fetchLogs()
      }, []) 

      const [ user, setUser ] = useState({});
      const [ signedIn, setSigned ] = useState(false);
    
      function handleSignOut(event) {
        setUser({});
        document.getElementById("sign-in-button").hidden = false;
        setSigned(false);
      }
    
      function handleCallbackResponse(response) { 
        console.log("Encoded JWT ID Token: " + response.credential);
        var userObject = jwtDecode(response.credential);
        console.log(userObject);
        setUser(userObject);
    
        let email = userObject.email;
        if (email.includes("usc.edu.ph") == true) {
          console.log("usc account");
          document.getElementById("sign-in-button").hidden = true;
          setSigned(true);
          setStudentName(userObject.name);
        } else {
          console.log("not usc account");
          setSigned(false);
          document.getElementById("error").innerText = "Please use USC Account."
    
        }
      }
      useEffect(() => {
        /*global google*/
        console.log(user);
        google.accounts.id.initialize({
          client_id: "415073517857-9dqb2modgtnhq3g59n284c4de2c4d2h9.apps.googleusercontent.com",
          callback: handleCallbackResponse
        })
    
        google.accounts.id.renderButton(
          document.getElementById("sign-in-button"),
          { theme: "outline", size: "large"}
        );
      }, []);
    
    const { logs, dispatchLogs } = useLogsContext()

    //const [apparatuses, setApparatusList] = useState([{}]); //[{ apparatus: "" }]

    let apparatusesNames = experiment.apparatusList;
    let apparatuses = apparatusesNames.map(item => {
        return { apparatus: item.apparatus };
    });

    const [ submitted, setSubmitted ] = useState(false);
    const SaveData = async (event) => { 
        event.preventDefault();
        const logData = { studentName, studentID, studentBlocksection, logTimeAndDate, studentGroup, apparatuses }

        console.log(apparatuses);

        const response = await fetch('/api/logs', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(logData)
        })
        const json = await response.json()
        if (!response.ok) {
            console.log(json.error)
        }
        if (response.ok) {
            dispatchLogs({type: 'CREATE_LOG', payload: json})
            setSubmitted(true);
        }
    }
    
    return (
        <form className="logForm" onSubmit={SaveData}>
              <div className="studentView">
                <div className="studentProfile">

                    { signedIn == false && 
                    <div className="sign-in">
                        <div className="wrapper">
                            <h1>Welcome to Group 2's Research Project.</h1>
                            <p>Please sign in.</p>
                            <div id="sign-in-button"></div>
                            <p id="error" style={{color: 'var(--uscred)', fontSize: '2em'}}></p>
                        </div>
                    </div>
                    }
                    { signedIn == true && 
                    <div className="signed-in">
                        <div className="studentProfileHeader">
                            <h1>Account Details</h1>
                        </div>
                        <div className="studentDetail">
                            <h3><span style={{color: 'var(--uscgreen)'}}>Name:</span> {user.name}</h3>
                        </div>

                        <div className="studentDetail">
                        <h3>Student ID:</h3>
                            <div className="nice-form-group">
                                <input 
                                id="addStudentID" 
                                type="number" 
                                placeholder="" 
                                required
                                onChange={(Event) => setStudentID(Event.target.value)}
                                value={studentID}
                                />
                            </div>
                        </div>

                        <div className="studentDetail">
                            <h3>Blocksection:</h3>
                            <div className="nice-form-group">
                                <input 
                                id="addStudentBlock" 
                                type="text" 
                                placeholder="" 
                                required
                                onChange={(Event) => setStudentBlock(Event.target.value)}
                                value={studentBlocksection}
                                />
                            </div>
                        </div>

                        <div className="studentDetail">
                            <h3>Lab group:</h3>
                            <div className="nice-form-group">
                                <input 
                                id="addStudentGroup" 
                                type="number" 
                                placeholder="" 
                                required
                                onChange={(Event) => setStudentGroup(Event.target.value)}
                                value={studentGroup}
                                />
                            </div>
                        </div>
                        <div className="studentDetail">
                            <h3><span style={{color: 'var(--uscgreen)'}}>Date:</span> {logTimeAndDate}</h3>
                        </div>
                    </div>

                    }

                </div>

            </div>
     
            <div className="experiment">
            <h1>Log Information</h1>
                <div className="experimentInformation">
                    <h3><span style={{color: 'var(--uscgreen)'}}>Experiment Name: </span> {experiment.experimentName}</h3>

                </div>
                <div className="experimentInformation">
                    <h3><span style={{color: 'var(--uscgreen)'}}>Experiment Number:</span> {experiment.experimentNo} </h3>
                </div>
            </div>

            <div className="apparatusInfo">
                <h1>Apparatus List</h1>
                <div className="apparatusList">
                    {experiment.apparatusList.map(apparatusArr => (
                        <div className="apparatus" key={apparatusArr._id}>
                            <h3>{apparatusArr.apparatus}</h3>
                            <p></p>
                        </div>
                    ))}
                </div>
            </div>
            <button id="submit-button" className="button-3" role="button" type="submit" disabled={submitted}>Submit</button>
            { submitted == true && <div className="experiment"><h1><span style={{color: 'var(--uscgreen)'}}>Successfully submitted.</span></h1></div>}
            
        </form>
    )
}
export {
    StudentView,
    MainStudentView,
    StudentViewWithLogForm
}