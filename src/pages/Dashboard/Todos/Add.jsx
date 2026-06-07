import { Button, Card, DatePicker, Form, Input, Select, Typography } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/Auth'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { firestore } from '@/config/firebase'

const { Title } = Typography
const { Item } = Form
const { Option } = Select

const initialState = { title: "", dueDate: "", description: "", priority: "" }
const Add = () => {
  const { dispatch, user } = useAuth()
  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleSubmit = async () => {
    let { title, dueDate, description, priority } = state

    title = title.trim()

    if (title.length < 3) { return window.toastify("Please enter title", "error") }

    const todo = { title, dueDate, description, priority }
    todo.uid = user.uid
    todo.id = window.getRandomId()
    todo.status = "Active"
    todo.isCompleted = false
    todo.createdAt = new Date().getTime()

    setIsProcessing(true)

    try {
      await addDoc(collection(firestore, "todos"), todo);
      await setDoc(doc(firestore, "todos", todo.id), todo);
      window.toastify("A new todo has been sucessfully created", "success")
    } catch (e) {
      console.error("Error adding document: ", e);
      window.toastify("Todo not created", "error")
    } finally {
      setIsProcessing(false)
    }

  }

  return (
    <main className='auth flex-center'>
      <div className='container'>
        <div className='card p-3 p-4 mx-auto'>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <Title level={2} className='mb-0'>Add Todo</Title>
            <Button type='primary' onClick={() => { navigate("/dashboard/todos") }}>Todos</Button>
          </div>
          <Form layout='vertical'>

            <Item label="Title" required>
              <Input type="text" size='large' placeholder='Enter title' name='title' onChange={handleChange} />
            </Item>

            <Item label="Due Date" >
              <DatePicker size='large' placeholder='Enter due date' className='w-100' name='dueDate' onChange={(obj, dueDate) => { setState(s => ({ ...s, dueDate })) }} />
            </Item>

            <Item label="Description" >
              <Input.TextArea placeholder='Enter description' name='description' onChange={handleChange} style={{ height: 100, resize: 'none' }} />
            </Item>

            <Item label="Priority" >
              <Select size="large" placeholder="Please select priority" onChange={(priority) => { setState(s => ({ ...s, priority })) }}>
                <Option value="low">Low</Option>
                <Option value="medium">Medium</Option>
                <Option value="high">High</Option>
              </Select>
            </Item>

            <Button type='primary' size='large' block htmlType='submit' loading={isProcessing} onClick={handleSubmit}>Add Todo</Button>

          </Form>

        </div>
      </div>
    </main>
  )
}

export default Add