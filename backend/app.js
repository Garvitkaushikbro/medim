const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const authorRoutes = require("./routes/authorRoutes");
const cookieParser = require("cookie-parser");

// const { requireAuth, checkUser } = require("./middleware/authMiddleware");
// const Topic = require("./models/topic");
// const Experience = require("./models/experience");
// const Company = require("./models/company");
// const Question = require("./models/question");
const cors = require("cors");

const app = express();
// Enable CORS for all routes
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend URL
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Add any other methods you use
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
// app.set("view engine", "ejs");

// database connection
const dbURI = "mongodb+srv://gk1:test1234@cluster0.mxtmn.mongodb.net/";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    app.listen(3001);
    console.log("server started");
  })
  .catch((err) => console.log(err));

// routes
app.use(authRoutes);
app.use(postRoutes);
app.use(authorRoutes);

// var data;
// var getdocument = async () => {
//   const result = await Company.find({});
//   data = result;
// };
// getdocument();

// app.get("*", checkUser);
// app.get("/", requireAuth, (req, res) => res.render("home"));
// //app.get('/smoothies', (req, res) => res.render('smoothies'));
// app.get("/topic/:name", async (req, res) => {
//   const a = req.params.name;
//   var topic = await Topic.find({ topic: a });
//   console.log(topic);
//   var id = topic[0]._id;
//   console.log(id);
//   console.log("alia bhatt");
//   const question = Question.find({ topic: id })
//     .then((result) => {
//       res.render("question", { b: result });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/experiences", (req, res) => {
//   res.locals.data = data;
//   console.log(data);
//   res.render("company");
// });

// app.get("/experiences/:name", async (req, res) => {
//   const a = req.params.name;
//   var company = await Company.find({ name: a });
//   console.log(company);
//   var id = company[0]._id;
//   console.log(id);
//   console.log("alia bhatt");
//   const experience = await Experience.find({ company: id })
//     .then((result) => {
//       console.log(result);
//       res.render("experience", { b: result });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
