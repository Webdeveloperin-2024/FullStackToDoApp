import React from 'react'
import "./CategoryTabs.css"




const CategoryTabs = ({ activeTab, setActiveTab }) => {

    
    
  
    

const tabs = ["All","Pending","Completed","Overdue","Archived"];

  return (
    <div  className="tabs-container">
         {tabs.map(tab => (
            <div
              key={tab}
              className={`tab-item ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
        ))}
    </div>
  )
}

export default CategoryTabs
