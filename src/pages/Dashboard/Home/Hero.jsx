import { Col, Row, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const { Title } = Typography

const Hero = () => {
  return (
    <div className='py-5'>
        <div className="container">
            <Row>
                <Col span={24} className='text-center'>
                  <Title level={1}>Dashboard - Hero</Title>

                  <Link to="/" className='btn btn-primary'>Home</Link>
                  <Link to="/auth/login" className='btn btn-primary'>Login</Link>
                </Col>
            </Row>
        </div>
    </div>
  )
}

export default Hero