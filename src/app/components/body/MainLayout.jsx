import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import React, {useEffect, useState} from 'react';
import MaterialTable from "material-table";
import {authAxios} from '../../services/httpServices'

const { default: Header } = require("components/Headers/Header")

const Layout = (props) => {
   
    
    return ( 
        <>
            <Header/>
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                        <CardHeader className="bg-transparent">
                            <h3 className="mb-0">Layout</h3>
                        </CardHeader>
                        <CardBody>
                            <h1>Hi</h1>
                        </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>   
        </>
        );
}
 
export default Layout