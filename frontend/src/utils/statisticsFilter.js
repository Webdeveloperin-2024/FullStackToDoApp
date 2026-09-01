import { getTodayTasks,getNext7DaysTasks ,getThisMonthTasks,getThisYearTasks} from "./taskStats";

export const getStatisticsTasks = (tasks, time) => {
  switch (time) {
    case "Today":
      return getTodayTasks(tasks);

    case "This Week":
      return getNext7DaysTasks(tasks);

    case "This Month":
      return getThisMonthTasks(tasks);

    case "This Year":
      return getThisYearTasks(tasks);

    case "All Time":
    default:
      return tasks;
  }
};


export const getMostProductivePeriod = (tasks) => {
  if (!tasks || tasks.length === 0) return null;

  const grouped = tasks.reduce((acc, task) => {
      if (!task.deadline) return acc;
    const date = task.deadline
     
    if (!acc[date]) {
      acc[date] = {
        total: 0,
        completed: 0
      };
    }

    acc[date].total++;

    if (task.completed) {
      acc[date].completed++;
    }

    return acc;

  }, {});


  const productivityData = Object.entries(grouped).map(
    ([date, value]) => ({
      date,
      total: value.total,
      completed: value.completed,
      rate: value.total === 0
        ? 0
        : (value.completed / value.total) * 100
    })
  );

  if (productivityData.length === 0) return null;
  return productivityData.sort(
    (a, b) => b.rate - a.rate
  )[0];
};


export const getDailyAverage = (tasks, days) => {

  if (!tasks || tasks.length === 0) return 0;

  return Math.round(tasks.length / days);

};

export const getDaysByRange = (time) => {
  switch(time){
    case "Today":
      return 1;

    case "This Week":
      return 7;

    case "This Month":
      return 30;

    case "This Year":
      return 365;

    default:
      return 1;
  }
};