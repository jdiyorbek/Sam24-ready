const express = require("express");
const app = express();
const expressEdge = require("express-edge");
const mongoose = require("mongoose");
const ArticleModel = require("./models/article");
const AdModel = require("./models/ad");
const AdminModel = require("./models/admin");
const security = require("./security/data");
const expressSession = require("express-session");
const fileUpload = require("express-fileupload");
const path = require("path");

// ROUTES

const homeRouter = require("./routes/home");
const economyRouter = require("./routes/economy");
const sportRouter = require("./routes/sport");
const policyRouter = require("./routes/policy");
const articleRouter = require("./routes/article");
const contactRouter = require("./routes/contact");
const adminRouter = require("./routes/admin");

// ROUTES

// MIDDLEWARE

// const middlewareAuth = require("./middleware/auth");

// MIDDLEWARE

// const MongoUrl = "mongodb+srv://jdiyorbek:rosALPrR8ji63w25@cluster0.h2d06qj.mongodb.net/node-blog"

const MongoUrl = "mongodb+srv://Admin:adminjon@sam24.oipdrdw.mongodb.net/Sam24";
mongoose.connect(MongoUrl);
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected succesfully");
});

app.use(express.static("public"));
app.use(fileUpload());
app.use(expressEdge.engine);
app.set("views", `${__dirname}/views`);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: "jdiyorbek",
    resave: false,
    saveUninitialized: false,
  })
);

// app.use(middlewareAuth);

app.use("/", homeRouter);
app.use("/economy", economyRouter);
app.use("/sport", sportRouter);
app.use("/policy", policyRouter);
app.use("/article", articleRouter);
app.use("/contact", contactRouter);
app.use("/admin", adminRouter);

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/admin");
  });
});

app.use((req, res) => {
  res.render("404");
});

app.listen(3025, (req, res) => {
  console.log("Server ishga tushdi...");
});
