import React,{useState} from 'react'
import "./TaskList.css"
import TaskCard from '../taskCard/TaskCard'
import { useTask } from '../../context/TaskContext'
import {  filterTasksByTab  } from "../../utils/taskStats";
import EmptyState from "../emptystate/EmptyState"


const TaskList = ({tasks}) => {


  

  //console.log("tasktasklist", tasks)
  //console.log("first task",tasks[0])
  const [activeTab, setActiveTab] = useState("All")
  const filteredTasks =  filterTasksByTab (tasks, activeTab);
  
  return (
    <div className="tasklist-container">
      <ul className="task-tabs">
  <li
    className={activeTab === "All" ? "active" : ""}
    onClick={() => setActiveTab("All")}
  >
    All
  </li>

  <li
    className={activeTab === "Today" ? "active" : ""}
    onClick={() => setActiveTab("Today")}
  >
    Today
  </li>

  <li
    className={activeTab === "Upcoming" ? "active" : ""}
    onClick={() => setActiveTab("Upcoming")}
  >
    Upcoming
  </li>
  
         <li
    className={activeTab === "Pending" ? "active" : ""}
    onClick={() => setActiveTab("Pending")}
  >
    Pending
  </li>
  <li
    className={activeTab === "Completed" ? "active" : ""}
    onClick={() => setActiveTab("Completed")}
  >
    Completed
        </li>
      <li
    className={activeTab === "Overdue" ? "active" : ""}
    onClick={() => setActiveTab("Overdue")}
  >
    Overdue
        </li>   
      </ul>
      <hr className="line" />
      
     <div className="taskcard-container">
  {filteredTasks.length > 0 ? (
    filteredTasks.map((task,index) => (
      <TaskCard key={"task"+task._id} task={task} />
    ))
  ) : (
    <EmptyState activeTab={activeTab} />
  )}
</div>
    </div>
  )
}

export default TaskList
