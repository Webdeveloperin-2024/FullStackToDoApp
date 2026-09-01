
import React, { useState} from 'react'
import "./Sidebar.css"
import { FaCheckCircle } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import SidebarCategoryItem from "../sidebarcategoryitem/SidebarCategoryItem"
import { MdLogout } from "react-icons/md";
import {NavLink,useNavigate} from "react-router-dom"



const Sidebar = ({ showCategories, isSidebarOpen,setIsSidebarOpen }) => {
 
  const navigate = useNavigate()
 
  const linkClass = ({ isActive }) => {
    
   return `sidebar-link ${isActive ? "active":""}`
    
  }


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    
       <aside   className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
     
      <div className="sidebar-header">
       
             <FaCheckCircle  className="sidebar-header-icon"/>
            <h4>Taskly</h4>
      
       
           
          </div>
          <div>
            <ul className="sidebar-body">
              <li>
            <NavLink to={"/dashboard"} className={linkClass}><MdSpaceDashboard className="sidebar-icon" /> <span  className="sidebar-link-text">
              
              Dashboard</span></NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/tasks"} className={linkClass}> <FaCheckSquare className="sidebar-icon"/> <span  className="sidebar-link-text">My Tasks</span></NavLink>
              </li>
             
              <li>
               <NavLink to={"/dashboard/calendar"} className={linkClass} >  <FaCalendarAlt  className="sidebar-icon" /> <span  className="sidebar-link-text">Calendar</span></NavLink>
              </li>
              <li>
           <NavLink to={"/dashboard/statistic"} className={linkClass}> <FaChartLine  className="sidebar-icon" />  <span  className="sidebar-link-text">Statistics</span></NavLink>
              </li>
      
        </ul>
        
      </div>
     
      {/**category list  display */}
      <div>
        {showCategories && (
          <>
            <hr   className="sidebar-divider"/>
             <div className="sidebar-categories">
            <SidebarCategoryItem showCategories={showCategories} />
          
          </div>
        
            </>
         
        
       ) }
      </div>
     
      <ul className="sidebar-footer">
                <li>
               <NavLink to={"/dashboard/settings"} className={linkClass}> <IoSettings className="sidebar-icon"/>  <span  className="sidebar-link-text">Setting</span></NavLink>
          </li>
        <li onClick={handleLogout} className="logout" >
        
            <MdLogout className="sidebar-icon" />
               <span  className="sidebar-link-text"> Logout</span>
          </li>
         
</ul>

        </aside>

  )
}

export default Sidebar

