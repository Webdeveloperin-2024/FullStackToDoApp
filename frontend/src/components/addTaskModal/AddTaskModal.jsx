import React, { useState } from "react";
import "./AddTaskModal.css";

import defaultCategoryImg from "../../assets/default.png";
import { IoMdClose } from "react-icons/io";
import {useTask} from "../../context/TaskContext"
import { useCategories } from "../../context/CategoriesContext"
import CategorySelect from "../categoryselect/CategorySelect"



const AddTaskModal = ({ showModal, onClose }) => {
  const { addTask } = useTask()
  const {categories,fetchCategories} = useCategories()
  
  const [data, setData] = useState({
    task: "",
    categoryId: "",
    deadline: "",
    priority:""
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
    if (!data.task || !data.categoryId || !data.deadline || !data.priority) {
      alert("Please fill all fields")
      return
    }
    try {
      const response = await addTask(data)
      if (response.data.success) {
        alert(response.data.message)
      }
      fetchCategories()
      setData({
         task: "",
    categoryId: "",
    deadline: "",
    priority:""
      })

      onClose()
    } catch (error) {
        alert(error.response?.data?.message || "Something went wrong");
    }
  
    
  }


  return (
    <>
      <div className="backdrop"></div>
    <div className="modal-container">
    
      <div className="modal-title">
          <h2>Add Task</h2>
          <button  className="close-btn" onClick={onClose}><IoMdClose /></button>
        </div>    
        
        <form className="task-form" onSubmit={handleSubmit}>
          

          <div  className="form-group">
          < CategorySelect  value={data.categoryId}   onChange={(value)=>setData({...data,categoryId:value})} />
          </div>
          

          <div  className="form-group">
            <label htmlFor="task">Task:</label>
            <input type="text" id="task" name="task" value={data.task} onChange={handleChange} />
          </div>


          <div className="form-group">
    <label  htmlFor="deadline">Deadline:</label>
            <input type="date" id="deadline" name="deadline" value={data.deadline } onChange={handleChange} />
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
      </>
  )
};

export default AddTaskModal;
