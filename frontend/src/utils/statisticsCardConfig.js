import { FaTasks } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { TbClockHour4 } from "react-icons/tb";
import { FaExclamationTriangle } from "react-icons/fa";
import { FaArchive } from "react-icons/fa";
import {getTotalTasks,getCompletedTasks,getPendingTasks ,getOverdueTasks, getArchivedTasks } from "./taskStats"

export const statisticsCardConfig =  {
    
    total: {
        label: "Total Tasks",
        iconColor: "var(--violet-200)",
        icon: FaTasks,
        iconBackground: "var(--violet-500)",
        getValue:getTotalTasks
        
    },
    completed: {
        label: "Completed",
        iconColor:"var(--violet-200)",
        icon: FaCheckCircle,
        iconBackground: "green",
         getValue:getCompletedTasks ,
    },
    pending: {
        label: "Pending",
        iconColor: "var(--violet-200)",
        icon: TbClockHour4,
        iconBackground: "orange",
         getValue:getPendingTasks,
    },
    overdue: {
        label: "Overdue",
        iconColor: "var(--violet-200)",
        icon: FaExclamationTriangle,
        iconBackground: "red",
         getValue:getOverdueTasks ,
    },
    archived: {
        label: "Archived",
        iconColor: "var(--violet-200)",
        icon: FaArchive,
        iconBackground: "var(--violet-300)",
         getValue: getArchivedTasks
    }
}