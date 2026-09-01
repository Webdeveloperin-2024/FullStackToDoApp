import React from 'react'
import "./CategorySelect.css"
import {useCategories} from "../../context/CategoriesContext"




const CategorySelect = ({ value, onChange }) => {
  
  const { categories } = useCategories()
  console.log("categoriesselect", categories)
  
const handleChange = (e) => {
  onChange(e.target.value);
};


  return (
    
          <div className="form-group">
            <label htmlFor="category">Category:</label>
          <select  value={value} onChange={handleChange}  >
        <option value="" id="category"  >Select Category</option>

            {categories.map((cat, index) => (
              <option key={cat._id || index} value={cat._id}>
                {console.log("cat._id",value)}
                {cat.title}
             </option>
             ))}
            </select>
          </div>
  )
}

export default CategorySelect
