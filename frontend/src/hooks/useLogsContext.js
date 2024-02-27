import { LogsContext } from "../context/LogsContext"
import { useContext } from "react"

export const useLogsContext = () => {
  const context = useContext(LogsContext)

  if(!context) {
    throw Error('useLogsContext must be used inside a LogsContextProvider')
  }

  return context
}