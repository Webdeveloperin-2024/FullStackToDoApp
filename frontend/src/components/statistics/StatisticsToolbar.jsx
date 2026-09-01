import React,{useState} from 'react'
import "./StatisticsToolbar.css"



const StatisticsToolbar = ({ time, setTime }) => {
  


 
  console.log("time",time)
    const timeRanges = ["Today", "This Week","This Month","This Year","All Time"];

  return (
      <div className="statisticstoolbar-container">
      <select name="" id="" onChange={(e) => {
        setTime(e.target.value),
           console.log("e",e.target.value)
          }} >
  <option value="">Select Time Range</option>

  {timeRanges.map((time, index) => {
    return (
      <option value={time} key={"timeranges" + index} >
        {time}
      </option>
    )
  })}
</select>
    </div>
  )
}

export default StatisticsToolbar
