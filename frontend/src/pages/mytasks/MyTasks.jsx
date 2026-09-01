import React,{useState} from 'react'
import "./MyTasks.css"
import Sidebar from '../../components/sidebar/Sidebar'
import { FaRegBell } from "react-icons/fa";
import TaskStats from "../../components/taskstats/TaskStats"
import Search from '../../components/search/Search';

import { FaAngleDown } from "react-icons/fa";
import TaskList from '../../components/taskList/TaskList';
import { useTask } from "../../context/TaskContext"
import {useCategories}  from "../../context/CategoriesContext"
import AddTaskModal from "../../components/addTaskModal/AddTaskModal"
import { getOverdueTasks } from "../../utils/taskStats"
import { getFilteredTasks } from "../../utils/filteredTasks"


const MyTasks = () => {
  const { tasks } = useTask()
  console.log("taskmytask",tasks)
  const { categories } = useCategories()
  const [isOpenAddModal,setIsOpenAddModal]= useState(false)
  const [search, setSearch] = useState("")
  const [selectedCategory,setSelectedCategory]=useState("")
  const [prioritat, setPrioritat] = useState("")
  const [sorted, setSorted] = useState("")
  
const priority=["High","Medium","Low"]
 
 const sortBy = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Due Date", value: "dueDate" },
  
  { label: "A-Z", value: "alphabetical" },
  ];

const visibleTasks = getFilteredTasks({
  tasks,
  search,
  selectedCategory,
  prioritat,
  sorted
});

{/**
 const searchTasks = tasks.filter(task =>
  task.task
    ?.trim()
    .toLowerCase()
    .includes(search.trim().toLowerCase())
);

  console.log("searchtasksmy tasks", searchTasks);
  
  const tasksofCategory= tasks.filter(task=>task.categoryId===selectedCategory)
  console.log("tasksofCategory", tasksofCategory)
  
const priorityTasks=tasks.filter(task=>!prioritat ||task.priority===prioritat)
  console.log("priorityTasks", priorityTasks)
  
  const sortedTasks = (tasks, sorted) => {
    switch (sorted) {
      case "newest":
       return [...tasks].sort((a,b)=>new Date (b.deadline)- new Date(a.deadline))
    
       case "oldest":
    return [...tasks].sort((a,b)=>new Date(a.deadlin)-new Date(b.deadline))
    
      case "dueDate":
         return [...tasks].sort(
    (a,b)=> new Date(a.deadline)-new Date(b.deadline)
  );
      
      case "alphabetical":
        return [...tasks].sort((a,b)=>
    a.task.toLowerCase().localeCompare(
      b.task.toLowerCase()
    )
  );
    };

   
  }
     */}

  
  return (
    <div className="mytasks-container">
      <div className="mytasks-header">
        <div className="header-left">
          <h2>My Tasks</h2>
          <p>Manage and organize your tasks</p>
        </div>
        <div className="header-right">
          <FaRegBell className="header-icon" />
          <button  className="add-btn" onClick={()=>setIsOpenAddModal(true)}> +  Add Task</button>
        </div>
      </div>
       {/**status */}
      <div className="stats-section">
        <TaskStats tasks={tasks } />
      </div>
      {/**search section */}
      <div className="search-section">
        <Search  search={search}   setSearch={setSearch}    />
      
      </div>
      
      {/**sort section */}
      <div className="sort-container">

             <div className="select-wrapper">
          <select name="categoryId" id="" onChange={(e) => {
            setSelectedCategory(e.target.value),
            console.log("setselectedcategroy",e.target.value)
          }}>
           <option value=""> ALL category</option>
            {categories.map((cat, index) => {
              return (
                <option  value={cat._id} key={"cat"+index} >{cat.title }</option>
            )
          })}
         
          </select>
         
             <FaAngleDown className="select-icon" />
        </div>

        <div className="select-wrapper">
          <select name="priority" id="" onChange={(e) => setPrioritat(e.target.value)
           
          }>
            <option value="">Priority</option>
            {priority.map((priority,index) => {
              return (
                <option value={priority} key={"priority"+index}>{priority}</option>
              )
            })}
          </select>
             <FaAngleDown className="select-icon" />
        </div>
       
        <div className="select-wrapper">
          <select name="sortBy" id="" onChange={(e) => {
            setSorted(e.target.value),
            console.log("e",e.target.value)
          }}>
            <option value="">Sort By</option>
            {sortBy.map((item) => {
              return (
                <option key={item.value}  value={item.value} >{item.label }</option>
              )
            })}
          </select>
           <FaAngleDown className="select-icon" />
        </div>
      </div>
     
    

      {/**tasklist section */}
     
    <div className="taskList">
      <TaskList tasks={visibleTasks} />
    </div>
  
    
      {/**add task modal display */}
      {isOpenAddModal && <AddTaskModal onClose={()=>setIsOpenAddModal(false) } />}
    </div>
  )
}

export default MyTasks
