import { DashboardOutlined, SettingOutlined, MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined, UploadOutlined, UsergroupAddOutlined, UserOutlined, VideoCameraOutlined, PieChartOutlined, HomeFilled, HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const root = "/dashboard"

const items = [
    {
        key: '1', label: <Link to={`${root}`}>Dashboard</Link>, icon: <PieChartOutlined />,
    },
    {
        key: '2', label: 'Home', icon: <HomeOutlined />,
    },
    // { key: 'users', icon: <UsergroupAddOutlined />, label: 'Users' },
    {
        key: '3', label: 'Users', icon: <UserOutlined />
    },
    {
        key: '4', label: 'Todos', icon: <UsergroupAddOutlined />,
        children: [
            { key: '4.1', label: <Link to={`${root}/todos/all`}>All Todo</Link>, icon: <PieChartOutlined />},
            { key: '4.2', label: <Link to={`${root}/todos/add`}>Add Todo</Link>, icon: <PlusOutlined />},
        ],
    },
    { key: '5', label: 'Setting', icon: <SettingOutlined /> }

]

export { items }