import { createContext,useContext,useState,useEffect } from "react";
import api from "../services/axios"

export const CategoriesContext = createContext()

const CategoriesProvider = ({children}) => {
    const [categories, setCategories] = useState([])

    
  const fetchCategories = async () => {
    const response = await api.get("/api/category/get")
    console.log("category response app", response)
    setCategories(response.data.data)
  }

  useEffect(() => {
    fetchCategories()
  }, [])
    return (
        <CategoriesContext.Provider  value={{categories,setCategories,fetchCategories}}>
            {children}
    </CategoriesContext.Provider>
)

}

export default CategoriesProvider;

export const useCategories = () => {
    return useContext(CategoriesContext)
}