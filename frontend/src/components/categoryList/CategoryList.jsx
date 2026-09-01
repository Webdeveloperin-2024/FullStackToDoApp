import React,{useState} from 'react'
import "./CategoryList.css"
import {useNavigate} from "react-router-dom"
import CategoryCard from '../categoryCard/CategoryCard'
import { useTask } from "../../context/TaskContext"



const CategoryList = ({categories,setCategories }) => {
  const navigate=useNavigate()

 
  return (
    <div  className="categorycard-container">
      {categories.map((category, index) => {
           // console.log("listcategory",category)
              return (
                <CategoryCard
                  category={category}
                  key={"category" + index}
                
                  
                  onClick={(e) => {
                    console.log("categoryid",category._id),
                    navigate(`category/${category._id}`);
                   
                  }
                  
                }
                />
          )
      })}
    </div>
  )
}

export default CategoryList
