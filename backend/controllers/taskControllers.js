import TaskModel from "../models/task.model.js"
import CategoryModel from "../models/category.model.js"


export const createTaskController = async (req, res) => {
    try {
        const { task, categoryId,deadline,priority } = req.body

        if (!task || !categoryId || !deadline || !priority) {
            return res.status(400).json({message:"Fill required fields"})
        }

        const categoryExists = await CategoryModel.findById(categoryId);

                if (!categoryExists) {
                return res.status(404).json({
                 message: "Category not found",
                });
                }

        const newTask = new TaskModel({
            task,
            categoryId,
            completed: false,
            userId: req.userId,
            priority,
            deadline
        })

        const savedTask = await newTask.save()

        return res.status(201).json({
            message: "Task created successfully",
            success:true,
            task:savedTask
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
        })
        
    }
}



export const getTasksController = async (req, res) => {
    try {
          
    const tasks = await TaskModel.find({
      userId: req.userId,
    });

    return res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
    });
  }
};




export const getTaskByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params
        
        if (!categoryId) {
            return res.status(400).json({
                message:"provide category id"
            })
        }

        const tasks = await TaskModel.find({
            categoryId:{$in:categoryId},
            userId:req.userId
        }).limit(5).populate("categoryId")

        return res.status(200).json({
            message: "Category s Task List",
            data:tasks
        })



    } catch (error) {
        return res.status(500).json({
            message: error.message || error
        })
        
    }
}

export const updateTaskController = async (req,res) => {

    try {
        const { id } = req.params;
          const { task, completed, priority, deadline, categoryId,  archived,reminder,completedAt } = req.body;
        
        if (!id) {
            return res.status(400).json({
                message:"provide task id"
            })
        }

        const updateTask = await TaskModel.findOneAndUpdate({_id:id,
            
            userId:req.userId
        },{ task,
        completed,
        priority,
        deadline,
            categoryId,
            archived, reminder,
            completedAt
            
        }, { returnDocument: "after" })

        return res.status(200).json({
            message: "updated successfully",
            data:updateTask
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message || error
        })
    }
}

export const deleteTaskController = async (req, res) => {

    try {
        const {_id}= req.params.id
        if (!_id) {
            return res.status(400).json({
                message:"provide id"
            })
        }

        const deleteTask = await TaskModel.findOneAndDelete( {_id,userId:req.userId})
        
        return res.status(200).json({
            message: "Task Deleted Successfully",
            data:deleteTask
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message|| error
        })
    }
}