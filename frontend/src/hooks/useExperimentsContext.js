import { ExperimentsContext } from "../context/ExperimentsContext"
import { useContext } from "react"

export const useExperimentsContext = () => {
  const context = useContext(ExperimentsContext)

  if(!context) {
    throw Error('useExperimentsContext must be used inside a ExperimentsContextProvider')
  }

  return context
}