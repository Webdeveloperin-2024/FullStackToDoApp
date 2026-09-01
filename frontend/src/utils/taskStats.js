import { isToday, isUpcoming, isUpcoming7Days } from "./dateUtils";


export const getTotalTasks = (tasks) => tasks;

export const getCompletedTasks = (tasks=[]) => {
  return tasks?.filter(task => task.completed)
}
export const getProgress = (tasks) => {
  if (tasks.length === 0) return 0;

  return Math.round(
    (getCompletedTasks(tasks).length / tasks.length) * 100
  );
};

export const getPendingTasks = (tasks) => tasks?.filter(task => !task?.completed);

export const getOverdueTasks = (tasks) => {
  const today = new Date().toLocaleDateString("en-CA")
  console.log(new Date().toLocaleDateString("en-CA"));
  return tasks?.filter(task => {
   
  if (!task?.deadline) return false;
 return !task.completed && task.deadline < today;
});
}

export const getArchivedTasks = (tasks) => {
    return tasks?.filter((task) => task.archived===true)
}

export const getTodayTasks = (tasks = []) => {
  return tasks.filter(task =>
    isToday(task.deadline)
  );
};


export const getUpcomingTasks = (tasks = []) => {
  return tasks.filter(task =>
    !task.completed && isUpcoming(task.deadline)
  );
};


export const getNext7DaysTasks = (tasks = []) => {
  return tasks.filter(task =>
    !task.completed && isUpcoming7Days(task.deadline)
  );
};

export const getThisMonthTasks = (tasks) => {
  const today = new Date();

  return tasks.filter((task) => {
    if (!task.deadline) return false;

    const deadline = new Date(task.deadline);

    return (
      deadline.getFullYear() === today.getFullYear() &&
      deadline.getMonth() === today.getMonth()
    );
  });
};


export const getThisYearTasks = (tasks) => {
  const today = new Date();

  return tasks.filter((task) => {
    if (!task.deadline) return false;

    const deadline = new Date(task.deadline);

    return deadline.getFullYear() === today.getFullYear();
  });
};

export const filterTasksByTab = (tasks, activeTab) => {

  switch(activeTab){

    case "Pending":
       
      return getPendingTasks(tasks);

    case "Completed":
      return getCompletedTasks(tasks);

    case "Overdue":
      return getOverdueTasks(tasks);

    case "Archived":
      return getArchivedTasks(tasks);

    
    case "Today":
    
      return getTodayTasks(tasks);


    case "Upcoming":
  
      return getUpcomingTasks(tasks);


    case "Next7Days":
    
      return getNext7DaysTasks(tasks);


    
    
    case "All":
    default:
      return tasks;
  }
};

export const getEmptyMessage = (activeTab) => {
  
 switch (activeTab) {
    case "Pending":
      return "No pending tasks.";

    case "Completed":
      return "No completed tasks yet.";

    case "Overdue":
      return "Great! No overdue tasks. 🎉";

    case "Archived":
      return "No archived tasks.";
    case "Today":
  return "No tasks for today.";

case "Upcoming":
  return "No upcoming tasks.";

    case "All":
    default:
      return "No tasks found.";
  }
};

export const getCategoryInsight = (tasks,activeTab) => {

  const total = tasks.length;
  const completed =  getCompletedTasks (tasks).length;
const pending = getPendingTasks(tasks).length;

const overdue = getOverdueTasks(tasks).length;
const archived = getArchivedTasks(tasks).length;
  switch(activeTab){

    case "All":
      return  {
        title: completed > 0 
          ? "Great progress! 🎉" 
          : "Let's get started! 🚀",

        text: completed > 0
          ? `You have completed ${completed} of ${total} tasks in this category.`
          : `You have ${total} tasks waiting to be completed.`
      };


    case "Pending":
      return {
        title: "Tasks waiting for you ⏳",
        text: `You have ${pending} pending tasks to complete.`
      };


    case "Completed":
      return {
        title: "Amazing work! 🎉",
        text: `You have completed ${completed} tasks in this category.`
      };


    case "Overdue":
      return {
        title: "Overdue tasks need attention ⚠️",
        text: `You have ${overdue} overdue tasks in this category.`
      };


    case "Archived":
      return {
        title: "Archived tasks 📦",
        text: `You have ${archived} archived tasks in this category.`
      };


    
  }
};

export const getSearchMessage = (tasks, search) => {

  if (!search.trim()) return "";

  if (tasks.length > 0) {
    return `${tasks.length} tasks found for "${search}".`;
  }

  return `No tasks found for "${search}".`;
};