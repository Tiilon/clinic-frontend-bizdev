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
import Register from "views/examples/Register.js";
import Logout from "app/components/Logout";
import Login from "app/components/Login"
import Dashboard from "app/components/body/Dashboard"
import Branches from "app/components/body/Branches"
import Report from "app/components/body/Reports"
import Staff from "app/components/body/Staff";
import Attendances from "app/components/body/Attendances"
import FeedbackForm from "app/components/body/FeedbackForm"
import PatientList from "app/components/body/PatientsList";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/branches",
    name: "Branches",
    icon: "ni ni-building text-blue",
    component: Branches,
    layout: "/admin",
  },
  {
    path: "/staff",
    name: "Staff",
    icon: "ni ni-single-02 text-primary",
    component: Staff,
    layout: "/admin",
  },
  {
    path: "/patient",
    name: "Patient List",
    icon: "ni ni-single-02 text-primary",
    component: PatientList,
    layout: "/admin",
  },
  {
    path: "/feedback/:id",
    name: "Feedback Data",
    icon: "fas fa-comment-alt text-primary",
    component: FeedbackForm,
    layout: "/admin",
  },
  {
    path: "/reports",
    name: "Reports",
    icon: "fas fa-chart-bar text-primary",
    component: Report,
    layout: "/admin",
  },
  {
    path: "/attendances",
    name: "Attendances",
    icon: "fas fa-chart-bar text-primary",
    component: Attendances,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "ni ni-key-25 text-info",
    component: Logout,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
];
export default routes;
