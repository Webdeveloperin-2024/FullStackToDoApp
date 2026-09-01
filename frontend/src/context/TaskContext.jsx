import { createContext,useContext,useState ,useEffect} from "react";
import api from "../services/axios"
import { useUser } from "./UserContext";

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
const { currentUser } = useUser();
  const [tasks, setTasks] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [taskLoading, setTaskLoading] = useState(false);


  const fetchTasks = async () => {
  try {
    setTaskLoading(true);

    const response = await api.get("/api/tasks");

    setTasks(
      response.data.data.filter(task => task && task._id)
    );

    return response;

  } catch (error) {
    console.log(error);

  } finally {
    setTaskLoading(false);
  }
};
  
  const addTask = async (taskData) => {
  try {
    const response = await api.post("/api/tasks", taskData);

      const newTask = response.data.task;

    setTasks((prev) => [...prev, newTask]);
    return response;
  } catch (error) {
    console.log(error);
  }
  };
  
  {/** const deleteTask = (id) => {
    setTasks(tasks.filter((task) => {
        return task._id!==id
      }))
  } */}
  
  const deleteTask = async (id) => {
  try {
    await api.delete(`/api/tasks/${id}`);

    setTasks((prev) =>
      prev.filter((task) => task._id !== id)
    );
  } catch (error) {
    console.log(error);
  }
};
 
  
{/** const updateTask = (id) => {
  setTasks((prev) =>
    prev.map((task) =>
      task._id === id
        ? { ...task, completed: !task.completed }
        : task
    )
  );
};
    
  }
*/}
  
  const updateTask = async (id, updatedData) => {
    console.log("SEND TO BACKEND:", updatedData);
  try {
    const response = await api.put(`/api/tasks/${id}`, updatedData);
    console.log("updatetask",response)
    const updatedTask = response.data.data;

    setTasks((prev) =>
      prev.map((task) =>
        task._id === id ? updatedTask : task
      )
    );

    return response 
  } catch (error) {
    console.log(error);
    }
   
  };


  const copyTask = async (task) => {

    try {
      const newTask = {
        ...task,
        
        task:task.task +"(copy)"
      }
      const response = await api.post("/api/tasks", newTask)
          setTasks(prev => [...prev, response.data.task]);

    return response
  } catch (error) {
    console.log(error)
  }
  }

  const cutTask = async (id, newCategoryId) => {
    try {
      const response = await api.put(`/api/tasks/${id}`, {
    categoryId: newCategoryId
      })
      
    setTasks(prev =>
    prev.map(task =>
      task._id === id ? response.data.task : task
    )
      );
      
        return response
    } catch (error) {
      console.log(error)
    }
  }


  const archiveTask = async (id) => {
    console.log("archivetaskusecontex",id)
    try {
      const response = await api.put(`/api/tasks/${id}`, {
        archived:true
      })
      console.log("archivecontext",response)

      setTasks(prev => prev.map(task=> 
        task._id=== id ? response.data.data : task)
      )

      return response
    } catch (error) {
      console.log(error)
    }
  
}

  const setReminder = async (id,date) => {
    try {
      const response = await api.put(`/api/tasks/${id}`, {
        reminder:date
      })

      setTasks(prev=>prev.map(task=>task._id ===id ? response.data.task :task))
    
    return response
    } catch (error) {
      
    }
}

const toggleComplete = (id, currentValue) => {
  return updateTask(id, {
    completed: !currentValue
  });
};
useEffect(() => {
  if (currentUser) {
    fetchTasks();
  } else {
    setTasks([]);
  }
}, [currentUser]);

  
  
  
 
  
  
  return (
    <TaskContext.Provider value={{
      tasks,
      setTasks, fetchTasks,
      deleteTask, addTask,
      updateTask, copyTask,
      cutTask, archiveTask, setReminder,
      toggleComplete, 
         taskLoading
    
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;

export const useTask = () => {
  return useContext(TaskContext);
};