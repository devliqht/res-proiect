import './../css/components/Create.css'
import './../css/Button3.css'
import { useExperimentsContext } from '../hooks/useExperimentsContext'
import { useLogsContext } from '../hooks/useLogsContext'
import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const Experiments = ({experiments}) => {

    const { dispatchExperiments } = useExperimentsContext()
    const experimentDelete = async (id) => {
        const response = await fetch('/api/experiments/' + id, {
          method: 'DELETE'
        })
        const json = await response.json()
    
        if (response.ok) {
          dispatchExperiments({type: 'DELETE_EXPERIMENT', payload: json})
        }
    }

    return (
        <div className="experimentList">
        {experiments && experiments.map(experiment => (
                <div className="experiment" key={experiment._id}>
                    <h1 style={{paddingBottom: '10px'}}>Experiment Entry</h1>
                    <h3><span style={{color: 'var(--uscgreen)'}}>Experiment Name: </span>{experiment.experimentName}</h3>
                    <p></p>

                    <h3><span style={{color: 'var(--uscgreen)'}}>Experiment Number:</span> {experiment.experimentNo}</h3>
                    <p></p>

                    <h3><span style={{color: 'var(--uscgreen)'}}>Experiment ID:</span> {experiment._id}</h3>
                    <p></p>

                    <h3><span style={{color: 'var(--uscgreen)'}}>Experiment Apparatuses: </span></h3>
                    <div className='apparatusWrapper'>
                        {experiment.apparatusList.map(apparatusArr => (
                            <p className="apparatusArr">{apparatusArr.apparatus}</p>
                        ))}
                        
                    </div>
                    <button className="material-symbols-outlined" onClick={() => { experimentDelete(experiment._id) }}>Delete</button>
                </div>
        ))}

        </div>
    )
}

export {
    Experiments
}