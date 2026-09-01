import React from 'react'
import "./TaskByCategoryChart.css"
import {useCategories} from "../../context/CategoriesContext"
import { useTask } from "../../context/TaskContext"
import { tasksofCategoryChartConfig} from "../../utils/tasksofCategoryChartConfig"

const TaskByCategoryChart = ({tasks}) => {

  const { categories } = useCategories()
  

  const totalTasks = tasks.length
  {/**task of one category */}
 const chartData = categories.map(category => {

    const totalTasksofcategory = tasks.filter(
        task => task.categoryId === category._id
    ).length;

    return {
        title: category.title,
         totalTasksofcategory 
    };

 });
  {/**others object build */ }
  const sortedData = [...chartData].sort(
    (a, b) => b.totalTasksofcategory - a.totalTasksofcategory
  );
  const topCategories = sortedData.slice(0, 4);
  const otherCategories = sortedData.slice(4);
  const others = otherCategories.reduce(
    (sum, item) => sum + item.totalTasksofcategory,
    0
  );
  const othersItem = {
    title: "Others",
    totalTasksofcategory: others
  };
  const finalChartData = [
    ...topCategories,
    othersItem
];
  

  console.log("tasksofcategorychartdata", chartData)
  
  return (
    <div className="taskbycategorychart" >
      <h2 className="taskbycategorychart-title">Tasks by Category</h2>
      <div className="taskcategorychart">
        <div className="taskcategorychart-left">
          {finalChartData .map((cat, key) => {
            const config = tasksofCategoryChartConfig[cat.title];
            const percentage = (cat.totalTasksofcategory / tasks.length) * 100;
            return (
              <>
                <div className="taskcategorychart-left-desc">
                  <div className="taskcategorychart-left-title">
                   <span
                        className="taskcategorychart-left-bullet"
                        style={{ backgroundColor: config.backgroundColor }}
                      ></span>

                      <h4>{cat.title}</h4>
                 </div>
                  <div className="taskcategorychart-left-progressbar">
                         <div
                                className="progress-fill"
                                style={{
                                   width: `${percentage}%`,
                                    backgroundColor: config.backgroundColor
                                }}
                            />
                  </div>
                  <div className="taskcategorychart-left-describtion">
                    <h4>{cat.totalTasksofcategory} (%{percentage.toFixed(2) })</h4>
                  </div>
                </div>
              </>
            )
          })}
        </div>
        {/**right site */}
        <div className="taskcategorychart-right">
          <svg  width="220" height="220"  viewBox='0 0 220 220'>
               {/* background circle */}
                   <circle
                        cx="110"
                        cy="110"
                        r="85"
                        fill="none"
                        stroke="#eee"
                        strokeWidth="34"
            />
            
            
                      {finalChartData .map((item, index) => {
                           const config = tasksofCategoryChartConfig[item.title]; 
                          
                            const radius = 85;

            const circumference = 2 * Math.PI * radius;

           const dash =totalTasks === 0 
    ? 0 
    : (item.totalTasksofcategory  / totalTasks) * circumference;

            const offset =
    chartData
    .slice(0,index)
    .reduce(
        (sum,current)=>
        sum + (
            totalTasks === 0 
            ? 0 
            : (current.totalTasksofcategory  / totalTasks) * circumference
        ),
        0
    );

                          return (
                                 <circle
                              key={item.title}
                              key={index}
                    cx="110"
                    cy="110"
                    r={radius}
                    fill="none"
                    stroke={config.color}
                    strokeWidth="34"
                    strokeDasharray={`${dash} ${circumference}`}
                    strokeDashoffset={-offset}
                    strokeLinecap="round"
                    transform="rotate(-90 110 110)"
                />
            
        )
    })}
          </svg>

        </div>
   </div>
   
   
   
    </div>
  )
}

export default TaskByCategoryChart
