require("dotenv").config();


const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const ExpressError = require("./util/ExpressError");
const listings =  require("./routes/listing");
const review = require("./routes/review");
const password = require('passport');
const User = require('./models/user');
const LocalStrategy = require('passport-local');
const userrouter = require('./routes/user');
const MongoStore = require("connect-mongo");
const session = require('express-session');
const flash = require('connect-flash');



app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
const dburl = process.env.ATLAS_DB_URL;

const store = MongoStore.create({
    mongoUrl: dburl,
    touchAfter: 24 * 3600,
});

store.on("error", (err)=>{
  console.log("error in mongo session" ,  err);
})

const sessionOption={
  store,
  secret: process.env.SECRET,
  resave:false,
  saveUninitialized: true,
  cookie:{
    expires: Date.now() + 7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,
  },
};


//connecting my server to database name StayScape here
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(dburl);
};


app.use(session(sessionOption));
app.use(flash());

app.use(password.initialize());
app.use(password.session());
password.use(new LocalStrategy(User.authenticate()));
password.serializeUser(User.serializeUser());
password.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

app.use('/listing' , listings);
app.use('/listing/:id/reviews', review);
app.use("/", userrouter);

app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found!!"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong" } = err;

  if (res.headersSent) {
    return next(err);
  }

  res.status(status);
  res.render("error.ejs", { message });
});

app.listen(8080, () => {
  console.log('server is  listening');
});
