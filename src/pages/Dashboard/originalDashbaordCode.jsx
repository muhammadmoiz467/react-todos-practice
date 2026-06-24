// import React from 'react';
// import { useState } from 'react';
// import { DashboardOutlined, SettingOutlined, MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined, UploadOutlined, UsergroupAddOutlined, UserOutlined, VideoCameraOutlined, PieChartOutlined, HomeFilled, HomeOutlined, PlusOutlined } from '@ant-design/icons';
// import logo from '@/assets/logo.png'
// import { auth } from '@/config/firebase';

// import { signOut } from 'firebase/auth';  // example

// import { Layout, Menu, theme } from 'antd';

// import { Button, Dropdown, Space } from 'antd';   // example

// // import Footer from '@/components/Footer';
// import Footer from '@/components/Footer'
// // import { Link, Route, Routes, useNavigate } from 'react-router-dom';
// import { Link, Route, Routes, useNavigate } from 'react-router-dom';
// import Todos from './Todos';
// import All from '../Todos/All';
// import Add from '../Todos/Add';
// import Home from './Home';

// const { Header, Content, Sider } = Layout;

// const items = [
//   {
//     key: 'dashboard',
//     icon: <PieChartOutlined />,
//     label: 'Dashboard',
//   },
//   {
//     key: 'home',
//     icon: <HomeOutlined />,
//     label: 'Home',
//   },
//   // {
//   //   key: 'users',
//   //   icon: <UsergroupAddOutlined />,
//   //   label: 'Users'
//   // },
//   {
//     key: 'users',
//     icon: <UserOutlined />,
//     label: 'Users',
//   },
//   {
//     key: 'todo',
//     icon: <UsergroupAddOutlined />,
//     label: 'Todos',
//     children: [
//       {
//         key: 'all-todos',
//         icon: <PieChartOutlined />,
//         label: 'All Todos',
//         onClick: () => navigate('/dashboard/todos'),
//       },
//       {
//         key: 'add-todo',
//         icon: <PlusOutlined />,
//         label: 'Add Todo',
//         onClick: () => navigate('/dashboard/todos/add'),
//       },
//     ],
//   },
//   {
//     key: 'setting',
//     icon: <SettingOutlined />,
//     label: 'Setting'
//   }

// ]

// const Dashboard = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   // const [activePage, setActivePage] = useState('Home');
//   const navigate = useNavigate();

//   const items = [
//     {
//       key: 'dashboard',
//       icon: <PieChartOutlined />,
//       label: <Link to='/dashbaord'>Dashboard</Link>,
//     },
//     {
//       key: 'home',
//       icon: <HomeOutlined />,
//       label: <Link to='/dashbaord/home'>Home</Link>,
//     },
//     // {
//     //   key: 'users',
//     //   icon: <UsergroupAddOutlined />,
//     //   label: 'Users'
//     // },
//     {
//       key: 'users',
//       icon: <UserOutlined />,
//       label: <Link to='/dashbaord/users'>Users</Link>,
//     },
//     {
//       key: 'todo',
//       icon: <UsergroupAddOutlined />,
//       label: 'Todos',
//       children: [
//         {
//           key: 'all-todos',
//           icon: <PieChartOutlined />,
//           label: <Link to='/dashbaord/todos'>All Todos</Link>,
//         },
//         {
//           key: 'add-todo',
//           icon: <PlusOutlined />,
//           label: <Link to='/dashbaord/todos/add'>Add Todo</Link>,
//           // onClick: () => navigate('/dashboard/todos/add'),
//         },
//       ],
//     },
//     {
//       key: 'setting',
//       icon: <SettingOutlined />,
//       label: 'Setting'
//     }

//   ]

//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();
//   const currentYear = new Date().getFullYear();

//   const user = auth.currentUser;
//   console.log('user', user)

//   return (
//     <Layout>
//       {/* <Sider breakpoint="lg" collapsedWidth="0" onBreakpoint={broken => {
//         console.log(broken);
//       }}
//         onCollapse={(collapsed, type) => {
//           console.log(collapsed, type);
//         }}
//       > */}
//       <Sider
//         collapsible
//         collapsed={collapsed}
//         trigger={null}
//         breakpoint="lg"          // < 992px
//         collapsedWidth={80}      // ⭐ icons only (IMPORTANT)
//         width={220}              // normal width
//         onBreakpoint={(broken) => {
//           setCollapsed(broken);  // ⭐ auto collapse on small screen
//         }}

//       // collapsible
//       // collapsed={collapsed}
//       // trigger={null}
//       // breakpoint="lg"

//       >
//         <div className="sidebar-logo" style={{ cursor: 'pointer' }} onClick={() => navigate("/")}>
//           <img src={logo} alt="logo" />
//           <span className="brand-name text-white">MG Group</span>

//         </div>
//         <Menu theme="dark" mode="inline" items={menuItems} />
//         <div className='sidebar-tools'>

//         </div>
//       </Sider>
//       <Layout>
//         {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
//         <Header
//           style={{
//             padding: '0 16px',
//             background: colorBgContainer,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//           }}
//         >
//           {/* LEFT: SIDEBAR TOGGLE */}
//           <Button
//             type="text"
//             icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//             onClick={() => setCollapsed(!collapsed)}
//             style={{ fontSize: '18px' }}
//           />

//           {/* RIGHT: USER + LOGOUT */}
//           <Dropdown
//             menu={{
//               items: [
//                 {
//                   key: 'logout',
//                   icon: <LogoutOutlined />,
//                   label: 'Logout',
//                   onClick: () => signOut(auth),
//                 },
//               ],
//             }}
//           >
//             <Space style={{ cursor: 'pointer' }}>
//               <UserOutlined />
//               <span>{user?.email}</span>
//             </Space>
//           </Dropdown>
//         </Header>
//         <Content style={{ margin: '24px 16px 0' }}>
//           {/* <div style={{ padding: 24, minHeight: 710, background: colorBgContainer, borderRadius: borderRadiusLG }} > */}

//           {/* <div style={{ padding: 24, fontSize: "40px" }} className='flex-center'> <span style={{ fontFamily: "-apple-system" }}>Welcom:</span> <span style={{ color: '#1d3557', fontFamily: "-apple-system", marginLeft: "20px", fontSize: "60px" }}>{user.email}</span> </div> */}


//           {/* {activePage === "dashboard" &&
//               <div className="welcome-box">
//                 <span className="welcome-text">Welcome: </span>
//                 <span className="user-text">{user?.email} </span>
//               </div>}
//             {activePage === "home" &&
//               <div className="welcome-box">
//                 <span className="welcome-text">Welcome: </span>
//                 <span className="user-text">{user?.email} </span>
//               </div>}
//             {activePage === "users" && <Todos />}
//             {activePage === "all-todos" && <All />}
//             {activePage === "add-todos" && <Add />}
//           </div> */}

//           <div style={{ padding: 24, minHeight: 710 }}>
//             <Routes>
//               <Route index element={<DashboardHome />} />
//               <Route path="home" element={<Home />} />
//               <Route path="users" element={<Users />} />
//               <Route path="todos/*" element={<Todos />} />
//               <Route path="settings" element={<Settings />} />
//             </Routes>
//           </div>
//         </Content>
//         <div className='dashboard-footer'>
//           <Footer />
//         </div>
//       </Layout>
//     </Layout>
//     // {/* <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: colorBgContainer, borderRadius: borderRadiusLG }} className='flex-center' />
//     // {/* <div style={{ padding: 24, minHeight: 740, background: colorBgContainer, borderRadius: borderRadiusLG, fontSize: "40px" }} className='flex-center'> <span style={{ fontFamily: "-apple-system" }}>Welcom:</span> <span style={{ color: '#1d3557', fontFamily: "-apple-system", marginLeft: "20px", fontSize: "60px" }}>{user.email}</span> </div> */}



//   )
// }

// export default Dashboard






// import React from 'react'

// const Dashboard = () => {
//   return (
//     <div>Dashboard</div>
//   )
// }

// export default Dashboard