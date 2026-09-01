import React,{useState} from 'react'
import {useNavigate,Link} from "react-router-dom"
import "./Login.css"
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";

import { useUser } from "../../context/UserContext.jsx"
import Loading from "../../components/loading/Loading";

const Login = () => {

  const {login,fetchCurrentUser,currentUser,loading}=useUser()
   const [showPassword,setShowPassword]=useState(false)
  const [userData, setUserData] = useState({
    email: "",
    password:""
  })
  const navigate = useNavigate()


  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUserData({
   ...userData,
   [name]:value

 })
  }

  const valideValue = Object.values(userData).every(el => el)

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!userData.email || !userData.password) {
    alert("fill all fields");
    return;
    }
    
try {
    await login(userData)
await fetchCurrentUser()
  alert("login successful");
  console.log(currentUser)
    navigate("/dashboard");
  
  } catch (error) {
    alert("wrong email or password");
  }
};
  
  return (
    <div className="login-container">
      {loading ? (
    <Loading/>
    ):( <div className="login-box">
        <Link to={"/"}>  <IoMdArrowBack  className="back-btn"/></Link>
        <h2 className="login-title">Login</h2>
        <form  onSubmit={handleSubmit} >
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
           <div>
            <label htmlFor="password">Password</label>
            <div className="formicon">
              <input
              value={userData.password}
              onChange={handleChange}
              name="password"
              id="password"
                type={showPassword ? "text" : "password"} />
               <div onClick={()=>setShowPassword(prev=>!prev)}>
              {showPassword? (<IoEyeOff className="icon" /> ):(<IoEye  className="icon"/>)}
            </div>
            </div>
           
          </div>
         
       <button type="submit"  disabled={!valideValue} >Login</button>
        </form>
        <p className="login-link">Haven t got  an Account ?
          <span className="register" onClick={() => navigate("/register")}>
             Register
          </span>
         
        </p>
      </div>
      )}
     
    </div>
  )
}

export default Login
