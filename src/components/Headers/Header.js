/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import {useEffect, useState} from 'react'
import {authAxios} from '../../app/services/httpServices'


const Header = () => {

  const [totalVisits,setTotalVisits] = useState('')
  const [newVisits,setNewVisits] = useState('')
  const [subVisits,setSubVisits] = useState('')
  const [walkIns, setWalkIns] = useState('')
  // const [consultaion, setConsultaion] = useState('')
  const [newClientsPer, setNewClientsPer] = useState('')
  const [subClientsPer, setSubClientPer] = useState('')
  const [walkInPer, setWalkInPer] = useState('')
  // const [consultationPer, setConsultationPer] = useState('')

  useEffect(() => {
    async function getData(){
        const {data} = await authAxios.get(`marketing/dashboard`)
        setTotalVisits(data.total_visitors)
        setNewVisits(data.new_clients)
        setSubVisits(data.old_clients)
        setWalkIns(data.walk_ins)
        // setConsultaion(data.consultation_number)
        setNewClientsPer(data.new_clients_per)
        setSubClientPer(data.sub_clients_per)
        setWalkInPer(data.walk_in_number_per)
        // setConsultationPer(data.consultaion_number_per)
    }
    getData();
  }, [])

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Visits
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {totalVisits}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                         100%
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          New Visits
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{newVisits}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                        <i class="fas fa-user-plus"></i>
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        {newClientsPer}%
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Old Clients
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{subVisits}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        {subClientsPer}%
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Walk Ins
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{walkIns}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                        <i class="fas fa-shoe-prints"></i>
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        {walkInPer}%
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
