const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const CourseSchema = require("../models/Course");
const connectDB = require("../db/connect");

console.log("hshh");

try {
  const connect = connectDB(process.env.MONGO_URI);
  var Course = connect.model("hk1", CourseSchema, "HK1-2223");
  console.log("connected to the database");
} catch (err) {
  console.log({ error: err });
}
const logCourse = async () => {
  const course = await Course.deleteMany({
    title: "Cấu trúc dữ liệu và giải thuật",
    code: "INT2210",
    credits: 4,
    instructor: "TS.Tạ Việt Cường",
    schedule: [
      {
        day: "Tuesday",
        start: 3,
        end: 4,
        group: 0,
        location: "103-G2",
      },
      {
        day: "Wednesday",
        start: 7,
        end: 8,
        group: 1,
        location: "308-G2",
      },
      {
        day: "Wednesday",
        start: 5,
        end: 6,
        group: 2,
        location: "308-G2",
      },
    ],
  });
  const b = await Course.deleteMany({ credits: 4 });
  console.log(b);
};

logCourse();
