import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { usersAdded } from '../store/usersSlice'
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';
import UserCard from './UserCard';

export default function UsersList(){
    //const [ users, setUsers ] = useState([])
    const [ error, setError ] = useState(null)
    const [ loading, setLoading ] = useState(false)

    const users = useSelector((state) => state.users.users)
    const dispatch = useDispatch()

    const getUsers = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch('https://reqres.in/api/users?page=2')
            const result = await response.json()
            // setUsers(result.data)
            dispatch(usersAdded(result.data))
        } catch {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <>
            { error 
                ? <div> { error.message } </div>
                : loading ? <div>Loading...</div>
                : <Row gutter={[16, 24]}>
                    { users.length > 0  
                        ? ( 
                            users.map((user) =>
                            <Col className="gutter-row" span={6} key={user.id}>
                                <Link to={`/users/${user.id}`} >
                                    <UserCard user={user} />
                                </Link>    
                            </Col>
                        ))
                        : ( <div>There are no users</div>)
                    }
                </Row> }
        </>
    )
}