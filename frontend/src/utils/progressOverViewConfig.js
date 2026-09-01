import {getArchivedTasks,getOverdueTasks , getPendingTasks,getCompletedTasks } from "./taskStats"


export const progressOverviewConfig = {
    completed: {
        label: "Completed",
        backgroundColor: "var(--violet-600)",
        getValue: getCompletedTasks,
        color: "var(--violet-600)"
    },

    pending: {
        label: "Pending",
         backgroundColor:  "orange",
        getValue: getPendingTasks,
        color: "orange"
    },

    overdue: {
        label: "Overdue",
         backgroundColor: "red",
        getValue: getOverdueTasks,
        color:"red",
    },
    archived: {
        label: "Archived",
         backgroundColor:  "var(--violet-300)",
        getValue: getArchivedTasks,
        color:"var(--violet-300)"
    }
}