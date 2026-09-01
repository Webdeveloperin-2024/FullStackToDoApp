import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        
        trim:true,
    },
    icon: {
        type: String,
        default:"",
        },
    
    image: {
        type: String,
        default:"",
    },
    description: {
        type: String,
        required:true,
    }
   
}, {
    timestamps:true
})

categorySchema.index(
  { title: 1 },
  { unique: true }
)

const CategoryModel = mongoose.model("Category", categorySchema)

export default CategoryModel