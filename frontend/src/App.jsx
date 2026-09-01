import React, { useState, useEffect } from "react";
import "./index.css";

import defaultCategoryImg from "./assets/default.png";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import { UserProvider } from "./context/UserContext";
import api from "./services/axios";
import DashboardLayout from "./layout/DashboardLayout";
import CategoryDetails from "./pages/categorydetails/CategoryDetails";
import MyTasks from "./pages/mytasks/MyTasks";
import TaskProvider from "./context/TaskContext";
import CategoriesProvider from "./context/CategoriesContext";
import CalendarPage from "./pages/calendarpage/CalendarPage";
import StatisticsPage from "./pages/statisticspage/StatisticsPage"
import SettingPage from "./pages/settingpage/SettingPage";


const App = () => {

  return (
     
    <CategoriesProvider>
      <UserProvider>
        <TaskProvider>
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />

                <Route path="tasks" element={<MyTasks />} />
                <Route
                  path="category/:categoryId"
                  element={<CategoryDetails />}
                />
                <Route path="calendar" element={<CalendarPage />} />
                <Route path="statistic" element={<StatisticsPage />} />
                <Route path="settings"  element={<SettingPage/>} />
              </Route>
            </Routes>
          </div>
        </TaskProvider>
      </UserProvider>
    </CategoriesProvider>
  );
};

export default App;
