import React,{useState} from 'react'
import "./Register.css"
import { Link ,useNavigate} from "react-router-dom"
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useUser } from "../../context/UserContext"
import { IoMdArrowBack } from "react-icons/io";
import Loading from "../../components/loading/Loading";
const Register = () => {

  const {register,loading} = useUser()
  const navigate = useNavigate()
  const [showPassword,setShowPassword]=useState(false)
  const [showConfirmpassword,setShowConfirmpassword]=useState(false)
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword:""
  })

  const handleChange = (e) => {
    const name = e.target.name

    const value = e.target.value

    setUserData({
      ...userData,
      [name]:value
    })
  }

  const handleSubmit =async (e) => {
    e.preventDefault()
    
    if (!userData.name || !userData.email || !userData.password || !userData.confirmpassword) {
      alert("fill all Fields")
        return
    }
   if (userData.password !== userData.confirmpassword) {
    alert("passsword and confirm password are not same")
    return
  }
  try {
    await register(userData)
    alert("Register successfully")
    navigate("/login")
  } catch (error) {
    console.log(error)
  }
    
 
  }
 
 

  return (
    <>
      <div className="register-container">
   
        {loading ? (
       <Loading/>
       ):(  <div className="register-box">
          <Link to={"/"}>  <IoMdArrowBack className="back-btn" /></Link>
         
        <h2>Register</h2>
         <form onSubmit={handleSubmit} >
        <div>
          <label htmlFor="name">Name</label>
          <input
            value={userData.name}
            onChange={handleChange}
            id="name"
            name="name"
            type="text" />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            value={userData.email}
             onChange={handleChange}
            id="email"
            name="email"
            type="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
              <div className="formicon">
                 <input
            value={userData.password}
             onChange={handleChange}
            id="password"
            name="password"
                type={showPassword ? "text":"password"} />
                <div  onClick={()=>setShowPassword(prev=>!prev)}>
              {showPassword ? (<IoEyeOff className="icon" /> ):(<IoEye  className="icon"/>)}     
                 
                 
               </div>
         </div>
              
        </div>

        <div>
          <label htmlFor="confirmpassword">Confirm Password</label>
              <div className="formicon">
                
              <input
            value={userData.confirmpassword}
             onChange={handleChange}
            id="confirmpassword"
            name="confirmpassword"
                type={showConfirmpassword ? "text":"password"} />
                <div  onClick={()=>setShowConfirmpassword(prev=>!prev)}>
                  {showConfirmpassword ? (<IoEyeOff className="icon" /> ):(<IoEye  className="icon"/>)}  
             </div>
         </div>
        </div>
        <button  type="submit">Register</button>
        </form>
        <p className="register-link" >Already have  an Account ? <Link  to={"/login"}>Login</Link></p>
      </div>)}
      
     
        
      </div>
      </>
  )
}

export default Register
