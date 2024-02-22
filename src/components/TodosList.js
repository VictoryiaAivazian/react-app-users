import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTodos, deleteTodo, addTodo } from '../store/todosSlice'
import { setPageLoader } from '../store/loadingSlice'
import { List, Row, Col, Empty, Button, Modal, Input, Alert } from 'antd'
import { 
    CheckCircleTwoTone, 
    ExclamationCircleTwoTone, 
    DeleteOutlined, 
    PlusOutlined 
} from '@ant-design/icons'

const TodosList = () => {

    const { todos, loading, error } = useSelector(state => state.todos)
    const dispatch = useDispatch()

    const [modalOpen, setModalOpen] = useState(false)
    const [newTodo, setNewTodo] = useState(null)

    const handleChange = (e) => {
        setNewTodo({
            completed:false,
            id: todos.length + 1,
            title: e.target.value,
            userId: todos.length + 1,
        })
    }

    const saveTodo = () => {
        dispatch(setPageLoader(true))
        setModalOpen(false)

        dispatch(addTodo(newTodo))
            .finally(() => {
                dispatch(setPageLoader(false))
            })
    }

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
            <Button type="primary" 
                    size="large" 
                    icon={<PlusOutlined />}
                    onClick={() => setModalOpen(true)}>
                    Add new todo
            </Button>
            <Modal
                title="Add new todo"
                centered
                maskClosable={false}
                closable={false}
                open={modalOpen}
                onOk={saveTodo}
                onCancel={() => setModalOpen(false)}
            >
                <label>Title</label>
                <Input onChange={(e) => handleChange(e)}/>
            </Modal>
            {/* <Alert message="Error" description={error} type="error" showIcon />  */}
        </>
    )
}

export default TodosList;