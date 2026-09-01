import React from 'react'
import "./ProductivityInsight.css"
import { FaChartLine } from "react-icons/fa6";
import { IoMdCheckmarkCircle } from "react-icons/io";
import {getCompletedTasks } from "../../utils/taskStats"
import {getMostProductivePeriod,getDailyAverage,getDaysByRange } from "../../utils/statisticsFilter";

const ProductivityInsight = ({ tasks, time }) => {

    const totalTasks = tasks?.length || 0;

    const completedTasks = getCompletedTasks(tasks || []).length;
 
    const productivity = totalTasks === 0 ? 0 :
        Math.round((completedTasks / totalTasks) * 100)
    
    const days = getDaysByRange(time);
    const dailyaverage = getDailyAverage(tasks, days)
    
    const mostProductivePeriod = getMostProductivePeriod(tasks);
    
    
    const mostProductiveDay= mostProductivePeriod  ?new Date(mostProductivePeriod.date).toLocaleDateString("en-US",{day:"numeric",month:"long"}):"no data"
    return (
      <div className="productivityinsight-container">
          <h2>Productivity Insight</h2>
          
          <div className="productivityinsight-content">
              <div className="productivityinsight-icon">🤩</div>
              <div className="productivityinsight-desc">
                  <h4>Great job! 🎉</h4>
                  <p className="text">{`You completed ${productivity}% of your tasks ${time}. `} </p>
             <p>Keep up the excellent work!</p>
              </div>


          </div>

          <div className="productivity-summary">
              <div className="productivity-summary-item">
                  <div className="productivity-summary-item-icon">
                      < FaChartLine />
                  </div>
                  <div className="productivity-summary-item-desc">
                      <h5>Most productive day</h5>
                        <p> { mostProductiveDay  }</p>
                  </div>

              </div>


               <div className="productivity-summary-item">
                  <div className="productivity-summary-item-icon">
                      <  IoMdCheckmarkCircle />
                  </div>
                  <div className="productivity-summary-item-desc">
                      <h5>Daily Average</h5>
                        <p>{ dailyaverage } tasks</p>
                  </div>

              </div>
          </div>
      
    </div>
  )
}

export default ProductivityInsight
