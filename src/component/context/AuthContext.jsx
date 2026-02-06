import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
    if (loggedUser) {
      setUser(loggedUser)
    }
  }, [])

  const login = (userData) => {
    localStorage.setItem("loggedUser", JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("loggedUser")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}