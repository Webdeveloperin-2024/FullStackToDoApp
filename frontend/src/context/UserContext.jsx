import { createContext,useState,useEffect,useContext } from "react"
import api from "../services/axios"


export const UserContext = createContext()



export const UserProvider = ({ children }) => {
    
   const [currentUser,setCurrentUser]= useState(null)
    const [loading, setLoading] = useState(false)

     // User beim App-Start holen (Cookie basiert)
    const fetchCurrentUser = async () => {
         setLoading(true)
    try {
      const res = await api.get("/api/user/current-user");
      console.log("res fetchcurrent user",res)
      setCurrentUser(res.data.data);
      console.log("currentuser", currentUser)
      setLoading(false)
    } catch (error) {
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);
   
  //register
  const register = async (userData) => {
  try {
    setLoading(true);

    const res = await api.post("/api/user/register", userData);

    return res.data;

  } finally {
    setLoading(false);
  }
};
  //  Login 
  const login = async (userData) => {
  try {
    setLoading(true);

    await api.post("/api/user/login", userData);

    const res = await api.get("/api/user/current-user");

    setCurrentUser(res.data.data);

    return res.data;

  } finally {
    setLoading(false);
  }
};
    
  //  Logout
  const logout = async () => {
    try {
      await api.post("/api/user/logout");
    } catch (error) {
      console.log(error);
    }
    setCurrentUser(null);
  };

    return (
        <UserContext.Provider value={{
            currentUser,
        setCurrentUser,
        loading,
        register,
        login,
        logout,
        fetchCurrentUser,
        }}>
            {children}
        </UserContext.Provider>
    )


}


export const useUser = () => {
    return useContext(UserContext)
}
