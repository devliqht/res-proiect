import './../css/StaffView.css'
import './../css/Button3.css'
import { useExperimentsContext } from '../hooks/useExperimentsContext'
import { useLogsContext } from '../hooks/useLogsContext'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'


const StaffView = ({component}) => {

    const { experiments, dispatchExperiments } = useExperimentsContext()
    useEffect(() => {
      const fetchExperiments = async () => {
        const response = await fetch('/api/experiments')
        const json = await response.json()
  
        if (response.ok) {
            console.log("EXPERIMENTS Database Response OK")
            console.log(json)
          dispatchExperiments({type: 'SET_EXPERIMENTS', payload: json})
        } else {
            console.log("EXPERIMENTS Database Response NOT OK")
        }
      }
  
      fetchExperiments()
    }, [dispatchExperiments])

    return (
        <div className="home-staff">
            <div className="staffView">
                <Navbar></Navbar>
                {component}
            </div>
        </div>
        

    )
}

export {
    StaffView
}