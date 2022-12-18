import './App.css';
import 'antd/dist/reset.css';
import {deleteStudent, getAllStudents} from "./client";
import {useEffect, useState} from "react";
import {Avatar, Badge, Breadcrumb, Button, Empty, Layout, Menu, Popconfirm, Spin, Table, Tag} from 'antd';
import {
    DesktopOutlined,
    FileOutlined,
    LoadingOutlined,
    PieChartOutlined,
    PlusOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import StudentDrawerForm from "./StudentDrawerForm";
import {errorNotification, successNotification} from "./Notification";


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
const TheAvatar = ({name}) => {
    if (name.trim().length === 0) {
        return <Avatar icon={<UserOutlined/>}/>
    }
    const split = name.trim().split(" ")
    if (split.length === 1) {
        return <Avatar>{name.charAt(0)}</Avatar>
    }
    return <Avatar>{`${name.charAt(0)}${name.charAt(name.length - 1)}`}</Avatar>

}


const deleteContent = (name) => {
    console.log(name)
    return (
        <div>
            <p>you want to delete student {name}</p>
        </div>
    )
};
const removeStudent = async (id, fetchStudents) => {
    deleteStudent(id).then(async () => {
            await fetchStudents()
            successNotification("Student deleted", "student deleted")
        }
    )

}
const columns = (fetchStudents) => [
        {
            title: '',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text, student) => <TheAvatar name={student.name}/>

        },
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
        }, ,
        {
            title: "Actions",
            dataIndex: 'actions',
            key: "name",
            render: (text, student) => (<>
                <Popconfirm
                    content={deleteContent(student.name)}
                    title={`Do you want to delete the student ${student.name}`}
                >
                    <Button type="primary" style={{marginRight: "10px"}}>Edit</Button>
                </Popconfirm>
                <Popconfirm
                    content={deleteContent(student.name)}
                    title={`Do you want to delete the student ${student.name}`}
                    onConfirm={() => {
                        console.log("on confirm", fetchStudents)
                        return removeStudent(student.id, fetchStudents)
                    }
                    }
                >
                    <Button type="primary" danger onClick={() => {
                        removeStudent(student.id)
                    }}>delete</Button>
                </Popconfirm>
            </>)
        }
    ]
;
const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

function App() {
    const [collapsed, setCollapsed] = useState(false);
    const [students, setStudents] = useState([])
    const [fetching, setFetching] = useState(true)
    const [showDrawer, setShowDrawer] = useState(false)
    const fetchStudents = async () => await getAllStudents()
        .then(
            data => {
                console.log("data", data)
                setStudents(data)
                setFetching(false)
            })
        .catch(err => {
            err.response.json().then(
                data=>{
                     errorNotification("there were an issue", data.message)
        })
        }).finally(()=>setFetching(false))

    const renderStudents = () => {
        if (fetching) {
            return <Spin indicator={antIcon}/>
        }
        if (students.length <= 0) {
            return <>
                <Button
                    onClick={() => setShowDrawer(!showDrawer)}
                    type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                    Add New Student
                </Button>
                <StudentDrawerForm
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    fetchStudents={fetchStudents}
                />
                <Empty/>
            </>
        }
        return (
            <>
                <StudentDrawerForm
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    fetchStudents={fetchStudents}
                />
                <Table
                    on
                    columns={columns(fetchStudents)}
                    dataSource={students}
                    bordered
                    title={() =>
                        <>
                            <Tag style={{marginLeft: "10px"}}>Number of students</Tag>
                            <Badge count={students.length} className="site-badge-count-4"/>
                            <br/><br/>
                            <Button
                                onClick={() => setShowDrawer(!showDrawer)}
                                type="primary" shape="round" icon={<PlusOutlined/>} size="large">
                                Add New Student
                            </Button>
                        </>}
                    pagination={{pageSize: 50}}
                    scroll={{y: 500}}
                    rowKey={(student) => student.id}
                />
            </>)

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
