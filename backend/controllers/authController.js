const User = require("../models/User");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// create json web token
const maxAge = 10 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "net ninja secret", {
    expiresIn: maxAge,
  });
};

module.exports.signup_post = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      maxAge: maxAge * 1000,
      secure: true,
      httpOnly: true, // Cookie is not accessible through JavaScript (security)
      sameSite: "none", // Allow cross-site access (important for cross-origin)
    });
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      today_views: user.today_views,
      posts_read: user.posts_read,
      posts_liked: user.posts_liked,
      following: user.following,
      posts_written: user.posts_written,
      maxViews: user.maxViews,
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    console.log("kfldksf", token, user._id);
    res.cookie("jwt", token, {
      maxAge: maxAge * 1000,
      secure: true,
      httpOnly: true, // Cookie is not accessible through JavaScript (security)
      sameSite: "none", // Allow cross-site access (important for cross-origin)
    });
    console.log(user.today_views);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      posts_read: user.posts_read,
      posts_liked: user.posts_liked,
      following: user.following,
      posts_written: user.posts_written,
      today_views: user.today_views,
      maxViews: user.maxViews,
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 1,
    secure: true,
    httpOnly: true, // Cookie is not accessible through JavaScript (security)
    sameSite: "none", // Allow cross-site access (important for cross-origin)
  });
  res.status(200).json("");
};

// controller actions
// module.exports.signup_get = (req, res) => {
//   res.render('signup');
// }

// module.exports.login_get = (req, res) => {
//   res.render('login');
// }

// module.exports.question_get = (req, res) => {
//   res.render('addquestion');
// }

// module.exports.question_post = async(req,res) => {

//   console.log("alia");
//   var x = await Topic.find({ topic : req.body.topic });
//   var id = x[0]._id;
//   req.body.topic = id;
//   console.log(req.body);

//   var data = new Question(req.body);
//  data.save()
//   .then(item => {
//     console.log("data is saved");
//   })
//  .catch(err => {
//     console.log(err);
//   })

// }

// module.exports.addexperience_get = (req,res) =>{
//   res.render('addexperience');
// }

// module.exports.topic_get = (req, res) => {
//   Topic.find({},(err,data)=> {
//     if(err){
//       console.log(err)
//     }else{

//       res.render('practise',{ topic : data});
//     }
//   }
//   )};

//   module.exports.addexperience_get = (req,res) =>{

//     res.render('addexperience');
//   }

//   module.exports.addexperience_post = async(req,res) => {

//    var phew = req.body.company;

//    console.log(req.body);
//     var x = await Company.find({ name : req.body.company });
//     console.log(x);
//      var id = x[0]._id;
//      req.body.company = id;

//   var data = new Experience(req.body);
//    data.save()
//     .then(item => {
//       console.log("data is saved");
//     })
//    .catch(err => {
//       console.log(err);
//     })
//   }
