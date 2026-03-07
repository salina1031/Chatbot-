import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
//acces data from authcontext 
const useAuth = () => {
  return useContext(AuthContext)
}

export default useAuth