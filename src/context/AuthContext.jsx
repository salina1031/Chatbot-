import React from 'react'
import { createContext, useState,useEffect } from 'react'
import AuthServices from '../services/AuthServices'

const AuthContext=createContext()//used by all component  globally  store hunxa


export const AuthProvider = ({children}) => {
  
  const [user,setUser]=useState(null)// logout hunxa

  // already  login  xa ki check garxa
  useEffect(() => {
    const loggedInUser = AuthServices.getCurrentUser()
    if (loggedInUser) setUser(loggedInUser)
  }, [])
//create new user 
  const signup = (name, email, password) => {
    const newUser = AuthServices.signup(name, email, password)
    setUser(newUser)//auto login to the web
  }
//existing user ho ki nai verify garxa
  const login = (email, password) => {
    const loggedUser = AuthServices.login(email, password)
    setUser(loggedUser)
  }
//remove the user
  const logout = () => {
    AuthServices.logout()
    setUser(null)
  }

  return (
    //sabai components lai pass garxa  user, signup, login, logout 
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext


