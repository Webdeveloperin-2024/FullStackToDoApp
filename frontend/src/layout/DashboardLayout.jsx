import React,{useState} from 'react'
import { Outlet,useLocation } from 'react-router-dom'
import "./DashboardLayout.css"
import Sidebar from '../components/sidebar/Sidebar'
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const DashboardLayout = () => {
    
    const [isSidebarOpen,setIsSidebarOpen]=useState(false)
console.log("sidebar state:", isSidebarOpen)
     const location = useLocation()
console.log("current path:", location.pathname);
  const showCategories = location.pathname.includes("/category/");
//  console.log("dashboardlayout",showCategories)

  return (
      <div className="layout-container">
          <section className="main">
              <div  className="layout-sidebar">
                   <Sidebar  showCategories={showCategories} isSidebarOpen={isSidebarOpen} /> 
              </div>
              <div className="content">
                  <div className="menu-container">
                      <button className="layout-menu-btn"
                                 onClick={()=>setIsSidebarOpen(is=>!is)}>
                                 {isSidebarOpen ? <IoMdClose /> : <IoMdMenu />}
                               </button>
                              
                 </div>
                  
                  <Outlet/>
              </div>
          </section>
    </div>
    
  )
}


export default DashboardLayout
