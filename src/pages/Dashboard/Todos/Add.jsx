import { Button, Card, DatePicker, Form, Input, Radio, Select, Typography } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/Auth'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { firestore } from '@/config/firebase'
import { supabase } from '@/config/supabase'

const { Title } = Typography
const { Item } = Form
const { Option } = Select

const initialState = { title: "", location: "", description: "", dueDate: "", status: "incompleted", visibility: "private" }
const Add = () => {
  const { dispatch, user } = useAuth()
  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const navigate = useNavigate()
  const [file, setFile] = useState(null)


  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleSubmit = async () => {

    let { title, location, description, dueDate, status, visibility } = state

    title = title.trim()
    location = location.trim()
    description = description.trim()

    if (title.length < 3) { return window.toastify("Please enter title correctly", "error") }
    if (location.length < 3) { return window.toastify("Please enter location correctly", "error") }
    if (description.length < 10) { return window.toastify("Please describe your todo correctly", "error") }
    if (!dueDate) { return window.toastify("Please select due date", "error") }

    const todo = { title, location, description, dueDate, status, visibility, imageURL: "" }
    todo.uid = user.uid
    todo.id = window.getRandomId()
    // todo.status = "Active"
    // todo.isCompleted = false
    todo.createdAt = new Date().getTime()

    setIsProcessing(true)
    if (file) {
      uploadFile(todo)
    } else {
      createDoc(todo)
    }

  }

  const uploadFile = async (todo) => {

    const fileName = window.getRandomId() + "-" + file.name

    const { data, error } = await supabase.storage.from('todos-images').upload(fileName, file)
    if (error) {
      console.error(error)
      setIsProcessing(false)
    } else {
      console.log('data', data)
      const url = import.meta.env.VITE_SUPABASE_URL + "/storage/v1/object/public/" + data.fullPath
      todo.imageURL = url

      createDoc(todo)
    }
  }


const createDoc = async (todo) => {
  try {
    await setDoc(doc(firestore, "todos", todo.id), todo);

    window.toastify("Todo created successfully", "success");
    // navigate("/dashboard/todos");

  } catch (e) {
    console.error(e);
    window.toastify("Todo not created", "error");
  } finally {
    setIsProcessing(false);
  }
};

return (
  <main >
    {/* <div className='container'>
        <div className='card p-3 p-4 mx-auto'>
          <div className="d-flex align-items-center justify-content-between mb-4"> */}
    <div className="card p-3 p-md-4 mx-auto" style={{ maxWidth: 500 }}>
      <Title level={1} className='text-center'>Add</Title>
      {/* <Button type='primary' onClick={() => { navigate("/dashboard/todos") }}>Todos</Button> */}
      {/* </div> */}
      <Form layout='vertical'>

        <Item label="Title" required>
          <Input type="text" size='large' placeholder='Enter title' name='title' onChange={handleChange} />
        </Item>
        <Item label="Location" required>
          <Input type="text" size='large' placeholder='Enter location' name='location' onChange={handleChange} />
        </Item>

        <Item label="Description" required>
          <Input.TextArea size='large' placeholder='Describe your todo' name='description' onChange={handleChange} rows={3} style={{ resize: 'none' }} />
        </Item>

        <Item label="Due Date" required>
          <DatePicker size='large' className='w-100' name='dueDate' onChange={(obj, dueDate) => { setState(s => ({ ...s, dueDate })) }} />
        </Item>

        <Item label="Status" required>
          <Select placeholder="Select status" size='large' defaultValue="incompleted" onChange={value => { setState(s => ({ ...s, status: value })) }}
            options={[
              { label: "Completed", value: "completed" },
              { label: "Incompleted", value: "incompleted" },
            ]} />
        </Item>

        <Item label="Visibility" required>
          <Radio.Group block defaultValue="private" name="visibility" onChange={handleChange}
            options={[
              { label: "Private", value: "private" },
              { label: "Public", value: "public" },
            ]}
          />
        </Item>
        <Item label="Image" >
          <input type="file" className='form-control' placeholder='Add todo image' accept='image/*' onChange={e => setFile(e.target.files[0])} />
        </Item>

        <Button type='primary' block htmlType='submit' loading={isProcessing} onClick={handleSubmit}>Add Todo</Button>

      </Form>

      {/* </div> */}
    </div>
  </main>
)
}

export default Add