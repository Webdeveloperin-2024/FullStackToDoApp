import CategoryModel from "../models/category.model.js"

export const AddCategoryController = async (req, res) => {
    
    try {
        const {title,img}= req.body
        
        if (!title || !img) {
            return res.status(400).json({
                message:"fill required fields"
            })
        }

        const existingCategory = await CategoryModel.findOne({
          title,
          userId:req.userId
});

if (existingCategory) {
  return res.status(400).json({
    message: "Category already exists"
  });
}

        const newCategory = new CategoryModel({
            title,
            img,
            userId:req.userId
        })

        const savedCategory = await newCategory.save()

       

        return res.status(201).json({
            message: "Add Category Successfully",
            data:savedCategory
        })

    } catch (error) {
        return res.status(500).json({
            message:error.message || error 
        })
    }
}

export const getCategoryController = async (req,res) => {
    try {

        const categories = await CategoryModel.find()

        return res.status(200).json({
          data: categories,
          success:true
        })
        
    } catch (error) {
        return res.status(500).json({
          message: error.message || error,
          success:false
        })
    }

}



export const deleteCategoryController = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({
        message: "provide category id",
      });
    }

    const deletedCategory = await CategoryModel.findByIdAndDelete({_id,userId:req.userId});

    if (!deletedCategory) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    return res.status(200).json({
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
    });
  }
};