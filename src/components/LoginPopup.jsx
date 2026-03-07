import React from 'react'
import { useState } from 'react'
import AuthContext from '../context/AuthContext'
import { useContext } from 'react'
const LoginPopup = () => {
  const {loggedIn,loggedOut,Login,user}=useContext(AuthContext)
  const [name,setName]=useState("")
  const handleSubmit=(e)=>{
    e.preventDefault()
    loggedIn(name)
  }
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input type="text"
        placeholder={name}
        onChange={(e)=>setName(e.target.value)}
         />
         <button>Submit</button>
      </form>
    </div>
  )
}

export default LoginPopup
