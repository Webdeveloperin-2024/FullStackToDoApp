import React from 'react'
import "./CategoryCard.css"
import {categoryIcons} from "../../assets/assets"
import { useTask } from "../../context/TaskContext"


const CategoryCard = ({ category,onClick }) => {
  
  const {tasks}  = useTask()
 


const Icon = categoryIcons[category.icon]

  return (
    <div 
      style={{
        backgroundImage: ` url(/categories/${category.image})`,
         backgroundSize: "cover",
        backgroundPosition: "center",
     background: "linear-gradient(rgba(88, 28, 135, 0.55),rgba(124, 58, 237, 0.45),"
      }}
     className="category"
      onClick={onClick}
    
    >
    
    
        <div className="category-icon">{Icon && <Icon/>}</div>
        <p className="category-title">{category.title}</p>
      <p className="category-desc"><span >{category.taskCount}</span> {category.taskCount === 1 ? "Task": "Tasks"} </p>
      
    </div>
  )
}

export default CategoryCard
