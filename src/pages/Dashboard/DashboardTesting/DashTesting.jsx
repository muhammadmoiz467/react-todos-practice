import React from 'react';
import { DashboardOutlined, SettingOutlined, UploadOutlined, UsergroupAddOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import logo from '@/assets/logo.png'
import { auth } from '@/config/firebase';
import { Layout, Menu, theme } from 'antd';
// import Footer from '@/components/Footer'
import Footer from '@/components/Footer'

const { Header, Content, Sider } = Layout;
const items = [
  {
    key: '1',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
  },
  {
    key: '2',
    icon: <UsergroupAddOutlined />,
    label: 'Users'
  },
  {
    key: '3',
    icon: <UserOutlined />,
    label: 'Users',
  },
   {
    key: '4',
    icon: <SettingOutlined />,
    label: 'Setting'
  }

]

const DashTesting = () => {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const currentYear = new Date().getFullYear();

  const user = auth.currentUser;
  console.log('user', user)

  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0" onBreakpoint={broken => {
        console.log(broken);
      }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="sidebar-logo">
          <img src={logo} alt="logo" />
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
        <div className='sidebar-tools'>
       
        </div>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 710, background: colorBgContainer, borderRadius: borderRadiusLG }} >
            {/* <div style={{ padding: 24, fontSize: "40px" }} className='flex-center'> <span style={{ fontFamily: "-apple-system" }}>Welcom:</span> <span style={{ color: '#1d3557', fontFamily: "-apple-system", marginLeft: "20px", fontSize: "60px" }}>{user.email}</span> </div> */}
            <div className="welcome-box">
              <span className="welcome-text">Welcome: </span>
              <span className="user-text">{user?.email} </span> </div>
          </div>
        </Content>
        <div className='dashboard-footer'>
          <Footer  />
        </div>
      </Layout>
    </Layout>
    // {/* <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: colorBgContainer, borderRadius: borderRadiusLG }} className='flex-center' />
    // {/* <div style={{ padding: 24, minHeight: 740, background: colorBgContainer, borderRadius: borderRadiusLG, fontSize: "40px" }} className='flex-center'> <span style={{ fontFamily: "-apple-system" }}>Welcom:</span> <span style={{ color: '#1d3557', fontFamily: "-apple-system", marginLeft: "20px", fontSize: "60px" }}>{user.email}</span> </div> */}



  )
}

export default DashTesting