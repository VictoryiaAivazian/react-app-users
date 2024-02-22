import { useSelector } from 'react-redux'
import TodosList from '../components/TodosList'
import { Spin } from 'antd'

const TodosPage = () => {
    const pageLoading = useSelector(state => state.loading.loading)

    return (
        <>
            <Spin fullscreen spinning={pageLoading} tip="Loading..."></Spin>
            <TodosList/>
        </>
    )
}

export default TodosPage;