import { DashboardOutlined, SettingOutlined, MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined, UploadOutlined, UsergroupAddOutlined, UserOutlined, VideoCameraOutlined, PieChartOutlined, HomeFilled, HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const root = "/dashboard"

const items = [
    
    {
        key: '1', label: <Link to={`${root}`}>Home</Link>, icon: <HomeOutlined />,
    },
    // { key: 'users', icon: <UsergroupAddOutlined />, label: 'Users' },
    {
        key: '2', label: 'Users', icon: <UserOutlined />
    },
    {
        key: '3', label: 'Todos', icon: <UsergroupAddOutlined />,
        children: [
            { key: '3.1', label: <Link to={`${root}/todos`}>All Todo</Link>, icon: <PieChartOutlined />},
            { key: '3.2', label: <Link to={`${root}/todos/add`}>Add Todo</Link>, icon: <PlusOutlined />},
        ],
    },
    { key: '4', label: 'Setting', icon: <SettingOutlined /> }

]

export { items }