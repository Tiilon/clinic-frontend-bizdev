import { Container, Row, Col, Card, CardHeader, CardBody, Button, Table } from "reactstrap";
import React, {useEffect, useState} from 'react';
import {authAxios} from '../../services/httpServices'
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,PieChart,Pie
  } from 'recharts';
const { default: Header } = require("components/Headers/Header")

const Report = (props) => {

    const [patient_count,setPatientCount] = useState([])
    const [pieChart,setPieChart] = useState([])
    const [totalPatCount, setTotalPatCount] = useState([])
    const [reportSummary, setReportSummary] = useState([])
    const [showReportYear, setShowReportYear] = useState(false)
    const [weekList, setWeekList] = useState([])
    const [week, setWeek] = useState('')

    const fetchReport = async () => {
        const {data} = await authAxios.post('marketing/analyses/', {
          'date':week
        })
        setPatientCount(data.patient_count)
        setPieChart(data.pie_chart)
        setTotalPatCount(data.total_patient_count_data)
        setReportSummary(data.report_summary)
      }
    
      useEffect(() => {
        async function getPatientCountData() {
          const {data} = await authAxios.get('marketing/analyses/')
          const {data:reports} = await authAxios.get('marketing/reports/')
          setWeekList(reports.week_list)
          setPatientCount(data.patient_count)
          setPieChart(data.pie_chart)
          setTotalPatCount(data.total_patient_count_data)
          setReportSummary(data.report_summary)
        }
        getPatientCountData()
      }, [])
    
      const showInput = (object) => {
        return setShowReportYear(true ? object=true : false)
      }
      let options = {year: 'numeric', month: 'long', day: 'numeric' };
      const COLORS = ['#82ca9d', '#8884d8', '#FFBB28', '#FF8042'];
    
    return ( 
        <>
            <Header/>
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                        <CardHeader className="bg-transparent">
                            <div className="row">
                            {showReportYear && 
                            <>
                                <div className="col-3">
                                    <select class="form-control" onChange={(e)=>setWeek(e.target.value)}>
                                        <option value='current'>Current Week</option>
                                        {weekList.map(g =>
                                            <option value={g.week[0]} key={g.number}>Week {g.number} - From {new Date(g.week[0]).toLocaleDateString("en-US", options)} to {new Date(g.week[1]).toLocaleDateString("en-US", options)}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="col">
                                    <Button color='info' onClick={()=>fetchReport()}><i class="fas fa-check"></i></Button>
                                    <Button color='danger' onClick={()=>setShowReportYear(false)}>X</Button>
                                </div>
                                </>
                                }
                                {!showReportYear && <div className="col">
                                <Button color='danger' onClick={(showReportYear)=>showInput(showReportYear)}>Retrieve Report</Button>
                                </div>}
                            </div>
                                
                        </CardHeader>
                        <CardBody>
                            <Row>
                            <Col className="mb-5 mb-xl-0" xl="12">
                                <Card className="shadow">
                                {/* <CardHeader className="border-0">
                                    <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="mb-0">Page visits</h3>
                                    </div>
                                    <div className="col text-right">
                                        <Button
                                        color="primary"
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                        size="sm"
                                        >
                                        See all
                                        </Button>
                                    </div>
                                    </Row>
                                </CardHeader> */}
                                <Table className="align-items-center table-flush mb-2" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Branch</th>
                                            <th scope="col">Total Visits</th>
                                            <th scope="col">First Time Visits</th>
                                            <th scope="col">Patience Reached</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {reportSummary.map(report =>
                                    <tr>
                                        <th scope="row">{report.branch}</th>
                                        <td>{report.total_visits}</td>
                                        <td>{report.first_time}</td>
                                        <td>{report.patients_reached}</td>
                                    </tr>
                                    )}
                                    </tbody>
                                </Table>
                                </Card>
                            </Col>
                            </Row>
                            <hr />
                            <div class="row">
                                <div class='col-md-12 col-xl-8'>
                                    <h3>Patient's Satisfaction Level - Branch Per Branch</h3>
                                    <BarChart
                                        width={1500}
                                        height={400}
                                        data={patient_count}
                                        margin={{
                                        top: 5, right: 30, left: 20, bottom: 5,
                                        }}
                                    >
                                        <Legend layout="horizontal" verticalAlign="top" align="center" />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="satisfied" fill="#8884d8" />
                                        <Bar dataKey="unsatisfied" fill="#82ca9d" />
                                    </BarChart>
                                </div>
                            </div>
                            <hr />
                            <div class="row">
                                <div class='col-12'>
                                    <h3>Patient Count Comparison Week On Week (Branches)</h3>
                                    <BarChart
                                        width={1500}
                                        height={400}
                                        data={patient_count}
                                        margin={{
                                        top: 5, right: 30, left: 20, bottom: 5,
                                        }}
                                    >
                                        <Legend layout="horizontal" verticalAlign="top" align="center" />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="previous" fill="#8884d8" />
                                        <Bar dataKey="current" fill="#82ca9d" />
                                    </BarChart>
                                </div>  
                            </div>
                            <hr />
                            <div class="row">
                                <div class='col-6'>
                                <h3>Overall Patient Count Comparison Week On Week</h3>
                                <BarChart
                                    width={700}
                                    height={400}
                                    data={totalPatCount}
                                    margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                    }}
                                >
                                    <Legend layout="horizontal" verticalAlign="top" align="center" />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="previous" fill="#8884d8" />
                                    <Bar dataKey="current" fill="#82ca9d" />
                                </BarChart>
                                </div>
                                <div class='col-6'>
                                <h3>Overall Patient Satisfaction Level - Percentage Split</h3>

                                <PieChart width={500} height={400}>
                                <Legend layout="horizontal" verticalAlign="top" align="center" />
                                    
                                    <Pie 
                                    data={pieChart} 
                                    dataKey="value" 
                                    nameKey="name" 
                                    cx="50%" 
                                    cy="50%" 
                                    innerRadius={60} 
                                    fill="#82ca9d" 
                                    label
                                    // label={renderLabel}
                                    >
                                        {
                                        pieChart.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                        }
                                    </Pie>
                                </PieChart>
                                </div>    
                            </div>
                            <hr />
                        </CardBody>
                        </Card>
                        <Card className='mt-2'>
                            <CardHeader>
                            <h3 className='text-primary'><strong>HIGHLIGHTS ( Branch by Branch )</strong></h3>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col md={12} className='mb-5'>
                                        <Table className="align-items-center table-flush" responsive >
                                            <thead className="thead-light">
                                                <tr>
                                                    <th scope="col">Branch</th>
                                                    <th scope="col">Total Patient Count</th>
                                                    <th scope="col">Excellent</th>
                                                    <th scope="col">Very Good</th>
                                                    <th scope="col">Good</th>
                                                    <th scope="col">Fair</th>
                                                    <th scope="col">Bad</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {reportSummary.map(report =>
                                            <tr>
                                                <th scope="row">{report.branch}</th>
                                                <td>{report.current_patient_count} - Previous Count ({report.previous_patient_count})</td>
                                                <td>{report.excellent_feedback.toFixed(1)}% - ({report.excellent_comment})</td>
                                                <td>{report.very_good_feedback.toFixed(1)}% - ({report.very_good_comment})</td>
                                                <td>{report.good_feedback.toFixed(1)}% - ({report.good_comment})</td>
                                                <td>{report.fair_feedback.toFixed(1)}% - ({report.fair_comment})</td>
                                                <td>{report.bad_feedback.toFixed(1)}% - ({report.bad_comment})</td>
                                            </tr>
                                            )}
                                            </tbody>
                                        </Table>
                                    </Col>
                                <hr />
                                </Row>
                            </CardBody>
                        </Card>
                    </div>
                </Row>
                <Row>
                    <Col md={12} className='mt-3'>
                    <h3 className='text-primary'><strong>FeedBack Comments</strong></h3>
                        {reportSummary.map(report => 
                            report.feedback_comments.map(fb => fb ?
                                <div className="table-responsive">
                                    <table className="table align-items-center">
                                        <thead>
                                            <th className="align-items-center"><h4><strong>Branch</strong></h4></th>
                                            <th className="align-items-center"><h4><strong>Patient</strong></h4></th>
                                            <th className="align-items-center"><h4><strong>Comment</strong></h4></th>
                                        </thead>
                                        <tbody className="list">
                                            <tr>
                                                <td>
                                                <strong>{fb.branch}</strong>
                                                </td>
                                                <td>
                                                <strong>{fb.patient}</strong>
                                                </td>
                                                <td>
                                                <strong>{fb.comment}</strong>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div> :
                                'There is no Data to Show'
                            ))}
                    </Col>
                </Row>
            </Container>   
        </>
        );
}
 
export default Report