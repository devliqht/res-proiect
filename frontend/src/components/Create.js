import './../css/components/Create.css'
import './../css/Button3.css'
import { useExperimentsContext } from '../hooks/useExperimentsContext'
import { useLogsContext } from '../hooks/useLogsContext'
import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const ExperimentCreate = () => {
    const [apparatusList, setApparatusList] = useState([{ apparatus: "" }]);

    const handleApparatusChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...apparatusList];
      list[index][name] = value;
      setApparatusList(list);
    };

    const handleApparatusRemove = (index) => {
      const list = [...apparatusList];
      list.splice(index, 1);
      setApparatusList(list);
    };

    const handleApparatusAdd = () => {
      setApparatusList([...apparatusList, { apparatus: "" }]);
    };

    const { experiments, dispatchExperiments } = useExperimentsContext()
    const [experimentName, setExperimentName] = useState('');
    const [experimentNo, setExperimentNo] = useState(0);

    const SaveData = async (event) => {
        event.preventDefault();

        console.log(apparatusList);
        const experimentData = { experimentName, experimentNo, apparatusList }

        const response = await fetch('/api/experiments', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(experimentData)
        })
        const json = await response.json()
        if (!response.ok) {
            console.log(json.error)
        }
        if (response.ok) {
            setExperimentName('')
            setExperimentNo('')  
            dispatchExperiments({type: 'CREATE_EXPERIMENT', payload: json})
        }
    }

    return (
        <div className="experimentCreate">
            <h1> Create an experiment: </h1>
            <form className="experiment-form" onSubmit={SaveData}>
                <TextField 
                    id="outlined-basic" 
                    required
                    value={experimentName} 
                    onChange={(Event) => setExperimentName(Event.target.value)}
                    label="Experiment Name" 
                    fullWidth
                    variant="outlined" />

                <TextField 
                    id="outlined-basic" 
                    required
                    value={experimentNo} 
                    onChange={(Event) => setExperimentNo(Event.target.value)}
                    label="Experiment No. #" 
                    type="number"
                    fullWidth
                    variant="outlined" />

                <h3>Add Apparatus: </h3>

                <div className="addApparatus">
                <form className="App" autoComplete="off">
                  <div className="form-field">
                    {apparatusList.map((singleApparatus, index) => (
                      <div key={index} className="apparatuses">
                        <div className="first-division">
                          <input
                            name="apparatus"
                            type="text"
                            id="apparatus"
                            value={singleApparatus.apparatus}
                            onChange={(e) => handleApparatusChange(e, index)}
                            required
                          />
                          {apparatusList.length - 1 === index && apparatusList.length < 15 && (
                            <button
                              type="button"
                              onClick={handleApparatusAdd}
                              className="add-btn"
                            >
                              <span>Add an apparatus</span>
                            </button>
                          )}
                        </div>
                        <div className="second-division">
                          {apparatusList.length !== 1 && (
                            <button
                              type="button"
                              onClick={() => handleApparatusRemove(index)}
                              className="remove-btn"
                            >
                              <span>Remove</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="output">
                    <h2>Output</h2>
                    {apparatusList &&
                      apparatusList.map((singleApparatus, index) => (
                        <ul key={index}>
                          {singleApparatus.apparatus && <li>{singleApparatus.apparatus}</li>}
                        </ul>
                      ))}
                  </div>
                </form>
                </div>

                <button id="submit-button" className="button-3" role="button" type="submit">Submit</button>
            </form>
    </div>
    )
}

export {
    ExperimentCreate
}