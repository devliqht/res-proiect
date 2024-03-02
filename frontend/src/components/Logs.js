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

    const logsDelete = async (id) => {
        const response = await fetch('/api/logs/' + id, {
          method: 'DELETE'
        })
        const json = await response.json()
    
        if (response.ok) {
          dispatchLogs({type: 'DELETE_LOG', payload: json})
        }
    }
    return (
        <div className="log">
            {logs && logs.map(log =>(
                <div className="key" key={log._id}>
                    <div className="logDetail">
                    
                    </div>
                    <div className="logDetail">
                    <h1>{log.studentName}</h1>
                    <p>Entry {log._id}</p>
                    </div>
                    <div className="logDetail">
                        <h3><span style={{color: 'var(--uscgreen)'}}>Student ID:</span> {log.studentID}</h3>
                    </div>
                    <div className="logDetail">      
                        <h3><span style={{color: 'var(--uscgreen)'}}>Student Blocksection:</span> {log.studentBlocksection}</h3>
                    </div>
                    <div className="logDetail">            
                        <h3><span style={{color: 'var(--uscgreen)'}}>Student Group No.:</span> #{log.studentGroup}</h3>
                    </div>
                    <div className="logDetail">            
                        <h3><span style={{color: 'var(--uscgreen)'}}>Log Date:</span> {log.logTimeAndDate}</h3>
                    </div>
                    <div className="logDetail">    
                    <h3><span style={{color: 'var(--uscgreen)'}}>Apparatuses Borrowed: </span> </h3>
                    <div className="apparatusList">
                        {log.apparatuses.map(apparatusArr => (
                                <div className="apparatus" key={apparatusArr._id}>
                                    <h2>{apparatusArr.apparatus}</h2>
                                </div>
                            ))}  
                    </div>
        
                    </div>
                    <button className="material-symbols-outlined" onClick={() => { logsDelete(log._id) }}>Delete</button>
                </div>
            ))}

        </div>
    )
}

export {
    Logs
}