import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/UseAuth'

const Navbar = ({onLoginClick,onSignupClick}) => {
    const {user,logout}=useAuth()
    const navigate=useNavigate()

    const handleLogout=()=>{
        logout()//called logout function
        navigate("/")

    }
  return (
    <div className="navbar">
        <h1>NoChat</h1>
        <div>
            {user?(
                <>
                <span>Hi, {user.name}</span>
                <button onClick={handleLogout}>Logout</button>
                </>
            ):(
                <>
                <button onClick={onLoginClick}>Login</button>
                <button onClick={onSignupClick}>Signup</button>
                </>
            )}
        </div>
    </div>
  )
}

export default Navbar