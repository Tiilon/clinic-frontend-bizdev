import Maps from "views/examples/Maps.js";
import Dashboard from "app/components/body/Dashboard"
import Branches from "app/components/body/Branches"
import Report from "app/components/body/Reports"
import Attendances from "app/components/body/Attendances"
import PatientList from "app/components/body/PatientsList";

var items = [
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
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/patient",
    name: "Client List",
    icon: "ni ni-single-02 text-primary",
    component: PatientList,
    layout: "/admin",
  },
  {
    path: "/attendances",
    name: "Attendances",
    icon: "fas fa-hospital-user text-primary",
    component: Attendances,
    layout: "/admin",
  },
  {
    path: "/reports",
    name: "Reports",
    icon: "fas fa-chart-bar text-primary",
    component: Report,
    layout: "/admin",
  },
];
export default items;
