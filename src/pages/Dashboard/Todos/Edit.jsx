import { Button, Card, DatePicker, Form, Input, Radio, Select, Typography } from 'antd'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import { doc, getDoc, setDoc,   serverTimestamp } from 'firebase/firestore'
import { firestore } from '@/config/firebase'
import { useCallback } from 'react'

const { Title } = Typography
const { Item } = Form
const { Option } = Select

const initialState = { title: "", location: "", description: "", dueDate: "", status: "incompleted", visibility: "private" }

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
      console.log('todo', todo)
      setState(todo)

    } else {
      // docSnap.data() will be undefined in this case
      window.toastify("Todo not found", "error");
    }

  }, [params])


  useEffect(() => { getTodo() }, [getTodo])
  console.log('state', state)

  const handleSubmit = async () => {
    let { id, title, location, description, dueDate, status, visibility } = state

    title = title.trim()
    location = location.trim()
    description = description.trim()

    if (title.length < 3) { return window.toastify("Please enter title", "error") }
    if (location.length < 3) { return window.toastify("Please enter location correctly", "error") }
    if (description.length < 10) { return window.toastify("Please describe your todo correctly", "error") }
    if (!dueDate) { return window.toastify("Please select due date", "error") }

    // const todo = { title, location, description, dueDate, status, visibility }
    // todo.updatedAt = new Date().getTime()
    const todo = {
      title, location, description, dueDate, status, visibility,
      updatedAt: serverTimestamp(),
      // id: window.getRandomId(),
      // uid: user.id
    }


    setIsProcessing(true)

    try {
      // await addDoc(collection(firestore, "todos"), todo);
      await setDoc(doc(firestore, "todos", id), todo, { merge: true });
      window.toastify("Todo has been sucessfully updated", "success")
      navigate("/dashboard/todos")
    } catch (e) {
      console.error("Error adding document: ", e);
      window.toastify("Todo not updated", "error")
    } finally {
      setIsProcessing(false)
    }

  }

  return (
    <main>
      {/* //   <div className='container'>
    //     <div className='card p-3 p-4 mx-auto'>
    //       <div className="d-flex align-items-center justify-content-between mb-4">
    //         <Title level={2} className='mb-0'>Update Todo</Title>
    //       </div> */}

      <div className="card p-3 p-md-4 mx-auto" style={{ maxWidth: 500 }}>
        <Title level={1} className='text-center'>Update Todo</Title>
        {/* <Button type='primary' onClick={() => { navigate("/dashboard/todos") }}>Todos</Button> */}

        <Form layout='vertical'>

          <Item label="Title" required>
            <Input type="text" size='large' placeholder='Enter title' name='title' value={state.title} onChange={handleChange} />
          </Item>

          <Item label="Location" required>
            <Input type="text" size='large' placeholder='Enter location' name='location' value={state.location} onChange={handleChange} />
          </Item>

          <Item label="Description" required>
            <Input.TextArea size='large' placeholder='Describe your todo' rows={3} style={{ resize: "none" }} name='description' value={state.description} onChange={handleChange} />
          </Item>

          <Item label="Due Date" required>
            <DatePicker size='large' className='w-100' name='dueDate' value={state.dueDate ? dayjs(state.dueDate) : null} onChange={(obj, dueDate) => { setState(s => ({ ...s, dueDate })) }} />
          </Item>

          <Item label="Status" required>
            <Select placeholder="Select status" value={state.status} onChange={value => { setState(s => ({ ...s, status: value })) }}
              options={[
                { label: "Completed", value: "completed" },
                { label: "Incompleted", value: "incompleted" },
              ]} />
          </Item>

          <Item label="Visibility" required>
            <Radio.Group block name="visibility" value={state.visibility} onChange={handleChange}
              options={[
                { label: "Private", value: "private" },
                { label: "Public", value: "public" },
              ]}
            />
          </Item>

          <Button type='primary' block htmlType='submit' loading={isProcessing} onClick={handleSubmit}>Update</Button>

        </Form>

      </div>

    </main>
  )
}

export default Edit