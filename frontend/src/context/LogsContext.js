import { createContext, useReducer } from 'react'

export const LogsContext = createContext()

export const logsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOGS':
      return { 
        logs: action.payload 
      }
    case 'CREATE_LOG':
      return { 
        logs: [action.payload, ...state.logs] 
      }
    case 'DELETE_LOG':
      return { 
        logs: state.logs.filter(w => w._id !== action.payload._id) 
      }
    default:
      return state
  }
}

export const LogsContextProvider = ({ children }) => {
  const [state, dispatchLogs] = useReducer(logsReducer, { 
    logs: null
  })
  
  return (
    <LogsContext.Provider value={{ ...state, dispatchLogs }}>
      { children }
    </LogsContext.Provider>
  )
}