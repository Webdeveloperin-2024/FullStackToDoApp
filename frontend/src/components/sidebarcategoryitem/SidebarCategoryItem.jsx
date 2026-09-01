import React from 'react'
import "./SidebarCategoryItem.css"
import {useCategories} from "../../context/CategoriesContext"
import { categoryIcons } from "../../assets/assets"
import { useTask } from "../../context/TaskContext"
import  {useNavigate} from "react-router-dom"

const SidebarCategoryItem = () => {

const navigate = useNavigate()
  const {tasks}=useTask()
     const { categories } = useCategories()
      console.log("sidebar", categories)
  
  const categoriesTaskCount = categories.map(category => {
    const taskCount = tasks.filter(
      task => task.categoryId === category._id
    ).length;
  } )

  return (
    <div  className="sidebar-categories-container">
          <h4 className="sidebar-categories-title">
              MY CATEGORIES
      </h4>
      {categories.map((cat, index) => {
  const Icon = categoryIcons[cat.icon];

  const taskCount = tasks.filter(
    task => task.categoryId === cat._id
  ).length;

  return (
    <ul
      key={"sidebarcategoryitem" + index}
      className="sidebar-category-item"
       onClick={() => navigate(`/dashboard/category/${cat._id}`)}
    >
      <li  className="sidebar-category-info-wrapper">
         <div className="sidebar-category-info">
        <span>{Icon && <Icon />}</span>
        <p>{cat.title}</p>
      </div>

      <div className="sidebar-category-count">
        {taskCount}
      </div>
     </li>
    </ul>
  );
})}
      
          
    </div>
  )
}

export default SidebarCategoryItem
