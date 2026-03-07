import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'

const AuthContext=useContext({children})
export default (AuthContext)
const AuthProvider = () => {
  const [Login,setLogin]=useState(false)
  const [user,setUser]=useState("")

  const loggedIn=()=>{
    setLogin(true)
    setUser(name)
  }
  const loggedOut=()=>{
    setLogin(false)
    setUser("")
  }
  return (
    <div>
      <AuthContext.Proveder value={{loggedIn,loggedOut,Login,user}}>
        {children}
      </AuthContext.Proveder>
    </div>
  )
}


