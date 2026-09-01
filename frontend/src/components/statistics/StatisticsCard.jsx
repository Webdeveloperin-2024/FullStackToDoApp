import React from 'react'
import "./StatisticsCard.css"
import { statisticsCardConfig} from "../../utils/statisticsCardConfig"
import { useTask } from "../../context/TaskContext"


const StatisticsCard = () => {

const {tasks}= useTask()
    

    return (

        Object.entries(statisticsCardConfig).map(([key, card]) => {
            const Icon = card.icon;
            const value = card.getValue(tasks).length
            return (
            <div className="statistics-card">
                    <div  className="statistics-card-icon">
                         <div className="statistics-card-icon-icon"    style={{
                color: card.iconColor,
                        backgroundColor: card.iconBackground,
                
              }}>
                    <Icon />
                </div>
               </div>
                <div className="statistics-card-desc">
                    <h4> {card.label}</h4>
                        <p>{value }</p>
                </div>
                </div>
            )
})
        
   
  )
}

export default StatisticsCard
