import React from 'react'
import "./ProgressOverview.css"
import {useTask} from "../../context/TaskContext"
import { progressOverviewConfig } from "../../utils/progressOverViewConfig"


const ProgressOverview = ({ tasks }) => {
    
    console.log("progressoverview", tasks)
    const totaltasks = tasks.length
    console.log(totaltasks)
    const chartData = Object.entries(progressOverviewConfig).map(([key, item]) => ({
    key,
    label: item.label,
    color: item.color,
    value: item.getValue(tasks).length
    }));
    
    {/**display fn  text in der mittel von chart  */ }
    const progressPercentage = totaltasks === 0
    ? 0
    : Math.round(
        (chartData.find(item => item.key === "completed")?.value / totaltasks) * 100
      );

  return (
      <div className="progressoverview">
          <h2 className="progressoverview-title">Progress Overview</h2>
          <div className="progressoverview-chart">

                <div className="progressoverview-chart-left">
                    <svg width="220" height="220" viewBox="0 0 220 220">

    {/* background circle */}
    <circle
        cx="110"
        cy="110"
        r="85"
        fill="none"
        stroke="#eee"
        strokeWidth="14"
    />
                      {chartData.map((item, index) => {
                          
                          
                            const radius = 85;

            const circumference = 2 * Math.PI * radius;

           const dash = totaltasks === 0 
    ? 0 
    : (item.value / totaltasks) * circumference;

            const offset =
    chartData
    .slice(0,index)
    .reduce(
        (sum,current)=>
        sum + (
            totaltasks === 0 
            ? 0 
            : (current.value / totaltasks) * circumference
        ),
        0
    );

                          return (
                                 <circle
                    key={item.key}
                    cx="110"
                    cy="110"
                    r={radius}
                    fill="none"
                    stroke={item.color}
                    strokeWidth="14"
                    strokeDasharray={`${dash} ${circumference}`}
                    strokeDashoffset={-offset}
                    strokeLinecap="round"
                    transform="rotate(-90 110 110)"
                />
            
        )
    })}
           <text
    x="110"
    y="110"
    textAnchor="middle"
    dominantBaseline="middle"
    fontSize="24"
    fontWeight="bold"
    fill="var(--violet-700)"
>
    {progressPercentage}%
</text>           
  


</svg>
              </div>
              <div className="progressoverview-chart-right">
                  {Object.entries(progressOverviewConfig).map(([key, item]) => {
                      const value = item.getValue(tasks).length
                      const process = (value / tasks.length) * 100
                      const percentage=process.toFixed(2)
                      return (
                          <div className="progressoverview-chart-right-title"  key={key}>
                              <span className="progressoverview-bullet" style={{ backgroundColor: item.backgroundColor}}></span>
                              <h5>{item.label}</h5>
                              <h5>{value}  (%{percentage })</h5>
                          </div>
                       )
                   })}
              </div>
               
       
    
            </div>
    </div>
  )
}

export default ProgressOverview
