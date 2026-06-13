import { Button, Col, Row, Space, Typography } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const { Title } = Typography

const Hero = () => {
 
  const navigate = useNavigate()

  return (
    <div className='py-5'>
        <div className="container">
            <Row>
                <Col span={24} className='text-center'>
                  <Title level={1}>Dashboard - Hero</Title>
                  <Space>
                  <Link to="/" className='btn btn-primary'>Frontend</Link>
                  <Link to="/dashboard/todos" className='btn btn-primary'>Todos</Link>
                  <Button type='primary' onClick={() => navigate('/dashboard/dashboardTempory/dashTesting')}>Dashboard Temp</Button>
                  </Space>
                </Col>
            </Row>
        </div>
    </div>
  )
}

export default Hero