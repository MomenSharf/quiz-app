import { ThemeContext } from "@/context/ThemeContext"
import { useContext } from "react"

  const useTheme = () => {
  const context = useContext(ThemeContext)

  if(!context) {
    throw Error('useThemeContext must be used inside ThemeContextProvider')
  }

  return context
}


export default useTheme