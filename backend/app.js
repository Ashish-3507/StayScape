const path = require('path');
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const methodOverride = require('method-override');
const cors = require("cors");
const ExpressError = require("./util/ExpressError");
const listings =  require("./routes/listing");
const review = require("./routes/review");
const passport = require('passport');
const User = require('./models/user');
const LocalStrategy = require('passport-local');
const userrouter = require('./routes/user');
const MongoStore = require("connect-mongo");
const session = require('express-session');
const flash = require('connect-flash');



app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
const dburl = process.env.MONGOOSE_URL;

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
  console.log("Connected to DB");
};


app.use(session(sessionOption));
app.use(flash());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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

  res.status(status).json({ success: false, error: message });
});

if (require.main === module) {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`server is listening on port ${PORT}`);
    });
}

module.exports = app;
