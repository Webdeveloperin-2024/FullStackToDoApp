import React,{useState} from 'react'
import "./EditTaskModal.css"
import{ formatDateTime} from "../../utils/dateFormatter"
import defaultCategoryImg from "../../assets/default.png";
import { IoMdClose } from "react-icons/io";
import { useTask } from '../../context/TaskContext';
import {useCategories} from "../../context/CategoriesContext"
import { createPortal } from "react-dom";
import CategorySelect from "../categoryselect/CategorySelect"

const EditTaskModal = ({ task, onClose }) => {

const {updateTask}= useTask()
  const {categories} = useCategories()
  const [data, setData] = useState({
    task: task.task,
    categoryId: task.categoryId?._id || task.categoryId,
    deadline: task.deadline ? task.deadline.split("T")[0] : "",
    priority:task.priority
  })


  
  const priorities = ["High", "Medium", "Low"];

 const  handleChange = (e) => {
    const {name,value}= e.target
    setData({
      ...data,
      [name]:value
 })
 
  }
   
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const response = await updateTask(task._id,data)
      if (response.data.success) {
        alert(response.data.message)
      }
      
     

      onClose()
    } catch (error) {
        alert(error.response?.data?.message || "Something went wrong");
    }
  
    
  }


  return  createPortal (
    <>
         <div className="backdrop" onClose={onClose}></div>
       <div className="modal-container"  onClick={(e) => e.stopPropagation()}>
       
         <div className="modal-title">
             <h2>Edit Task</h2>
             <button  className="close-btn" onClick={onClose}><IoMdClose /></button>
           </div>    
           
           <form className="task-form" onSubmit={handleSubmit}>
             
   
             <div  className="form-group">
            <CategorySelect value={data.categoryId} onChange={(e)=>setData({...data,categoryId:e.target.value}) } />
             </div>
             
   
             <div  className="form-group">
               <label htmlFor="task">Task:</label>
               <input type="text" id="task" name="task" value={data.task} onChange={handleChange} />
             </div>
   
   
             <div className="form-group">
       <label  htmlFor="deadline">Deadline:</label>
               <input type="date" id="deadline" name="deadline" value={data.deadline}  onChange={handleChange} />
             </div>
             
            <div className="form-priority">
     <label  htmlFor="priority">Priority:</label>
   
     {priorities.map((priority) => (
       <div className="radio-label">
          <label key={priority}  htmlFor="priority">
         <input
           type="radio"
           name="priority"
           value={priority}
           onChange={handleChange}
             checked={data.priority === priority}
         />
         {priority}
       </label>
      </div>
     )
     
               )}
             </div>
             
             <div className="form-btn">
               <button className="submit-btn"  type="submit">Save</button>
               <button className="cancel-btn" type="button"  onClick={onClose}>Cancel</button>
             </div>
   
           </form>
         </div>
    </>,
      document.getElementById("modal-root")
  )
}

export default EditTaskModal
