import { Button, Card, DatePicker, Form, Input, Select, Typography } from 'antd'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { firestore } from '@/config/firebase'
import { useCallback } from 'react'

const { Title } = Typography
const { Item } = Form
const { Option } = Select

const initialState = { title: "", dueDate: "", description: "", priority: "" }

const Edit = () => {

  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const navigate = useNavigate()
  const params = useParams()

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  
  const getTodo = useCallback(async () => {

    const { id } = params
  
  
    const docSnap = await getDoc(doc(firestore, "todos", id));
  
    if (docSnap.exists()) {
      const todo = docSnap.data()
      setState(todo)
  
    } else {
      // docSnap.data() will be undefined in this case
      window.toastify("Todo not found", "error");
    }
  }, [params])


  useEffect(() => { getTodo() }, [getTodo])
  console.log('state', state)

  const handleSubmit = async() => {
    let { id, title, dueDate, description, priority, status, isCompleted } = state

    title = title.trim()

    if (title.length < 3) { return window.toastify("Please enter title", "error") }

    const todo = { title, dueDate, description, priority, status, isCompleted }
    todo.updatedAt = new Date().getTime()
    
    setIsProcessing(true)
    
        try {
          // await addDoc(collection(firestore, "todos"), todo);
          await setDoc(doc(firestore, "todos", id), todo, { merge: true });
          window.toastify("A new todo has been sucessfully updated", "success")
          navigate("/dashboard/todos")
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
            <Title level={2} className='mb-0'>Update Todo</Title>
            <Button type='primary' onClick={() => { navigate("/dashboard/todos") }}>Todos</Button>
          </div>
          <Form layout='vertical'>

            <Item label="Title" required>
              <Input type="text" size='large' placeholder='Enter title' value={state.title} name='title' onChange={handleChange} />
            </Item>

            <Item label="Due Date" >
              <DatePicker size='large' placeholder='Enter due date' className='w-100' value={state.dueDate ? dayjs(state.dueDate) : null} name='dueDate' onChange={(obj, dueDate) => { setState(s => ({ ...s, dueDate })) }} />
            </Item>

            <Item label="Description" >
              <Input.TextArea placeholder='Enter description' value={state.description} name='description' onChange={handleChange} style={{ height: 100, resize: 'none' }} />
            </Item>

            <Item label="Priority" >
              <Select size="large" placeholder="Please select priority" value={state.priority} onChange={(priority) => { setState(s => ({ ...s, priority })) }}>
                <Option value="low">Low</Option>
                <Option value="medium">Medium</Option>
                <Option value="high">High</Option>
              </Select>
            </Item>

            <Button type='primary' size='large' block htmlType='submit' loading={isProcessing} onClick={handleSubmit}>Update Todo</Button>

          </Form>

        </div>
      </div>
    </main>
  )
}

export default Edit