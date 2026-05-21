import { Button, Card, Form, Input, message, Typography } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const { Title, Paragraph } = Typography
const { Item } = Form

const initialState = { fullName: "", email: "", password: "", confirmPassword: "" }
const Register = () => {

  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleRegister = () => {
    let { fullName, email, password, confirmPassword } = state

    fullName = fullName.trim()
    if (fullName.length < 3) { return window.toastify("Please enter your full name", "error") }
    if (!window.isValidEmail(email)) { return window.toastify("Please enter your valid email", "error") }
    if (password.length < 6) { return window.toastify("Password must be atleast 6 chars", "error") }
    if (confirmPassword !== password) { return window.toastify("Password not match", "error") }

    const user = { uid: window.getRandomId(), fullName, email, password, status: "active", role: "customer" }

    setIsProcessing(true)

    const users = JSON.parse(localStorage.getItem("users")) || []

    let isUserFound = users.find(user => user.email === email)
    if (isUserFound) {

      // setTimeout(() => {
      //   setIsProcessing(false)
      // }, 500);
      
        setIsProcessing(false)
      return window.toastify("User already exist", "error")
    }

    users.push(user)
    localStorage.setItem('users', JSON.stringify(users))

    setTimeout(() => {
      setIsProcessing(false)
      window.toastify("A new account has been successfully created", "success")
      navigate("/auth/login")
    }, 500);

  }

  return (
    <main className='auth flex-center'>
      <div className='container'>
        <div className='card p-3 p-4 mx-auto'>
          <Title level={1} className='text-center'>Register</Title>
          <Paragraph className='text-center'>Already have an account? <Link to="/auth/login">Login</Link></Paragraph>

          <Form layout='vertical'>

            <Item label="Full Name" required>
              <Input type="text" size='large' placeholder='Enter your full name' name='fullName' onChange={handleChange} />
            </Item>

            <Item label="Email" required>
              <Input type="email" size='large' placeholder='Enter your email' name='email' onChange={handleChange} />
            </Item>

            <Item label="Password" required>
              <Input.Password size='large' placeholder='Enter your password' name='password' onChange={handleChange} />
            </Item>

            <Item label="Confirm Password" required>
              <Input.Password size='large' placeholder='Enter your password again' name='confirmPassword' onChange={handleChange} />
            </Item>

            <Button type='primary' size='large' block htmlType='submit' loading={isProcessing} onClick={handleRegister}>Create Account</Button>

          </Form>

        </div>
      </div>
    </main>
  )
}

export default Register 