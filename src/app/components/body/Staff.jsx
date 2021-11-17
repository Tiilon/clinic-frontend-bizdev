import { Container, Row, Card, CardBody } from "reactstrap";
import React, {useEffect, useState} from 'react';
import MaterialTable from "material-table";
import {authAxios} from '../../services/httpServices'

const { default: Header } = require("components/Headers/Header")

const Staff = (props) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function getData(){
          const {data:users} = await authAxios.get('management/user/')
          setUsers(users)
        }
        
        getData()
    },[])

    const columns= [
        {
            title: '',
            field: 'profile',
        },
        {
            title: 'First Name',
            field: 'first_name',
        },
        {
            title: 'Last Name',
            field: 'last_name',
        },
        {
            title: 'Gender',
            field: 'gender',
        },
        {
            title: 'Role',
            field: 'role',
        },
        {
            title: 'Contact',
            field: 'contact',
        },
        {
            title: 'Email',
            field: 'email',
        },
        {
            title: 'Branch',
            field: 'branch',
        },
        {
            title: 'Date Joined',
            field: 'date_joined',
        },
    ]

    const data= users.map(use => (
        {
            profile: 
            <span className="avatar avatar-lg rounded-circle">
                <img
                alt="..."
                src={use.profile ? use.profile : '../assets/img/theme/team-4-800x800.jpg'}
                height='100%'
                width='100%'
                />
            </span>,
            first_name: use.first_name,
            last_name: use.last_name,
            gender: use.gender,
            role: use.role,
            contact: use.contact,
            email: use.email,
            branch: use.branch_code===null ? 'N/A' : use.branch,
            date_joined: use.date_joined,
            
        }
    ))
   
    
    return ( 
        <>
            <Header/>
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                        {/* <CardHeader className="bg-transparent">
                            <h3 className="mb-0">Staff</h3>
                        </CardHeader> */}
                        <CardBody>
                        <MaterialTable 
                            title="Staff"
                            data={data}
                            columns={columns}
                            options={{
                                exportButton:true
                            }}
                            />
                        </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>   
        </>
        );
}
 
export default Staff