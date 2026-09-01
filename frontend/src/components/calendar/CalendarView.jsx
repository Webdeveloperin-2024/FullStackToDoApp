import React, {useState,useEffect } from 'react'
import "./CalendarView.css"
import { DayPicker } from "react-day-picker";





const CalendarView = ({today,selectedDate,setSelectedDate, hasTask,tasksByDate}) => {
const [months, setMonths] = useState(3);
console.log("selecteddate",selectedDate)
  console.log("hastask", hasTask)
  

useEffect(() => {
  const updateMonths = () => {
    if (window.innerWidth <= 768) {
      setMonths(1);
    } else if (window.innerWidth <= 1024) {
      setMonths(2);
    } else {
      setMonths(3);
    }
  };

  updateMonths();
  window.addEventListener("resize", updateMonths);

  return () => window.removeEventListener("resize", updateMonths);
}, []);

  return (
    <div  className="daypickercontainer" >
          <DayPicker
                mode="single"
              selected={selectedDate}
             onSelect={(date) => {
               setSelectedDate(date);
                 console.log("hasTask date:", date.toLocaleDateString("en-CA"));
    console.log("calendarview", date);
  }}
            defaultMonth={today}
        numberOfMonths={months}
          modifiers={{
    hasTask: (date) => {
    const dateString = date.toLocaleDateString("en-CA");
    return Boolean(tasksByDate[dateString]);
  }
  }}
        modifiersClassNames={{
    hasTask: "has-task"
  }}  
            />
    </div>
  )
}

export default CalendarView
