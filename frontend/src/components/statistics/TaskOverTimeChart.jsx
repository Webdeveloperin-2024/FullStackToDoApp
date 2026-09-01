import React from 'react'
import "./TaskOverTimeChart.css"
import {useTask} from "../../context/TaskContext"
import {LineChart,Line,Legend, AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from "recharts";



const TaskOverTimeChart = ({tasks}) => {

    
    {/**find the number s of tasks in same date */}
   const groupedTasks = tasks.reduce((acc, task) => {

    const date = task.deadline;

    if (!acc[date]) {
        acc[date] = {
            total: 0,
            completed:0
        };
    }

       acc[date].total++;
       
       if(task.completed){
        acc[date].completed++;
    }


    return acc;

   }, {});
    {/**umwandlen objet zu array und dateformat nur für ui */}
    const chartData = Object.entries(groupedTasks).sort(([a], [b]) => new Date(a) - new Date(b)).map(([date,values]) => ({
    date: new Date(date).toLocaleDateString("en-US", {
        month:"short",
        day:"numeric"
    }),
    ...values
}));
    
    
console.log("chartData",chartData)
  return (
    <div   className="chart-container">
          <h2 className="chart-title">Tasks Progress Over Time</h2>
          <div  className="chart-display">
              <ResponsiveContainer width="100%" height={300}>

                  <AreaChart data={chartData}>
                      <defs>
        <linearGradient
            id="colorTotal"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
        >
            <stop 
                offset="5%" 
                stopColor="#8b5cf6" 
                stopOpacity={.35}
            />

            <stop 
                offset="95%" 
                stopColor="#8b5cf6" 
                stopOpacity={0}
            />
        </linearGradient>
    </defs>

                 

                    <CartesianGrid />

                    <XAxis 
                            dataKey="date"
                    />

                    <YAxis />

                     
                      <Tooltip />

                      <Legend
                          verticalAlign="bottom"
                          align="center"
                          iconSize={10}
                            iconType="rect"
                             wrapperStyle={{
                        paddingTop: "25px",
                        fontSize: "14px",
                        fontWeight: "600"
                                        }}/>

    {/* Fläche unter der Linie */}
    <Area
        type="monotone"
        dataKey="total"
        stroke="none"
        fill="url(#colorTotal)"
          fillOpacity={.5}                  
    />
                      <Line
                         name="All Tasks" 
                        type="monotone"
                        dataKey="total"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                      />
                      

                      <Line
                          name="Completed Tasks"
                         type="monotone"
                         dataKey="completed"
                          stroke="#22c55e"
                           strokeWidth={3}
                        />
                   

                    </AreaChart>

                    </ResponsiveContainer>

          </div>
    </div>
  )
}

export default TaskOverTimeChart
  

{/**
    const CustomLegend = ({payload}) => (
    <div>
        {payload.map((item)=>(
            <span key={item.value}>
                <span
                    style={{
                        width:10,
                        height:10,
                        background:item.color,
                        borderRadius:"50%",
                        display:"inline-block"
                    }}
                />
                {item.value}
            </span>
        ))}
    </div>
) */}

{/**<Legend content={<CustomLegend />} /> */}