import './../css/StaffView.css'
import './../css/Button3.css'
import './../css/components/Logs.css'
import { useLogsContext } from '../hooks/useLogsContext'
import { useEffect, useState } from 'react'


const Logs = () => {

    const { logs, dispatchLogs } = useLogsContext()
    useEffect(() => {
      const fetchLogs = async () => {
        const response = await fetch('/api/logs')
        const json = await response.json()
  
        if (response.ok) {
            console.log("LOGS Database Response OK")
            console.log(json)
          dispatchLogs({type: 'SET_LOGS', payload: json})
        } else {
            console.log("LOGS Database Response NOT OK")
        }
      }
  
      fetchLogs()
    }, [dispatchLogs])

    return (
        <div className="log">
            {logs && logs.map(log =>(
                <div className="key" key={log._id}>
                    <div className="logDetail">
                    <h2>{log.studentName}</h2>
                    </div>
                    <div className="logDetail">
                        <h3>Student ID: </h3>
                        <p>{log.studentID}</p>
                    </div>
                    <div className="logDetail">      
                        <h3>Student Blocksection: </h3>
                        <p>{log.studentBlocksection}</p>
                    </div>
                    <div className="logDetail">            
                        <h3>Student Group No.: </h3>
                        <p>{log.studentGroup}</p>
                    </div>
                    <div className="logDetail">    
                    <h3>Apparatuses Borrowed: </h3>
                        {log.apparatuses.map(apparatusArr => (
                            <p>{apparatusArr.name}</p>
                        ))}        
                    </div>
                </div>
            ))}

        </div>
    )
}

export {
    Logs
}