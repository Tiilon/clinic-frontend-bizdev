import { Container, Row, Button, Card, CardHeader, CardBody,Form,FormGroup,Input,Label } from "reactstrap";
import React, {useEffect, useState} from 'react';
import {authAxios} from '../../services/httpServices'
import RadioInput from "../RadioInput";

const { default: Header } = require("components/Headers/Header")

const FeedbackForm = (props) => {
   
    const [reception, setReception] = useState(0)
    const [nurse, setNurse] = useState(0)
    const [doctor, setDoctor] = useState(0)
    const [lab, setLab] = useState(0)
    const [pharmacy, setPharmacy] = useState(0)
    const [overall, setOverall] = useState(0)
    const [cashier, setCashier] = useState(0)
    const [houseKeeper, setHouseKeeper] = useState(0)
    const [bestStaff, setBestStaff] = useState('')
    const [opinion, setOpinion] = useState('')
    const [referal, setReferal] = useState('')
    const [details, setDetails] = useState('')

    const id = props.match.params.id

    useEffect(() => {
        async function getDetails(){
            const {data} = await authAxios.get(`marketing/feedback/${id}`)
            setDetails(data)
        }
        getDetails();
      }, [id])
    
      const submitFeedBack = async () => {
          await authAxios.put(`marketing/feedback/${id}/`, {
            'reception' : reception,
            'nurse' : nurse,
            'doctor' : doctor,
            'lab' : lab,
            'pharmacy' : pharmacy,
            'cashier' : cashier,
            'house_keeper' : houseKeeper,
            'overall' : overall,
            'opinion' : opinion,
            'best_staff' : bestStaff,
            'referal': referal,
          })
          window.location ="/fbattendances/"
          // props.history.push("/fbattendances/")
      }
    
    
    return ( 
        <>
            <Header/>
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                        <CardHeader className="bg-transparent">
                            <h3 className="mb-0">Feedback form for {details.patient}'s visit on the {details.date}</h3>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="row">
                                            <div className="col-6">
                                                <div>
                                                    Reception
                                                    <div className="row ml-1">
                                                        <RadioInput tag='reception' value={1} onChange={(e)=>setReception(parseInt(e.target.value))}/>
                                                        <RadioInput tag='reception' value={2} onChange={(e)=>setReception(parseInt(e.target.value))}/>
                                                        <RadioInput tag='reception' value={3} onChange={(e)=>setReception(parseInt(e.target.value))}/>
                                                        <RadioInput tag='reception' value={4} onChange={(e)=>setReception(parseInt(e.target.value))}/>
                                                        <RadioInput tag='reception' value={5} onChange={(e)=>setReception(parseInt(e.target.value))}/> 
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div>
                                                    Nurse
                                                    <div className="row ml-1">
                                                        <RadioInput tag='nurse' value={1} onChange={(e)=>setNurse(parseInt(e.target.value))}/>
                                                        <RadioInput tag='nurse' value={2} onChange={(e)=>setNurse(parseInt(e.target.value))}/>
                                                        <RadioInput tag='nurse' value={3} onChange={(e)=>setNurse(parseInt(e.target.value))}/>
                                                        <RadioInput tag='nurse' value={4} onChange={(e)=>setNurse(parseInt(e.target.value))}/>
                                                        <RadioInput tag='nurse' value={5} onChange={(e)=>setNurse(parseInt(e.target.value))}/> 
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col-6">
                                                <div>
                                                    Doctor
                                                    <div className="row ml-1">
                                                        <RadioInput tag='doctor' value={1} onChange={(e)=>setDoctor(parseInt(e.target.value))}/>
                                                        <RadioInput tag='doctor' value={2} onChange={(e)=>setDoctor(parseInt(e.target.value))}/>
                                                        <RadioInput tag='doctor' value={3} onChange={(e)=>setDoctor(parseInt(e.target.value))}/>
                                                        <RadioInput tag='doctor' value={4} onChange={(e)=>setDoctor(parseInt(e.target.value))}/>
                                                        <RadioInput tag='doctor' value={5} onChange={(e)=>setDoctor(parseInt(e.target.value))}/> 
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div>
                                                    Lab
                                                    <div className="row ml-1">
                                                        <RadioInput tag='lab' value={1} onChange={(e)=>setLab(parseInt(e.target.value))}/>
                                                        <RadioInput tag='lab' value={2} onChange={(e)=>setLab(parseInt(e.target.value))}/>
                                                        <RadioInput tag='lab' value={3} onChange={(e)=>setLab(parseInt(e.target.value))}/>
                                                        <RadioInput tag='lab' value={4} onChange={(e)=>setLab(parseInt(e.target.value))}/>
                                                        <RadioInput tag='lab' value={5} onChange={(e)=>setLab(parseInt(e.target.value))}/> 
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col-6">
                                                <div>
                                                    Pharmacy
                                                    <div className="row ml-1">
                                                        <RadioInput tag='pharmacy' value={1} onChange={(e)=>setPharmacy(parseInt(e.target.value))}/>
                                                        <RadioInput tag='pharmacy' value={2} onChange={(e)=>setPharmacy(parseInt(e.target.value))}/>
                                                        <RadioInput tag='pharmacy' value={3} onChange={(e)=>setPharmacy(parseInt(e.target.value))}/>
                                                        <RadioInput tag='pharmacy' value={4} onChange={(e)=>setPharmacy(parseInt(e.target.value))}/>
                                                        <RadioInput tag='pharmacy' value={5} onChange={(e)=>setPharmacy(parseInt(e.target.value))}/> 
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div>
                                                    House Keeper
                                                    <div className="row ml-1">
                                                        <RadioInput tag='houseKeeper' value={1} onChange={(e)=>setHouseKeeper(parseInt(e.target.value))}/>
                                                        <RadioInput tag='houseKeeper' value={2} onChange={(e)=>setHouseKeeper(parseInt(e.target.value))}/>
                                                        <RadioInput tag='houseKeeper' value={3} onChange={(e)=>setHouseKeeper(parseInt(e.target.value))}/>
                                                        <RadioInput tag='houseKeeper' value={4} onChange={(e)=>setHouseKeeper(parseInt(e.target.value))}/>
                                                        <RadioInput tag='houseKeeper' value={5} onChange={(e)=>setHouseKeeper(parseInt(e.target.value))}/> 
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col-6">
                                                <div>
                                                    Cashier
                                                    <div className="row ml-1">
                                                        <RadioInput tag='cashier' value={1} onChange={(e)=>setCashier(parseInt(e.target.value))}/>
                                                        <RadioInput tag='cashier' value={2} onChange={(e)=>setCashier(parseInt(e.target.value))}/>
                                                        <RadioInput tag='cashier' value={3} onChange={(e)=>setCashier(parseInt(e.target.value))}/>
                                                        <RadioInput tag='cashier' value={4} onChange={(e)=>setCashier(parseInt(e.target.value))}/>
                                                        <RadioInput tag='cashier' value={5} onChange={(e)=>setCashier(parseInt(e.target.value))}/> 
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div>
                                                    Overall
                                                    <div className="row ml-1">
                                                        <RadioInput tag='overall' value={1} onChange={(e)=>setOverall(parseInt(e.target.value))}/>
                                                        <RadioInput tag='overall' value={2} onChange={(e)=>setOverall(parseInt(e.target.value))}/>
                                                        <RadioInput tag='overall' value={3} onChange={(e)=>setOverall(parseInt(e.target.value))}/>
                                                        <RadioInput tag='overall' value={4} onChange={(e)=>setOverall(parseInt(e.target.value))}/>
                                                        <RadioInput tag='overall' value={5} onChange={(e)=>setOverall(parseInt(e.target.value))}/> 
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br />  
                                        <FormGroup>
                                          <Label htmlFor='bestStaff'>Overall Best Staff</Label>
                                          <Input type="text" placeholder="Please Enter Overall Best Staff....." id='bestStaff' onChange={(e)=>setBestStaff(e.target.value)}/>
                                        </FormGroup>
                                    </div>
                                    <div className="col-6">
                                        <div>
                                            
                                            <FormGroup>
                                                <Label for="opinion">
                                                How Can We Do Better
                                                </Label>
                                                <Input
                                                id="opinion"
                                                type="textarea"
                                                onChange={(e)=>setOpinion(e.target.value)}
                                                />
                                            </FormGroup>
                                        </div>
                                        <div>
                                            <FormGroup>
                                                <Label for="referal">
                                                How did you here about Rabito
                                                </Label>
                                                <Input
                                                id="referal"
                                                type="textarea"
                                                onChange={(e)=>setReferal(e.target.value)}
                                                />
                                            </FormGroup>
                                        </div>
                                        <div className='mt-5'>
                                            <Button onClick={submitFeedBack} className="btn float-right mt-4" color='info'>
                                                <i class="far fa-paper-plane"></i> Submit
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>   
        </>
        );
}
 
export default FeedbackForm