import {
    chartOptions,
    parseOptions,
  } from "variables/charts.js";
  import React, {useEffect, useState} from 'react';
  import {authAxios} from '../../services/httpServices'
  // node.js library that concatenates classes (strings)
  import classnames from "classnames";
  // javascipt plugin for creating charts
  import Chart from "chart.js";
  // react plugin used to create charts
  import { Line } from "react-chartjs-2";
  // reactstrap components
  import {
    Card,
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    Row,
  } from "reactstrap";


const DashboardChart = (props) => {

    const [activeNav, setActiveNav] = useState(1);
    const [chartExample1Data, setChartExample1Data] = useState("data1");
    const [weeklyChartData, setWeeklyChartData] = useState([])
    const [monthlyChartData, setMonthlyChartData] = useState([])

    useEffect(() => {
        async function getData(){
            const {data} = await authAxios.get(`marketing/dashboard`)
            setWeeklyChartData(data.weekly_data)
            setMonthlyChartData(data.monthly_data)
        }
        getData();
      }, [])

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  var colors = {
    gray: {
      100: "#f6f9fc",
      200: "#e9ecef",
      300: "#dee2e6",
      400: "#ced4da",
      500: "#adb5bd",
      600: "#8898aa",
      700: "#525f7f",
      800: "#32325d",
      900: "#212529",
    },
    theme: {
      default: "#172b4d",
      primary: "#5e72e4",
      secondary: "#f4f5f7",
      info: "#11cdef",
      success: "#2dce89",
      danger: "#f5365c",
      warning: "#fb6340",
    },
    black: "#12263F",
    white: "#FFFFFF",
    transparent: "transparent",
  };

    const chartExample1 = {
        options: {
          scales: {
            yAxes: [
              {
                gridLines: {
                  color: colors.gray[900],
                  zeroLineColor: colors.gray[900],
                },
                ticks: {
                  callback: function (value) {
                    if (!(value % 10)) {
                      return value ;
                    }
                  },
                },
              },
            ],
          },
          tooltips: {
            callbacks: {
              label: function (item, data) {
                var label = data.datasets[item.datasetIndex].label || "";
                var yLabel = item.yLabel;
                var content = "";
      
                if (data.datasets.length > 1) {
                  content += label;
                }
      
                content += yLabel;
                return content;
              },
            },
          },
        },
        data1: (canvas) => {
          return {
            labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            datasets: [
              {
                label: "Attendances",
                data: monthlyChartData,
              },
            ],
          };
        },
        data2: (canvas) => {
          return {
            labels: ['Mon','Tue','Wed','Thur','Fri','Sat','Sun'],
            datasets: [
              {
                label: "Attendances",
                data: weeklyChartData,
              },
            ],
          };
        },
      };

    return ( 
        <>
        <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Attendance Overview
                    </h6>
                    <h2 className="text-white mb-0">Number Of Attendances </h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          
        </>
     );
}
 
export default DashboardChart;