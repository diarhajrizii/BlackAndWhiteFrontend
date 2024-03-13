import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
// import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
// import Rtl from "views/Rtl.js";
import TableList from "views/TableList.js";
// import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";
import AddProducts from "views/AddProducts.js";
import CMSPanel from "views/CmsPanels.js";
import ProductsList from "views/ProductsList";
import SalesPage from "views/Sales";
import AdministrationPanel from "views/AdministrationPanel";
import LogIn from "views/LogIn";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/admin",
    authentication: true,
  },
  {
    path: "/sales",
    name: "Sales",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-paper",
    component: <SalesPage />,
    layout: "/admin",
    authentication: true,
  },
  // {
  //   path: "/products",
  //   name: "Products",
  //   rtlName: "لوحة القيادة",
  //   icon: "tim-icons icon-bag-16",
  //   component: <Products />,
  //   layout: "/admin",
  // subItems: [
  //   {
  //     path: "/add/products",
  //     name: "Add Products",
  //     rtlName: "لوحة القيادة",
  //     icon: "tim-icons icon-chart-pie-36",
  //     component: <AddProducts />,
  //     layout: "/admin",
  //   },
  //   {
  //     path: "/edit/products",
  //     name: "Edit Products",
  //     rtlName: "لوحة القيادة",
  //     icon: "tim-icons icon-chart-pie-36",
  //     component: <AddProducts />,
  //     layout: "/admin",
  //   },
  //   // Add/Edit/Delete Product items here...
  // ],
  // },
  {
    path: "/add/products",
    name: "Add Products",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: <AddProducts />,
    layout: "/admin",
    authentication: true,
  },

  {
    path: "/products",
    name: "Products",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-bag-16",
    component: <ProductsList />,
    layout: "/admin",
    authentication: true,
  },

  {
    path: "/cms",
    name: "CMS Panels",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: <CMSPanel />,
    layout: "/admin",
    authentication: true,
  },

  {
    path: "/settings",
    name: "Administration",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-settings-gear-63",
    component: <AdministrationPanel />,
    layout: "/admin",
    authentication: true,
  },

  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: "tim-icons icon-atom",
    component: <Icons />,
    layout: "/admin",
    authentication: true,
  },
  // {
  //   path: "/map",
  //   name: "Map",
  //   rtlName: "خرائط",
  //   icon: "tim-icons icon-pin",
  //   component: <Map />,
  //   // redirect: true,
  //   layout: "/admin",
  // },

  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: "tim-icons icon-bell-55",
    component: <Notifications />,
    layout: "/admin",
    authentication: true,
  },
  {
    path: "/user-profile",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: <UserProfile />,
    authentication: false,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Log In",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: <LogIn />,
    redirect: true,
    layout: "/admin",
    authentication: false,
  },
  {
    path: "/tables",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: <TableList />,
    layout: "/admin",
  },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "طباعة",
  //   icon: "tim-icons icon-align-center",
  //   component: <Typography />,
  //   // redirect: true,
  //   layout: "/admin",
  // },
  // {
  //   path: "/rtl-support",
  //   name: "RTL Support",
  //   rtlName: "ار تي ال",
  //   icon: "tim-icons icon-world",
  //   component: <Rtl />,
  //   // redirect: true,
  //   layout: "/rtl",
  // },
];
export default routes;
