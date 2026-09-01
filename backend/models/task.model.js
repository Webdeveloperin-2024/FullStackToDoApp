import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    
    task: {
        type: String,
        required: true,
        trim:true
    },
    categoryId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true,
    },
    completed: {
        type: Boolean,
        default:false
    },
    completedAt: {
         type: Date,
         default: null
},
     userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
    },
    deadline: {
        type: String,
        required:true
    },
    priority: {
        type: String,
        enum: ["High", "Medium", "Low"],
        default:"Medium"
    },
    archived: {
        type: Boolean,
        default:false
    },
    reminder: {
        type: String,
        
    }
}, {
    timestamps:true
})


const TaskModel = mongoose.model("Task", taskSchema);

export default TaskModel