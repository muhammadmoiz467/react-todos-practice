import { firestore } from '@/config/firebase'
import { useAuth } from '@/context/Auth'
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons'
import { Typography, Button, Table, Image, Space, Dropdown, Tag } from 'antd'
import dayjs from 'dayjs'
import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const { Title, Text } = Typography

const All = () => {

  const {user} = useAuth()
  const [todos, setTodos] = useState([])
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const getTodos = async () => {

    setIsLoading(true)
    const querySnapshot = await getDocs(query(collection(firestore, "todos"), where("uid", "==", user.uid), orderBy("createdAt", "desc")));

    const array = []

    querySnapshot.forEach((doc) => {
      const todo = doc.data()
      array.push({ ...todo, key: todo.id })
      console.log('todo', todo)
    });

    setTodos(array)
    setIsLoading(false)
  }
  useEffect(() => { getTodos() }, [])

  // console.log('todos', todos)

  const handleDelete = async (todo) => {

    try {
      await deleteDoc(doc(firestore, "todos", todo.id));

      const filteredTodos = todos.filter(item => item.id !== todo.id)
      
      setTodos(filteredTodos)

      window.toastify("Todo deleted successfully", "success")
      
    } catch (error) {
      console.error(error)
    }


    localStorage.setItem('todos', JSON.stringify(filteredTodos))

  }

  const columns = [
    // { title: 'Image', dataIndex: 'imageURL', render: imageURL => (todo.imageURL && <Image src={todo.imageURL} width={64} className='rounded-circle shadow' />) },
    { title: '#', render: (text, record, index) => index + 1},
    { title: 'Image', dataIndex: 'imageURL', render: imageURL => (imageURL ? ( <Image src={imageURL} width={64} className='rounded-circle shahdow' />) : (<Text type='secondary'>No Image</Text>) ) },
    { title: 'Title', dataIndex: 'title' },
    { title: 'Location', dataIndex: 'location' },
    { title: 'Description', dataIndex: 'description' },
    { title: 'Due Date', dataIndex: 'dueDate' },
    { title: 'Status', dataIndex: 'status', render: status => ( <Tag color={status === "completed" ? "success" : "purple"} className="text-capitalize">{status}</Tag> )},
    { title: 'Visibility', dataIndex: 'visibility', render: visibility => ( <Tag color={visibility === "private" ? "blue" : "orange"} className='text-capitalize'>{visibility}</Tag> )},
    // { title: 'Priority', dataIndex: 'priority', render: text => <Text className='text-capitalize'>{text}</Text> },
    { title: 'Date Created', dataIndex: 'createdAt', render: text => <Text className='text-capitalize'>{dayjs(text).format("dddd DD-MM-YY, hh:mm:ss A")}</Text> },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Dropdown menu={{
          items: [
            { label: "Edit", key: "edit", icon: <EditOutlined />, onClick: () => { navigate(`/dashboard/todos/edit/${record.id}`) } },
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
        <div className="text-center mb-5">
          <Title level={1} className=''>Todos All</Title>
          {/* <Button type='primary' onClick={() => { navigate("/dashboard/todos/add") }}>Add Todo</Button> */}
        </div>

        <Table columns={columns} dataSource={todos} loading={isLoading} className='table-responsive' />
      </div>
    </main>
  )
}

export default All