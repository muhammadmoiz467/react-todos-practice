import { Button, Card, Form, Input, message, Typography } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/Auth'

const { Title, Paragraph } = Typography
const { Item } = Form

const initialState = { email: "", password: ""  }
const Login = () => {

  const { dispatch } = useAuth()
  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleLogin = () => {
    let { email, password } = state

    setIsProcessing(true)

    const users = JSON.parse(localStorage.getItem("users")) || []

    const user = users.find(user => user.email === email && user.password === password)
    if (!user) {

      // setTimeout(() => {
      //   setIsProcessing(false)
      // }, 500);
      
        setIsProcessing(false)
      return window.toastify("Invalid email or password", "error")
    }

    
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify(user))
      dispatch({isAuth: true, user})
      navigate("/dashboard")
      setIsProcessing(false)
      window.toastify("Login successfully", "success")
    }, 500);

  }

  return (
    <main className='auth flex-center'>
      <div className='container'>
        <div className='card p-3 p-4 mx-auto'>
          <Title level={1} className='text-center'>Login</Title>
          <Paragraph className='text-center'>Already have an account? <Link to="/auth/register">Create Account</Link></Paragraph>

          <Form layout='vertical'>

            <Item label="Email" required>
              <Input type="email" size='large' placeholder='Enter your email' name='email' onChange={handleChange} />
            </Item>

            <Item label="Password" required>
              <Input.Password size='large' placeholder='Enter your password' name='password' onChange={handleChange} />
            </Item>

            <Button type='primary' size='large' block htmlType='submit' loading={isProcessing} onClick={handleLogin}>Login</Button>

          </Form>

        </div>
      </div>
    </main>
  )
}

export default Login 