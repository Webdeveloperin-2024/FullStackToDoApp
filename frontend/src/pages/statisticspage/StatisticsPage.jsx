import React,{useState} from 'react'
import "./StatisticsPage.css"
import StatisticsToolbar from "../../components/statistics/StatisticsToolbar"
import StatisticsCard from "../../components/statistics/StatisticsCard"
import ProgressOverview from "../../components/statistics/ProgressOverview"
import TaskOverTimeChart from "../../components/statistics/TaskOverTimeChart"
import TaskByCategoryChart from "../../components/statistics/TaskByCategoryChart"
import ProductivityInsight from "../../components/statistics/ProductivityInsight"
import { getStatisticsTasks} from "../../utils/statisticsFilter"
import { useTask } from '../../context/TaskContext'

const StatisticsPage = () => {
    const {tasks}=useTask()
 const [time, setTime] = useState("Today")

    const selectedTasks = getStatisticsTasks(tasks, time);
  return (
      <div className="statisticspage-container">
          {/**header section */}
          <section className="statisticspage-header">
              <div className="statisticspage-header-left">
                   <h2 className="statisticspage-header-title">Statistics</h2>
                <p>Track your productivity and progress</p>
              </div>
              <div className="statisticspage-header-right">
                  <StatisticsToolbar time={time} setTime={setTime } />
              </div>
             
          </section>

          {/**statistics card section  */}
          <section className="statisticscard-container">
              <StatisticsCard />
          </section>

          {/**progress overview and tasks over time chart section */}

          <section className="statisticsChart-container">
              <ProgressOverview tasks={selectedTasks } />
              <TaskOverTimeChart tasks={selectedTasks }  />
          </section>
            {/**taskbycategory chart und productivity chart */}
          <section className="statisticsChart-container" >
              <TaskByCategoryChart tasks={selectedTasks } />
              <ProductivityInsight tasks={selectedTasks} time={time } />
          </section>
          <div className="statisticspage-text">
              keep tracking. keep growing.You are doing amazing!💜
          </div>
          
    </div>
  )
}

export default StatisticsPage
