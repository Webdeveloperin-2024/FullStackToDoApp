import React from 'react'
import "./TaskStats.css"
import { FaCheckSquare ,FaTasks,FaHourglassHalf, FaFire } from "react-icons/fa";
import {useTask} from "../../context/TaskContext"
import { getCompletedTasks,getOverdueTasks,getPendingTasks } from "../../utils/taskStats"

const TaskStats = () => {

  const { tasks } = useTask()
  
 const completedTasks =  getCompletedTasks (tasks)
    
  const pendingTasks = getPendingTasks(tasks)
 

const overdueTasks = getOverdueTasks(tasks)

  return (
    <div className="task-stats">
      <div className="stat-card">
        <div className="card-title">
          <FaTasks className="card-icon total" />   <p>Total Tasks</p>
        </div>
   <h3>{tasks?.length}</h3>
  
  </div>

      <div className="stat-card">
        <div className="card-title">
          <FaCheckSquare  className="card-icon completed"/>   <p>Completed</p>
        </div>
   <h3>{completedTasks?.length}</h3>
  
  </div>

      <div className="stat-card">
        <div className="card-title">
          <FaHourglassHalf className="card-icon pending"   /> <p>Pending</p>
        </div>
    <h3>{pendingTasks?.length}</h3>
   
      </div>
      
      <div className="stat-card overdue">
        <div className="card-title">
            <FaFire  className="card-icon overdue"   />    <p>Overdue Tasks</p>
        </div>
   <h3>{overdueTasks?.length}</h3>
     
  </div>
</div>
  )
}

export default TaskStats
