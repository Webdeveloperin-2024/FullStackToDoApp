import React,{useState,useRef,useEffect} from 'react'
import "./TaskCard.css"

import { MdOutlineCalendarMonth } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import { useFloating, offset, flip, shift ,autoUpdate } from "@floating-ui/react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import TaskActionsMenu from '../taskactionsmenu/TaskActionsMenu';
import EditTaskModal from '../edittaskmodal/EditTaskModal';
import { priorityConfig } from "../../utils/priorityConfig";
import { useTask } from "../../context/TaskContext"


const TaskCard = ({ task }) => {
   // console.log("tasktaskcard", task)
    const { updateTask } = useTask();
      const [openEdit, setOpenEdit] = useState(false)
    const [openDate, setOpenDate] = useState(false)
    const [dataDate, setDataDate] =  useState((task?.deadline)|| []);
    const [openMenu, setOpenMenu] = useState(false)
    const [isCopied, setIsCopied] = useState(false);
    const [isCut, setIsCut] = useState(false);
    {/**display dynamic css for priority */ }
        const priorityData = priorityConfig[task.priority || {}];
        const PriorityIcon = priorityData?.icon;

    {/**diesplay position of calendar and dropdown menu */}
    const wrapperRef = useRef()
    const menuRef=useRef()
    const { refs, floatingStyles } = useFloating({
        placement: "bottom-start",
         strategy: "fixed",
       middleware: [offset(8), flip(), shift()],
});
   
   // console.log(refs.reference?.current);
   /* console.log(refs.floating?.current);*/

    
    const {  refs: menuRefs, floatingStyles: menuFloatingStyles} = useFloating({
  placement: "bottom-end",
  strategy: "fixed",
  whileElementsMounted: autoUpdate,
  middleware: [
    offset(8),
    flip({
      fallbackPlacements: ["bottom-end", "top-end"],
      padding: 8,
    }),
    shift({ padding: 8 }),
  ],
});





useOutsideClick(wrapperRef, () => {
  setOpenDate(false);
});
    
    useOutsideClick(menuRef, () => {
  setOpenMenu(false);
    });
    
    const handleCheckboxChange = (e) => {
  const checked = e.target.checked;

  updateTask(task._id, {
    
    completed: checked,
      completedAt: checked ? new Date() : null
  });
};
      /*  const handleCheckboxChange = () => {
  const updatedData = {
    ...task,
    completed: !task.completed,
  };
  updateTask(task._id, updatedData); 
}*/
  
  useEffect(() => {
  setDataDate(task?.deadline || "");
}, [task?.deadline]);
  
    return (
        <div className={`taskcard-context
             ${task.completed ? "completed" : ""}
        ${task.archived ? "archived" : ""}
        ${isCopied ? "copied" : ""}
        ${isCut ? "cut" : ""}
            `}
          
        
            ref={(el) => {
    menuRef.current = el;
    wrapperRef.current = el;
  }} >

            <div className="taskcard-desc">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={handleCheckboxChange}
                   
                />
            
                <div className="taskcard-title">
                    <label>{task.task }</label>
                   
                </div>
            </div>

            {/**priority */}

            <div className="taskcard-priority"  style={{ backgroundColor: priorityData.backgroundColor }}>
                 {PriorityIcon && (
        <PriorityIcon
          className="priority-icon"
          style={{ color: priorityData.color,   borderColor: priorityData.borderColor }}
        />
      )}
                  <p style={{ color: priorityData.color }}>
        {priorityData.label}
      </p>
            </div>
                
        
            {/*date display*/}
            <div className="taskcard-date"
                ref={refs.setReference}
                onClick={() => setOpenDate(prev => !prev)}>
                <MdOutlineCalendarMonth className="date-icon" />
                <p> {dataDate}</p>
            </div>
       
            {/**three punkt */}
            <div
                ref={menuRefs.setReference}
                onClick={()=>setOpenMenu(prev=>!prev)}  
                className="taskcard-edit-dropdown">
                <BsThreeDotsVertical />
            </div>
            {/**edit dropdown display */}

            {openMenu && <div
                ref={menuRefs.setFloating}
                style={menuFloatingStyles}>
                <TaskActionsMenu
                    task={task}
                    onEdit={() => setOpenEdit(true)}
                        setIsCopied={setIsCopied}
                     setIsCut={setIsCut}
                />
            </div>}

            {/**calendar display */}
                 {openDate && (
                <div className="calendar-popover" style={floatingStyles} ref={refs.setFloating}  >
                    <DayPicker
                        mode="single"
                        selected={dataDate}
                        onSelect={(date) => {
                           console.log("SELECTED:", date);
                             console.log("ISO:", date.toISOString());

                          updateTask(task._id, {
                            deadline: date.toLocaleDateString("en-CA")
                          });
                                   setDataDate(date.toLocaleDateString("en-CA"));
                        }}
                        
                       
                        footer={
                            <div className="dp-footer">
                                <hr className="dp-hr" />
                                <div>
                                    {dataDate
                                        ? dataDate
                                        : "Pick a day."}
                                </div>
                            </div>
                        }
                    />
                </div>
            )}

                {/** edit modal display */}
           {openEdit && (
                <EditTaskModal
                    task={task}
                    onClose={() => setOpenEdit(false)}
            />
)}
            

        </div>
    
    )
}
export default TaskCard
