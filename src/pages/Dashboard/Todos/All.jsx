import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons'
import { Typography, Button, Table, Space, Dropdown } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const { Title, Text } = Typography

const All = () => {

  const [todos, setTodos] = useState([])
  const navigate = useNavigate()

  useEffect(() => {

    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos) { setTodos(todos.map(todo => ({...todo, key: todo.id }))) }

    // const todos = JSON.parse(localStorage.getItem("todos")) || []
    // setTodos(todos)

  }, [])
  console.log('todos', todos)

  const handleDelete = (todo) => {
    console.log('todo', todo)

    const filteredTodos = todos.filter(item => item.id !== todo.id)
    setTodos(filteredTodos)

    localStorage.setItem('todos', filteredTodos)

    window.toastify("Todo deleted successfully", "success")

    console.log('todos', todos)
    console.log('filteredTodos', filteredTodos)
  }

  const columns = [
    { title: 'Title', dataIndex: 'title' },
    { title: 'Due Date', dataIndex: 'dueDate' },
    { title: 'Description', dataIndex: 'description' },
    { title: 'Priority', dataIndex: 'priority', render: text => <Text className='text-capitalize'>{text}</Text> },
    { title: 'Date Created', dataIndex: 'createdAt', render: text => <Text className='text-capitalize'>{dayjs(text).format("dddd DD-MM-YY, hh:mm:ss A")}</Text> },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Dropdown menu={{ 
          items: [
            { label: "Edit", key: "edit", icon:<EditOutlined />, onClick: () => {} },
            { label: "Delete", key: "delete", icon: <DeleteOutlined />, onClick: () => { handleDelete(record) } }
          ]
        }} trigger={['click']}>
          <Button className='border-0' icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <main className='py-5'>
      <div className='container'>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <Title level={2} className='mb-0'>Todos</Title>
          <Button type='primary' onClick={() => { navigate("/dashboard/todos/add") }}>Add Todo</Button>
        </div>

        <Table columns={columns} dataSource={todos} />
      </div>
    </main>
  )
}

export default All