const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const CourseSchema = require("../models/Course");
const connectDB = require("../db/connect");


try {
  const connect = connectDB(process.env.MONGO_URI);
  var Course = connect.model("course", CourseSchema, "HK1-2324");
  console.log("connected to the database");
} catch (err) {
  console.log({ error: err });
}
const logCourse = async () => {
  fetch("http://localhost:8000/asset/HK1-2324.json")
    .then((response) => response.json())
    .then((data) => {
      const dataArray = data;
      dataArray.forEach(async function (e) {
        const b = await Course.create(e);
        console.log(b);
      });
    })
    .catch((error) => console.error(error));
};

logCourse();
