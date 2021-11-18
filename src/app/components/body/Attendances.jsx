import { Container, Row, Card, CardHeader, CardBody, Button } from "reactstrap";
import React, {useEffect, useState} from 'react';
import MaterialTable from "material-table";
import {authAxios} from '../../services/httpServices'
import {Link} from 'react-router-dom'

const { default: Header } = require("components/Headers/Header")

const Attendances = (props) => {
    const [attendances,setAttendances] = useState([])
  
    useEffect(() => {
      async function getAttendances(){
          const {data} = await authAxios.get('marketing/feedback/')
        //   const {data:branches} = await authAxios.get('management/branches')
          setAttendances(data)
      }
      getAttendances();
    }, [])
    
    const columns= [
        {
            title: 'Name',
            field: 'name',
        },
        {
            title: 'Contact',
            field: 'contact',
        },
        {
            title: 'Branch',
            field: 'branch',
        },
        {
            title: 'Date',
            field: 'date',
        },
        {
            title: 'Action',
            field: 'action',
        },
    ]

    const data= attendances.map(attendance => (
        {
            name: attendance.name,
            contact: attendance.contact,
            branch: attendance.branch,
            date: attendance.date,
            action: 
            attendance.feedback_status=== false ? <Link to={`feedback/${attendance.feedback}`}>
                  <Button color="info" >
                    <i className="fas fa-comment-alt"></i>  Take Feedback
                  </Button>
              </Link> :
              'Feedback has already been taken',
        }
    ))
    return ( 
        <>
            <Header/>
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                        <CardHeader className="bg-transparent">
                            {/* <h3 className="mb-0">Weekly Patient Attendance</h3> */}
                        </CardHeader>
                        <CardBody>
                        <MaterialTable 
                            title="Attendances"
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
 
export default Attendances