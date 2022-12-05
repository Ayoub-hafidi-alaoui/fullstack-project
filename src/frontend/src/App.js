import './App.css';
import 'antd/dist/reset.css';
import {getAllStudents} from "./client";
import {useEffect, useState} from "react";
import {Breadcrumb, Empty, Layout, Menu, Spin, Table} from 'antd';
import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined,} from '@ant-design/icons';
import { LoadingOutlined } from '@ant-design/icons';



const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Option 1', '1', <PieChartOutlined/>),
    getItem('Option 2', '2', <DesktopOutlined/>),
    getItem('User', 'sub1', <UserOutlined/>, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined/>, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined/>),
];

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
];
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function App() {
    const [collapsed, setCollapsed] = useState(false);
    const [students, setStudents] = useState([])
    const [fetching, setFetching] = useState(true)
    const fetchStudents = async () => await getAllStudents()
        .then(
        data => {
            setStudents(data)
            setFetching(false)
        })

    const renderStudents = () => {
        if(fetching) {
            return <Spin indicator={antIcon}/>
        }
        if(students.length <=0) {
           return  <Empty/>
        }
        return <Table
            columns={columns}
            dataSource={students}
            bordered
            title={() => "students"}
            pagination={{pageSize: 50}}
            scroll={{y: 240}}
            rowKey={(student) => student.id}
            />
    }


    useEffect(() => {
        fetchStudents()
        console.log(students)
    }, [])


    return (

        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="logo"/>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{padding: 0}}/>
                <Content style={{margin: '0 16px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                        {renderStudents()}
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}> By Ayoub Hafidi-Alaoui</Footer>
            </Layout>
        </Layout>
    )


}

export default App;
