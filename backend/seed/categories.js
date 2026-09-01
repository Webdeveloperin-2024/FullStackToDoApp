import mongoose from "mongoose";
import CategoryModel from "../models/category.model.js";
import dotenv from "dotenv";
dotenv.config();

const categories = [
  {
    title: "Work",
    description:
      "Stay on top of your work tasks, meet deadlines, and keep every project moving forward. Small steps every day lead to big achievements.",
    icon: "MdWork",
    image: "work.jpg",
  },
  {
    title: "Education",
    description:
      "Keep learning, explore new ideas, and grow your skills. Every lesson you complete brings you one step closer to your goals.",
    icon: "FaBook",
    image: "education.jpg",
  },
  {
    title: "Shopping",
    description:
      "Plan your shopping, avoid forgetting important items, and enjoy a smoother shopping experience without the last-minute stress.",
    icon: "FaShoppingBag",
    image: "shopping.jpg",
  },
  {
    title: "Finance",
    description:
      "Track your finances, stay organized, and make smarter money decisions. A little planning today can make a big difference tomorrow.",
    icon: "FaChartLine",
    image: "finance.jpg",
  },
  {
    title: "Coding",
    description:
      "Build projects, solve problems, and improve your coding skills one task at a time. Every line of code is progress.",
    icon: "FaLaptopCode",
    image: "coding.jpg",
  },
  {
    title: "Health",
    description:
      "Take care of yourself with healthy habits and simple daily goals. Your health is worth every little effort.",
    icon: "IoFitness",
    image: "health.jpg",
  },
  {
    title: "Travel",
    description:
      "Plan your next adventure, organize your travel tasks, and enjoy the journey with everything ready before you go.",
    icon: "GiCommercialAirplane",
    image: "travel.jpg",
  },
  {
    title: "Personal",
    description:
      "Keep your personal life organized, focus on what matters most, and create more time for yourself and the people you care about.",
    icon: "GoPersonFill",
    image: "personal.jpg",
  },
  {
    title: "Fitness",
    description:
      "Stay active, build healthy routines, and celebrate every workout. Every small step gets you closer to a stronger you.",
    icon: "IoIosFitness",
    image: "fitness.jpg",
  },
];
const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    await CategoryModel.deleteMany()
    await CategoryModel.insertMany(categories);

    console.log("Categories added");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seed(); 
