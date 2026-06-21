import React from 'react'
import { useNavigate } from 'react-router-dom'
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons'
import { Button, Col, Row, Space, Typography } from 'antd'
import { useAuth } from '@/context/Auth'

const { Title } = Typography

const Hero = () => {

  const navigate = useNavigate()
  const { handleLogout } = useAuth()
  
  return (
    <div className='py-5'>
      <div className="container">
        <Row>
          <Col span={24} className='text-center'>
            <Title level={1}>Dashboard Home</Title>
            <Space>
              <Button type='primary' size='large' icon={<HomeOutlined />} onClick={() => navigate("/")} >Home</Button>
              <Button type='primary' danger size='large' icon={<LogoutOutlined />} onClick={handleLogout}>Logout</Button>
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Hero