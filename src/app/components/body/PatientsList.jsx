import { Container, Row, Card, CardBody } from "reactstrap";
import React, {useEffect, useState} from 'react';
import MaterialTable from "material-table";
import {authAxios} from '../../services/httpServices'

const { default: Header } = require("components/Headers/Header")

const PatientList = (props) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function getData(){
          const {data:users} = await authAxios.get('hospital/patients/')
          setUsers(users)
        }
        
        getData()
    },[])

    let options = {year: 'numeric', month: 'long', day: 'numeric' };

    const columns= [
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
            title: 'Contact',
            field: 'contact',
        },
        {
            title: 'Date Joined',
            field: 'date_joined',
        },
    ]

    const data= users.map(use => (
        {
            first_name: use.first_name,
            last_name: use.last_name,
            gender: use.gender,
            contact: use.contact,
            date_joined: new Date(use.created_at).toLocaleDateString("en-US", options),
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
 
export default PatientList