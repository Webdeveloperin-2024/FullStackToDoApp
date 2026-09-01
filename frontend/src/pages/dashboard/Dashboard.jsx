import React,{useEffect,useState} from 'react'
import Navbar from "../../components/navbar/Navbar"
import CategoryList from '../../components/categoryList/CategoryList'
import TaskList from '../../components/taskList/TaskList'
import { useNavigate,NavLink } from "react-router-dom"

import { useUser } from '../../context/UserContext'
import Search from "../../components/search/Search"
import "./Dashboard.css"
import TaskStats from "../../components/taskstats/TaskStats";
import CategoryCard from '../../components/categoryCard/CategoryCard'
import { isToday} from "../../utils/dateUtils"
import AddTaskModal from '../../components/addTaskModal/AddTaskModal'
import {useTask} from "../../context/TaskContext"
import { useCategories } from '../../context/CategoriesContext'
import TaskCard from '../../components/taskCard/TaskCard'
import {formatDateTime} from "../../utils/dateFormatter"
import { FaPlus } from "react-icons/fa";
import Loading from "../../components/loading/Loading"


const Dashboard = ( ) => {
  const { tasks, setTasks,selectedCategory,setSelectedCategory,getTaskByCategory,   taskLoading } = useTask()
  console.log("dashtasks", tasks);
 tasks.forEach(task => {
  console.log(
    task.task,
    new Date(task.deadline),
    new Date(task.deadline).toLocaleDateString()
  );
});
  const { categories, fetchCategories, setCategories } = useCategories()
  const [showModal, setShowModal] = useState(false)
  
  const { currentUser } = useUser()
  const navigate = useNavigate()
   const [search,setSearch]=useState("")
  

  const filteredTasks = tasks.filter((task) =>
  task.task?.toLowerCase().includes(search.toLowerCase())
  );
  
  const today= new Date()
  
  
  
  const todaysTasks = tasks.filter(task => {
      return (isToday(task.deadline) === isToday(today)) 
  }
 
)
console.log("dashboard",todaysTasks)
  const categoriesTaskCount = categories.map(category => {
    const taskCount = tasks.filter(
        task => task.categoryId === category._id
    ).length;

    return {
      ...category,
        taskCount
    };
    
  });
  
  console.log("categoriesTaskCount",categoriesTaskCount)
  
 
  return (
    
     <div className="dashboard-container">
        <div className="dashboard-nav"><Navbar tasks={tasks} /></div> 
        
     
      
      <div className="dashboard-card-stats">
        <TaskStats tasks={tasks } />
      </div> 
      <div className="dashboard-title">
            <h4>Categories</h4>
            <p>Ready to be productive? Pick a category below.</p>
      </div>
      
     
          <div className="dashboard-context">
           
             <CategoryList
        
        
          categories={categoriesTaskCount}
          
           
        />
      </div>
      
 

  <div className="dashboard-context">
    <h2 className="dashboard-context-title">
            Today's {todaysTasks.length === 1 ? "Task" : "Tasks"}
       
          <div className="btn-container">
    <button className="add-btn" onClick={() => setShowModal(true)}>
              <FaPlus />
             <span> Add Task</span>
            </button>
             </div>    
    </h2>
    
    {todaysTasks.length === 0 ? (
      <p className="dashboard-context-desc">
        Your schedule is clear today. Add a priority when you're ready.
      </p>
    ) : (
      <p className="dashboard-context-desc">
        Keep moving forward — here are your priorities for today.
      </p>
    )}
        
        {taskLoading ? (<Loading />) :
          (
            todaysTasks.map((task, index) => (
      <TaskCard task={task} key={"dashboard" + index} />
    )))}
   
  </div>

         
      
      {showModal && <AddTaskModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        
      />}
          </div>
      
   
      
    
  )
}

export default Dashboard
