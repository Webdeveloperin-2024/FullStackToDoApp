import React from 'react'
import "./HomePage.css"
import {Link} from "react-router-dom"
import { FaCheckCircle } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { FaCloudArrowDown } from "react-icons/fa6";
import { IoShieldCheckmark } from "react-icons/io5";
import { MdArrowRightAlt } from "react-icons/md";
import { IoIosPlayCircle } from "react-icons/io";
import todo from "../../assets/todo.png"

const HomePage = () => {
  return (
    <div className="homepage-container">
{/**navbar */}
      <div className="nav">
        <div className="nav-left">
           <IoShieldCheckmark  className="nav-icon"/>

       <h6>Your Personal Task Manager</h6>
        </div>
        <div >
         <ul className="nav-right">
          <li>Featuers</li>
          <li>About us</li>
          <li>How to work</li>
          <Link to={"/login"} className="login">Login</Link>
          <Link  to={"/register"}  className="register">Register</Link>
         </ul>
        </div>
      </div>
     
     <section className="hero">

  
  <div className="hero-left">
          <h6 >Organise Your Life</h6>
          <h2>Behalte deine <br/>Aufgaben im <span>Griff</span></h2>
        <p>Die einfache und moderne Task manager App hilf dir ,produktiver zu sein und keinen wichtigen Task zu vergessen</p>
          <div className="button">
             <Link className="link link-left"  to={"/register"}>Let's Get Started<MdArrowRightAlt /></Link>
        <Link className="link link-right"  to={"/learn-more"}><IoIosPlayCircle />learn more</Link>
       </div>
         
        </div>

        
        <div className="hero-right">
          <img src={todo} alt="" />
        </div>
      </section>
      <div className="feature">
        <h4>Features</h4>
        <h3>Alles ,was du für deine Organisation brauchst</h3>
        <div className="feature-des">
            <div>
          <FaTasks /><h6>Create Tasks</h6>
        <p>Erstelle, bearbeite und lösche Tasks schnell und einfach</p>
        </div>

        <div>
         <MdCategory /> <h6>Organize Categories &Prioritäten</h6>
          <p>Group your tasks into categories und setze Prioritäten (high,medium,low)</p>
        </div>

        <div>
         <FaCloudArrowDown /> <h6>Überall verfügbar</h6>
          <p>Greife von jedem gerät auf deine Todos zu-sicher in der cloud gespeichert</p>
        </div>
        

        <div>
         <FaCheckCircle /> <h6>Track Progress</h6>
          <p>Mark tasks as completed and stay productive</p>
        </div>
        </div>
      
      </div>
    </div>
  )
}

export default HomePage
