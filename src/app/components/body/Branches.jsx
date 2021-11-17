import { Container, Row, Card, CardBody} from "reactstrap";
import React, {useEffect, useState} from 'react';
import MaterialTable from "material-table";
import {authAxios} from '../../services/httpServices'

const { default: Header } = require("components/Headers/Header")

const Branches = (props) => {
    const [branches, setBranches] = useState([])
    
    useEffect(() => {
        async function getBranches(){
          const {data} = await authAxios.get('management/branches')
          setBranches(data)
        }
        getBranches()
    },[])

    // const submit = async (e) => {
    //     e.preventDefault()
    //     try{
    //         const res = await authAxios.post("management/branches/", {
    //             'name': name
    //         });
    //         if(res.data.error){
    //             setError(res.data.error)
    //         }else{
    //             window.location = '/branches';
    //         }
            
    //     }catch (ex) {
    //         if (ex.response && ex.response.status === 400){
    //             console.log(ex.response.data)
    //             setError(ex.response.data)
    //         }
    //     }
    // }

    // const  deleteBranch = async (id) => {
    //     await authAxios.post(`management/delete-branch/${id}/`)
    //     window.location.reload()
    // }

    const columns = [
        {
            title: 'Name',
            field: 'name',
          },
          {
            title: 'Number of Staff',
            field: 'nos',
          },
        //   {
        //     title: 'Action',
        //     field: 'action',
        //   },
    ];

    const data = branches.map(branch => (
        {
        name: branch.name,
        nos: branch.staffs,
        // action: <Button color='danger' onClick={(e)=>(deleteBranch(branch.id))}>Delete</Button>,
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
                        Branches
                        </CardHeader> */}
                        <CardBody>
                        
                        <MaterialTable 
                            title="Branches"
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
 
export default Branches;