import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import React, {useEffect, useState} from 'react';
import {authAxios} from '../../services/httpServices'
import MaterialTable from "material-table";
const { default: Header } = require("components/Headers/Header")

const FeedBackAttendances = (props) => {
    const [attendances,setAttendances] = useState([])
    const [branch, setBranch] = useState('')
    const [branches, setBranches] = useState([])

  useEffect(() => {
    async function getAttendances(){
        const {data} = await authAxios.get('marketing/feedback/')
        const {data:branches} = await authAxios.get('management/branches')
        setAttendances(data)
        setBranches(branches)
    }
    getAttendances();
  }, [])



  const columns= [
      {
          label: 'Name',
          field: 'name',
          sort: 'asc',
          width: 150  
      },
      {  
          label: 'Contact',
          field: 'contact',
          sort: 'asc',
          width: 150  
      },
      {
          label: 'Branch',
          field: 'branch',
          sort: 'asc',
          width: 150  
      },
      {
          label: 'Date',
          field: 'date',
          sort: 'asc',
          width: 150  
      },
      {
        label: 'Action',
        field: 'feedbackIcon',
        sort: 'asc',
        width: 150  
    },
  ]
  const data= attendances.map(attendant => (
      {
          'name': attendant.name,
          'contact':attendant.contact, 
          'branch': attendant.branch,
          'date': attendant.date, 
          'feedbackIcon':'Yes'
            //   attendant.feedback_status=== false ? <Link to={`feedback/${attendant.feedback}`}>
            //       <CButton color="info" >
            //           <CIcon icon={cilPhone} /> Take Feedback
            //       </CButton>
            //   </Link> :
            //   'Feedback has already been taken'
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
                            <h3 className="mb-0">Layout</h3>
                        </CardHeader> */}
                        <CardBody>
                        <MaterialTable 
                            title="FeedBack Calls To Be Made"
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
 
export default FeedBackAttendances