import React,{useState} from 'react'
import "./CalendarPage.css"
import { FaRegBell } from "react-icons/fa";
 import CalendarView from "../../components/calendar/CalendarView"
import AddTaskModal from "../../components/addTaskModal/AddTaskModal"
import { useTask } from "../../context/TaskContext"
import { FaPlus } from "react-icons/fa";
import TaskCard from "../../components/taskCard/TaskCard"




const CalendarPage = () => {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false)
   const today = new Date()
   const [selectedDate, setSelectedDate] = useState(today);
  const { tasks } = useTask()
 

 const selectedDateString = selectedDate.toLocaleDateString("en-CA");;
  
    const dayTasks = tasks.filter((task) =>(task.deadline) === selectedDateString)
    
  
  

 
  
  const  tasksByDate= tasks.reduce((acc, task)=>{

 const date =new Date (task.deadline).toLocaleDateString("en-CA");

 if(!acc[date]){
   acc[date]=[];
 }

 acc[date].push(task);

 return acc;

}, {});
    
 console.log(" tasksByDate", tasksByDate)  
  
  
  const hasTask = (date) => {
    const dateString = date.toLocaleDateString("en-CA");
 
    
    return Boolean(tasksByDate[dateString])


  };

  
  return (
    <div className="calendar-container">
      
      {/**display header */}
      <div className="calendar-header">
         <div className="calendarheader-left">
        <h2>Task Calendar</h2>
        <p>Plan and manage your tasks by date</p>
        </div>
        
        <div className="calendarheader-right">
           <FaRegBell className="header-icon" />
          <button
            className="add-btn"
            onClick={() => setIsOpenAddModal(true)}>
            <FaPlus />
            <span> Add Task</span>
           
          </button>
        </div>
   
      </div>

      {isOpenAddModal && <AddTaskModal onClose={() => setIsOpenAddModal(false)} />}
      <hr className="calendarpage-line" />
      
      {/**content */}
      <div className="calendar-content-container">

       <div className="calendar-rdp-container">
          <CalendarView today={today} selectedDate={selectedDate} setSelectedDate={setSelectedDate} hasTask={hasTask} tasksByDate={tasksByDate } />
          </div>
         </div>
      <div className="calendar-taskcard-container">
        <h2 className="calendar-taskcard-container-title">Day Overview</h2>
        <div className="calendar-taskcard">

          {dayTasks.map((task, index) => (
            
             
              <TaskCard key={"dayTask" + index} task={task} />
              
             ))}
          </div>
          </div>
    
       
     


      </div>

    
  )
}

export default CalendarPage
