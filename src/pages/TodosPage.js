import { useSelector } from 'react-redux'
import TodosList from '../components/TodosList'
import { Alert } from 'antd'

const TodosPage = () => {
    const error = useSelector(state => state.todos.error)

    return (
        <>
            { error 
                ? <Alert message="Error" description={error} type="error" showIcon /> 
                : <TodosList/>
            }
        </>
    )
}

export default TodosPage;