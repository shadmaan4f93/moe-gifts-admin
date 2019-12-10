/*!

=========================================================
* Material Dashboard React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
//import Unarchive from "@material-ui/icons/Unarchive";
//import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import OrderList from "views/OrderList/OrderList.jsx";
import CategoryList from "views/CategoryList/CategoryList";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import ProductList from "views/ProductList/ProductList.jsx";
import EditProduct from "views/ProductList/EditProduct.jsx";
import ProductView from "views/ProductList/ProductView.jsx";
//import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";
// core components/views for RTL layout
//import RTLPage from "views/RTLPage/RTLPage.jsx";

// DEVELOPER'S COMMENT
// Use property "hideOnDashboard" to not show an entry on dashboard.
// Use property "isPathExact" to add "exact" attribute to the corresponding Route.

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/products/:id",
    name: "ProductsId",
    isPathExact: true,
    hideOnDashboard: true,
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: ProductView,
    layout: "/admin"
  },
  {
    path: "/category-list",
    name: "Category",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: CategoryList,
    layout: "/admin"
  },
  {
    path: "/products",
    name: "Products",
    isPathExact: true,
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: ProductList,
    layout: "/admin"
  },
  
  {
    path: "/orders",
    name: "Orders",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: OrderList,
    layout: "/admin"
  },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "طباعة",
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "الرموز",
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   rtlName: "خرائط",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
