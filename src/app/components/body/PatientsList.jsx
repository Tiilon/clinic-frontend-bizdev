import { Container, Row, Card, CardBody,Button, CardHeader } from "reactstrap";
import React, {useEffect, useState} from 'react';
import MaterialTable from "material-table";
import {authAxios} from '../../services/httpServices'

const { default: Header } = require("components/Headers/Header")

const PatientList = (props) => {
    const [users, setUsers] = useState([])
    const [error, setError] = useState('')

    const submitAttendance = async (id) => {

        try{
            const res = await authAxios.post(`hospital/attendance/${id}/`, {});
            if(res.data.error){
                setError(res.data.error)           
            }else{
                // window.location = `/patient/${id}`;
                window.location = `/patient`;
                // props.history.push = `/patient/${id}`;
            }
            
        }catch (ex) {
            // if (ex.response && ex.response.status === 400){
            //     console.log(ex.response.data)
            //     setError(ex.response.data)
            // }
            console.log(ex)
        }
      }
    
      const submitAttendanceWalkIn = async (id) => {
        
        try{
            const res = await authAxios.post(`hospital/attendance/${id}/`, {'walk_in':'walk_in'});
            if(res.data.error){
                setError(res.data.error)           
            }else{
                // window.location = `/patient/${id}`;
                window.location = `/patient`;
                // props.history.push = `/patient/${id}`;
            }
            
        }catch (ex) {
            // if (ex.response && ex.response.status === 400){
            //     console.log(ex.response.data)
            //     setError(ex.response.data)
            // }
            console.log(ex)
        }
      }

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
        {
            title: 'Action',
            field: 'action',
        },
    ]

    const data= users.map(use => (
        {
            first_name: use.first_name,
            last_name: use.last_name,
            gender: use.gender,
            contact: use.contact,
            date_joined: new Date(use.created_at).toLocaleDateString("en-US", options),
            action: 
            <div >
            <Button className="m-1" color='info' onClick={()=>submitAttendanceWalkIn(use.patient_id)}>Direct Service</Button>
            <Button color='info' onClick={()=>submitAttendance(use.patient_id)}>Consultation</Button>
            </div>
        }
    ))
   
    
    return ( 
        <>
            <Header/>
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                        {error && 
                        <CardHeader className="bg-transparent">
                            <h1>{error}</h1>
                        </CardHeader>
                        }
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