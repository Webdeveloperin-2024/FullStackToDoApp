import React from 'react'
import "./TaskActionsMenu.css"
import { CiEdit } from "react-icons/ci";
import { FaCheckSquare } from "react-icons/fa";
import { IoIosCut } from "react-icons/io";
import { GrCopy } from "react-icons/gr";
import { IoArchiveSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { LuAlarmClock } from "react-icons/lu";
import {useTask} from "../../context/TaskContext"
import toast from "react-hot-toast";

const TaskActionsMenu = ({ task,onEdit,setIsCopied,setIsCut }) => {
    const { updateTask,
        deleteTask,
        copyTask,
        cutTask,
        archiveTask,
        setReminder,
        toggleComplete } = useTask()
    
 
{/**  const handleMarkAsDone = (id) => {
        const updateData = {
            ...task,
            completed:!task.completed
        }
        updateTask(id,updateData)
    }*/}
   
    const handleCopy = async() => {
        await copyTask(task)
        setIsCopied(true);
         setTimeout(() => {
        setIsCopied(false);
    }, 800);
   }

    const handleCut = () => {
  setIsCut(true);

  setTimeout(() => {
    setIsCut(false);
  }, 1000);
};


  return (
      <div className="taskactionsmenu-context">
          
            {/**edit button */}
          <div className="taskactionsitem"  onClick={onEdit}>
              <CiEdit className="taskactionsitem-icon" />
              <p>Edit</p>
          </div>
         
          {/**mark */}
          <div className="taskactionsitem"  onClick={() => toggleComplete(task._id,task.completed)}>
              <FaCheckSquare  className="taskactionsitem-icon" />
              <p>Mark As done</p>
          </div>

          {/**cut */}
                 <div className="taskactionsitem disabled" onClick={()=> toast.error("Move feature coming soon 🚀")}>
              <IoIosCut   className="taskactionsitem-icon" />
              <p>Cut</p>
          </div>

          {/**copy */}
             <div className="taskactionsitem" onClick={()=>handleCopy(task)}>
              <GrCopy   className="taskactionsitem-icon" />
              <p>Copy</p>
          </div>

          {/**archive */}
            <div className="taskactionsitem" onClick={()=>archiveTask(task._id),console.log("action",task._id)}>
              <IoArchiveSharp   className="taskactionsitem-icon" />
              <p>Archive</p>
          </div>
         
          <hr className="taskactionsitem-line"/>
          {/**delete */}
           <div className="taskactionsitem delete-hover " onClick={()=>deleteTask(task._id)}>
              <MdDelete   className="taskactionsitem-icon delete " />
              <p>Delete</p>
          </div>
    </div>
  )
}

export default TaskActionsMenu
