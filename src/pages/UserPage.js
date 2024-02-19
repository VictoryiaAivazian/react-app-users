import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserCard from '../components/UserCard';

export default function UserPage() {

    const [ user, setUser ] = useState({})
    const { userId } = useParams()
    const navigate = useNavigate()

    const getCurrentUser = async () => {
        try {
            const response = await fetch(`https://reqres.in/api/users/${userId}`)
            const result = await response.json()
            setUser(result.data)
        } catch {
            return navigate('*')
        }
    }

    useEffect(() => {
        getCurrentUser()
    }, [])

    return (
        <UserCard user={user} /> 
    )
  }
  