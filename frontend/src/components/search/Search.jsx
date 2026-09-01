import React from 'react'
import "./Search.css"
import { IoIosSearch } from "react-icons/io";

const Search = ({search,setSearch}) => {

   


  return (
      <div className="search-container">
          
          <div  className="search-box">
          <IoIosSearch  className="search-icon"/>
              <input
                value={search} 
                  onChange={(e) =>{ setSearch(e.target.value),
                      console.log("search", e.target.value)}} 
              type="text"
          placeholder="Search tasks..."/>
      
    </div>
      
      </div>
  )
}

export default Search
