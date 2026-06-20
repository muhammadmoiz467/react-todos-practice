// import React from 'react';
// import { useState } from 'react';
// import logo from '@/assets/logo.png'
// import { auth } from '@/config/firebase';

// import { signOut } from 'firebase/auth';  // example

// import { Layout, Menu, theme } from 'antd';

// import { Button, Dropdown, Space } from 'antd';   // example

// import { items } from './MenuItems';
// // import Footer from '@/components/Footer'
// import { Link, Route, Routes, useNavigate } from 'react-router-dom';
// import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
// import Todos from './Todos';
// import { Footer } from 'antd/es/layout/layout';
// // import Footer from '@/components/Footer';
// // import Todos from './Todos';
// // import All from '../Todos/All';
// // import Add from '../Todos/Add';
// // import Home from './Home';

// const { Header, Content, Sider } = Layout;

// const Dashboard = () => {
//     const [collapsed, setCollapsed] = useState(false);
//     // const [activePage, setActivePage] = useState('Home');
//     const navigate = useNavigate();

//     const {
//         token: { colorBgContainer, borderRadiusLG },
//     } = theme.useToken();
//     const currentYear = new Date().getFullYear();

//     const user = auth.currentUser;
//     console.log('user', user)

//     const DashboardEmail = () => {
//         return <div className="welcome-box flex-center text-center p-4">
//             <span className="welcome-text">Welcome: </span>
//             <span className="user-text">{user?.email} </span>
//         </div>
//     }

//     return (
//         // <Layout className='dashboard'>
//         //     <Sider collapsible collapsed={collapsed} trigger={null} breakpoint="lg" collapsedWidth={80} width={220} onBreakpoint={(broken) => {
//         //         setCollapsed(broken)
//         //     }}>
//         //         <div className="sidebar-logo" style={{ cursor: 'pointer' }} onClick={() => navigate("/")}>
//         //             <img src={logo} alt="logo" />
//         //             <span className="brand-name text-white">MG Group</span>

//         //         </div>
//         //         <Menu theme="dark" mode="inline" items={items} />
//         //         <div className='sidebar-tools'>

//         //         </div>
//         //     </Sider>
//         //     <Layout>
//                 {/* <Header style={{ padding: '0 16px', background: colorBgContainer, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> */}
//                     {/* LEFT: SIDEBAR TOGGLE */}
//                     {/* <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setCollapsed(!collapsed)} style={{ fontSize: '18px' }} /> */}

//                     {/* RIGHT: USER + LOGOUT */}
//                     {/* <Dropdown
//                         menu={{
//                             items: [
//                                 { key: 'logout', icon: <LogoutOutlined />, label: 'Logout', onClick: () => signOut(auth) }
//                             ],
//                         }}>
//                         <Space style={{ cursor: 'pointer' }}>
//                             <UserOutlined />
//                             <span>{user?.email}</span>
//                         </Space>
//                     </Dropdown>
//                 </Header> */}
//                 {/* <Content>
//                     <div >
//                         <Routes>
//                             <Route index element={<DashboardEmail />} />

//                         </Routes>
//                     </div>
//                 </Content> */}
//                     <Layout className='min-vh-100 dashboard'>
//             <Sider breakpoint="md" collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
//                 <div className="py-3">
//                     <Title level={4} className='mb-0 text-center text-white'>React Todos</Title>
//                 </div>
//                 <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
//             </Sider>
//             <Layout>
//                 <Header className='p-0 px-4 bg-white d-flex align-items-center justify-content-end' style={{ height: 60 }}>
//                     <Typography.Title level={5}>
//                         {user.email}
//                     </Typography.Title>
//                 </Header>
//                 <Content className='p-3 pb-0'>
//                     <div className="card p-3 border-0 h-100">
//                         <Routes />
//                     </div>
//                 </Content>
//                 <Footer className="text-center">
//                     © {currentYear} MG Group. All Rights Reserved.
//                 </Footer>
//             </Layout>
//         </Layout>

//     )
// }

// export default Dashboard

import React from 'react';
import { useState } from 'react';
import logo from '@/assets/logo.png'
import { auth } from '@/config/firebase';

import { signOut } from 'firebase/auth';  // example

import { Layout, Menu, Typography } from 'antd';

// import { Button, Dropdown, Space } from 'antd';   // example

import { items } from './MenuItems';
// import Footer from '@/components/Footer'
import { useNavigate } from 'react-router-dom';
// import Todos from './Todos';
import Routes from './Routes';
// import DashboardRoutes from './Routes';
// import Footer from '@/components/Footer';
// import Todos from './Todos';
// import All from '../Todos/All';
// import Add from '../Todos/Add';
// import Home from './Home';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()
    const user = auth.currentUser;
    const year = new Date().getFullYear();

    const DashboardEmail = () => {
        return (
            <div className="welcome-box flex-center text-center p-4">
                <span className="welcome-text">Welcome: </span>
                <span className="user-text">{user?.email}</span>
            </div>
        );
    };
    return (
        <Layout className="min-vh-100 dashboard">
            <Sider breakpoint="md" collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                <div className="sidebar-logo" style={{ cursor: 'pointer' }} onClick={() => navigate("/")}>
                    <img src={logo} alt="logo" />
                    <span className="brand-name text-white">MG Group</span>

                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
                <div className='sidebar-tools'>

                </div>
            </Sider>

            <Layout>
                <Header className="px-4 bg-white d-flex align-items-center justify-content-end" style={{ height: 60 }}>
                    <Title level={5} style={{ margin: 0 }}>
                        {user?.email}
                    </Title>
                </Header>

                {/* CONTENT (CARD STYLE) */}
                <Content className="p-3 pb-0">
                    <div className="card p-3 border-0 h-100">
                        <Routes />
                        {/* <Routes>
              <Route index element={<DashboardEmail />} />
              <Route path="todos/*" element={<Todos />} />
            </Routes> */}
                    </div>
                </Content>

                {/* FOOTER */}
                <Footer className="text-center" style={{ padding: '13.5px 16px' }}>
                    © {year} MG Group. All Rights Reserved.
                </Footer>
            </Layout>
        </Layout>
    );
};
export default Dashboard