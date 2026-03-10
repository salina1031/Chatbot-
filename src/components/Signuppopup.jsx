import React from 'react'
import useAuth from '../hooks/UseAuth'
import { useState } from 'react'

const Signuppopup = ({onClose,onLoginClick}) => {
    const { signup } = useAuth()

    const [name, setName] = useState("")
    const [email, SetEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = () => {
        try {
            signup(name, email, password)
            onClose()//popup closed
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="popupContainer">
            <div className="popup">
                <h2>signup</h2>
                {error && <p className="error">{error}</p>}
                <input placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input placeholder='Email'
                    value={email}
                    onChange={(e) => SetEmail(e.target.value)}
                />
                <input placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleSubmit}>Signup</button>
                {/* //redirect to login */}
                <p>Already have account? 
                    <span onClick={onLoginClick}>Login</span>
                </p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

export default Signuppopup