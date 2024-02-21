import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTodos, deleteTodo } from '../store/todosSlice'
import { List, Row, Col, Empty, Button } from 'antd'
import { CheckCircleTwoTone, ExclamationCircleTwoTone, DeleteOutlined } from '@ant-design/icons'

const TodosList = () => {

    const { todos, loading} = useSelector(state => state.todos)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodos())
    }, [])

    return (
        <>
            {todos.length > 0
                ? <List
                    size="small"
                    header={<div>Todo list</div>}
                    bordered
                    dataSource={todos}
                    loading={loading}
                    renderItem={(item) => (
                        <List.Item key={item.id}>
                            <Row>
                                <Col flex={3}>
                                    { item.completed 
                                        ? <CheckCircleTwoTone twoToneColor="#52c41a"/> 
                                        : <ExclamationCircleTwoTone twoToneColor="#FFCB16"/>
                                    }
                                </Col>
                                <Col flex={2}> { item.title } </Col>
                                <Col flex={2}>
                                    <Button shape="circle" 
                                            icon={<DeleteOutlined />} 
                                            onClick={() => dispatch(deleteTodo(item.id))}/>
                                </Col>
                            </Row>
                        </List.Item>
                    )}
                />
                : <Empty/>
            }
        </>
    )
}

export default TodosList;