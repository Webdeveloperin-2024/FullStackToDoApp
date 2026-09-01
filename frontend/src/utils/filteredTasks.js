
export const getFilteredTasks = ({
  tasks,
  search,
  selectedCategory,
  prioritat,
  sorted
}) => {

  let result = [...tasks];


  // Search
  if (search.trim()) {
    result = result.filter(task =>
      task.task
        ?.toLowerCase()
        .includes(search.trim().toLowerCase())
    );
  }


  // Category
  if (selectedCategory) {
    result = result.filter(task =>
      task.categoryId === selectedCategory
    );
  }


  // Priority
  if (prioritat) {
    result = result.filter(task =>
      task.priority === prioritat
    );
  }


  // Sort
  switch (sorted) {

    case "newest":
      result.sort(
        (a,b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      break;


    case "oldest":
      result.sort(
        (a,b) =>
        new Date(a.createdAt) - new Date(b.createdAt)
      );
      break;


    case "dueDate":
      result.sort(
        (a,b) =>
        new Date(a.deadline) - new Date(b.deadline)
      );
      break;


    case "alphabetical":
      result.sort(
        (a,b) =>
        a.task.toLowerCase()
        .localeCompare(
          b.task.toLowerCase()
        )
      );
      break;


    default:
      return result;
  }


  return result;
};




