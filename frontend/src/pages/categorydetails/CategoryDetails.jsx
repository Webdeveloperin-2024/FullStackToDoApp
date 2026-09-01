import React,{useState} from 'react'
import "./CategoryDetails.css"
import TaskCard from "../../components/taskCard/TaskCard"
import { useTask } from "../../context/TaskContext"
import { useParams } from 'react-router-dom'
import { useCategories } from "../../context/CategoriesContext"
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom"
import { CiEdit } from "react-icons/ci";
import { categoryIcons } from "../../assets/assets"
import {
  getCompletedTasks, getProgress, getOverdueTasks,
  getArchivedTasks,  getEmptyMessage, getCategoryInsight,filterTasksByTab ,getSearchMessage
} from "../../utils/taskStats"
import  CircularProgress from "../../components/circularprogress/CircularProgress"
import CategoryTabs from "../../components/categorytabs/CategoryTabs"
import { IoSearchOutline } from "react-icons/io5";
import AddTaskModal from "../../components/addTaskModal/AddTaskModal"
import { LuClipboardList } from "react-icons/lu";
import { FaCheckSquare, FaTasks, FaFire } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import Loading from "../../components/loading/Loading";


const CategoryDetails = () => {

  const { tasks, setTasks ,taskLoading} = useTask()
  const { categoryId } = useParams();
  const { categories } = useCategories()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState("All")
  const [searchInCategory,setSearchInCategory]=useState("")
  
  const category = categories.find(category => category._id === categoryId)
  console.log("categorypage", category)
  
    const categoryTasks = tasks.filter(
   task => task.categoryId === categoryId
  );
  console.log("categorypagecategoryTasks ",categoryTasks )
const tasksinCategory= categoryTasks.filter(task=>task.task.trim().toLowerCase().includes(searchInCategory.trim().toLowerCase()))
 console.log("tasksinCategory",tasksinCategory)
  
  const completedTasks = getCompletedTasks(categoryTasks).length
  const archivedTasks = getArchivedTasks(categoryTasks).length
  const progress = getProgress(categoryTasks)
  const overdueTasks = getOverdueTasks(categoryTasks).length
  
  const Icon = category &&  categoryIcons[category?.icon]

  const taskList = filterTasksByTab (tasksinCategory, activeTab)
  const insight = getCategoryInsight(categoryTasks, activeTab)
  const searchMessage = getSearchMessage(tasksinCategory,searchInCategory);
  return (
    <div className="categorypage-container">
      <div  style={{
        backgroundImage: ` url(/categories/${category.image})`,
         backgroundSize: "cover",
        backgroundPosition: "center",
     background: "linear-gradient(rgba(88, 28, 135, 0.55),rgba(124, 58, 237, 0.45),"
      }}
       
        className="categorypage-background">
        {/**header section */}
         <div className="categorypage-header">
        <div className="categorypage-header-left">
        
            <button className="categorypage-header-left-icon"
              onClick={() => {
    console.log("clickedcategorypage");
    navigate("/dashboard");
              }}>
              <FaArrowLeft />
              Back in Dashboard
              </button>
             
          </div>
          <div className="categorypage-header-right">
            <div className="categorypage-header-right-icon"><CiEdit /></div>
          <p>Edit Category</p>
          </div>
        </div>
        {/**describtion section */}
        <div className="categorypage-desc">
          <div className="categorypage-title">
            <div className="categorypage-desc-icon">{Icon && <Icon/>}</div>
            <h2>{category.title}</h2>
          </div>
          
           <div className="categorypage-desc-desc">
                  <p>{category.description}</p>
            </div>
        </div>
        
        <hr />
        {/**stats section */}
                  <section className="categorypage-stats">
            
            <div className="categorypage-stat-card">
              <div className="categorypage-stat-icon">
                   <FaTasks  />
              </div>

            <div className="categoryppage-stat-content">
               <h3 className="categorypage-stat-value">
                  {categoryTasks.length}
                </h3>
                <p className="categorypage-stat-label">
                Total tasks
                </p>
               
              </div>
            </div>

           <div className="categorypage-stat-card">
              <div className="categorypage-stat-icon">
                 <FaCheckSquare/> 
              </div>

            <div className="categoryppage-stat-content">
               <h3 className="categorypage-stat-value">
                  {completedTasks}
                </h3>
                <p className="categorypage-stat-label">
                  Completed
                </p>
               
              </div>
            </div>

          
           <div className="categorypage-stat-card">
              <div className="categorypage-stat-icon">
                  <FaFire   /> 
              </div>

            <div className="categoryppage-stat-content">
               <h3 className="categorypage-stat-value">
                  {overdueTasks}
                </h3>
                <p className="categorypage-stat-label">
                  Overdue Tasks
                </p>
               
              </div>
            </div>

          
           <div className="categorypage-stat-card">
              <div className="categorypage-stat-icon">
                < CircularProgress progress={progress}  startAngle={-90}/>
              </div>

            <div className="categoryppage-stat-content">
               <h3 className="categorypage-stat-value">
                {progress}%
                </h3>
                <p className="categorypage-stat-label">
                progress
                </p>
               
              </div>
            </div>


          </section>
      </div>
     
      <div className="categorypage-content-container">
        <div className="categorypage-content">
         {/**left section */}
          <div className="categorypage-content-left">
            < CategoryTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
          {/** right section*/}
          <div className="categorypage-content-right">
            <div className="categorypage-content-search">
             <IoSearchOutline className="search-icon" />
              <input
                type="text"
                placeholder={`Search in ${category.title}...`}
                value={searchInCategory}
                onChange={(e) =>  setSearchInCategory(e.target.value) }
                    
                
               
              />
            </div>
            {/**add button */}
              <div className="btn-container">
    <button className="add-btn" onClick={() => setShowModal(true)}>
      <FaPlus className="add-icon" /><span className="btn-container-text">Add Task</span> 
            </button>
            </div> 
             {/**show modal */}
      {showModal && <AddTaskModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        
      />}

          </div>
         
        </div>
        {/**filtered tasks display */}
      <div className="taskcard-container">

  {taskLoading ? (
    <Loading small />
  ) : taskList?.length > 0 ? (
    taskList.map((task) => (
      <TaskCard 
        key={"categorypage" + task._id} 
        task={task} 
      />
    ))
  ) : (
    <div className="categorypage-empty">
      <LuClipboardList />

      <h3 className="categorypage-empty-title">
        {getEmptyMessage(activeTab)}
      </h3>
    </div>
  )}

</div>
       
        {/**message container */}
       {taskList.length > 0 && (insight || searchInCategory) && (
  <div className="categorypage-insight-card">

    <div className="categorypage-insight-content">

      {searchInCategory ? (
        <>
          <h3 className="categorypage-insight-title">
            Search Result
          </h3>

          <p className="categorypage-insight-text">
            {searchMessage}
          </p>
        </>
      ) : (
        <>
          <h3 className="categorypage-insight-title">
            {insight.title}
          </h3>

          <p className="categorypage-insight-text">
            {insight.text}
          </p>
        </>
      )}

    </div>

  </div>
)}
        

      </div>
    
             
          </div>
  )
}

export default CategoryDetails
