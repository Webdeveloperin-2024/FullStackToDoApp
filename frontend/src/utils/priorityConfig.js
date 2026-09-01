// utils/priorityConfig.js

import { FaArrowUp, FaArrowRight, FaArrowDown } from "react-icons/fa";

export const priorityConfig = {
  High: {
    label: "High",
    color: "var(--violet-200)", // red
    icon: FaArrowUp,
    backgroundColor: "var(--violet-600)",
   
  },
  Medium: {
    label: "Medium",
    color: "var(--violet-700)", // orange
    icon: FaArrowRight,
    backgroundColor: "var(--violet-300)",
   
  },
  Low: {
    label: "Low",
    color: "var(--violet-400)", // green
    icon: FaArrowDown,
    backgroundColor:"var(--violet-200)",
   
  },
};
