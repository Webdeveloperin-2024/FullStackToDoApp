import "./Navbar.css"
import boyIcon from "../../assets/boy.png"
import React from 'react'
import { IoMenu } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate ,Link} from "react-router-dom"
import { useUser } from "../../context/UserContext";
import { MdWavingHand } from "react-icons/md";


const Navbar = ({ tasks}) => {
  

  const { currentUser, logout } = useUser()
  console.log("currentuser", currentUser)
  const navigate = useNavigate()
  
  const today = new Date()

  const currentDate = today.toLocaleDateString("en-EN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year:"numeric"
  })
  
  const currentTime = today.toLocaleTimeString("en-EN", {
  hour: "2-digit",
  minute: "2-digit",
})

  
const handleLogout = async () => {
   await logout();
   navigate("/");
};

  return (
   
    <div className="container ">
      <section className="navbar">
          <div className="navbar-left">
      <h1 className="nav-title" >Hello {currentUser?.name}<MdWavingHand className="nav-icon" /></h1>
          <p  className="date">{currentDate}</p>
          <p className="time">{currentTime }</p>
                
    <p className="navbar-desc">
  {tasks.length > 0 &&
    `You have ${tasks.length} ${
      tasks.length === 1 ? "Task" : "Tasks"
    }`}
</p>
        
     </div>
        

        <div className="navbar-right">
         
      
         
          {currentUser && (
       <IoLogOutOutline
      className="logout-icon"
      onClick={handleLogout}
    />
  
)}

      </div>

      </section>

     

      </div>
      
  )
}

export default Navbar
