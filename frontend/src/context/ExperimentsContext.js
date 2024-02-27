import { createContext, useReducer } from 'react'

export const ExperimentsContext = createContext()

export const experimentsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EXPERIMENTS':
      return { 
        experiments: action.payload 
      }
    case 'CREATE_EXPERIMENT':
      return { 
        experiments: [action.payload, ...state.experiments] 
      }
    case 'DELETE_EXPERIMENT':
      return { 
        experiments: state.experiments.filter(w => w._id !== action.payload._id) 
      }
    default:
      return state
  }
}

export const ExperimentsContextProvider = ({ children }) => {
  const [state, dispatchExperiments] = useReducer(experimentsReducer, { 
    experiments: null
  })
  
  return (
    <ExperimentsContext.Provider value={{ ...state, dispatchExperiments }}>
      { children }
    </ExperimentsContext.Provider>
  )
}