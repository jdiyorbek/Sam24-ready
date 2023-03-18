const express = require("express");
const app = express();
const router = express.Router();
const AdminModel = require("../models/admin");
const ArticleModel = require("../models/article");
const AdModel = require("../models/ad")
const path = require("path")
const fileUpload = require("express-fileupload");
app.use(fileUpload());

// router.get("*", async (req, res) => {
//   const adminData = await AdminModel.findOne();
//   if (req.session.userID == adminData._id) {
//     res.render("dashboard");
//   } else {
//     res.redirect("/admin");
//   }
// })

router.get("*", async(req, res, next) => {
    const adminData = await AdminModel.findOne();
    console.log(adminData)
    if (req.session.userID == adminData._id) {
        next()
    } else if (req.originalUrl == "/admin") {
        res.render("admin")
    } else {
        res.redirect("/admin")
    }
});

router.get("/", async(req, res) => {
    res.redirect("/admin/dashboard");
});

router.post("/", async(req, res) => {
    const adminData = await AdminModel.findOne();
    if (
        adminData.login == req.body.login &&
        adminData.password == req.body.password
    ) {
        req.session.userID = adminData.id;
        res.redirect("/admin/dashboard");
    } else {
        res.redirect("/");
    }
});

router.get("/dashboard", (req, res) => {
    res.render("dashboard");
});

router.get("/add-ads", async(req, res) => {
    res.render("addAds");
});

router.post("/add-ads", async(req, res) => {
    const { img } = req.files
    img.mv(path.resolve(__dirname, "../public/adsImg", img.name))
    AdModel.create({
        url: req.body.url,
        view: req.body.view,
        img: img.name,
    });
    res.redirect("/")
});

router.get("/articles", async(req, res) => {
    // console.log(req.params)
    const articles = await ArticleModel.find()
        // const articles = await ArticleModel.find().skip((parseInt(req.params.page) * 2) - 2).limit(2)
    res.render("articles", { articles });
})

// router.get("/articles/:page", async(req, res) => {
//     console.log(req.params)
//     const adminData = await AdminModel.findOne();
//     const articles = await ArticleModel.find()
//         // const articles = await ArticleModel.find().skip((parseInt(req.params.page) * 2) - 2).limit(2)
//     if (req.session.userID == adminData._id) {
//         res.render("articles", { articles });
//     } else {
//         res.redirect("/admin");
//     }
// })

router.get("/create-article", async(req, res) => {
    res.render("createPost");
});

router.post("/create-article", async(req, res) => {
    const { img } = req.files;
    // const rename = Math.floor(Math.random() * 10000) + Math.floor(Math.random() * 10000)
    img.mv(path.resolve(__dirname, "../public/articlesImg", img.name))
    ArticleModel.create({
        title: req.body.title,
        text: req.body.text,
        description: req.body.description,
        type: req.body.type,
        img: img.name,
    });
    res.redirect("/")
});

router.get("/edit-article/", async(req, res) => {
    res.redirect("./articles");
});


router.get("/edit-article/:id", async(req, res) => {
    const article = await ArticleModel.findById(req.params.id);
    res.render("editPost", { article });
});

router.post("/edit-article/:id", async(req, res) => {
    await ArticleModel.findByIdAndUpdate(req.params.id, {...req.body })
    res.redirect(`/article/${req.params.id}`)
})

router.get("/delete-article/:id/", async(req, res) => {
    await ArticleModel.findByIdAndDelete(req.params.id)
    res.redirect("/admin/articles");
});

router.get("/admins", async(req, res) => {
    const admins = await AdminModel.find()
    res.render("admins", { admins: admins });
    // const adminData = await AdminModel.findOne();
    // if (req.session.userID == adminData._id) {
    //     await ArticleModel.findByIdAndDelete(req.params.id)
    //     res.redirect("/admins");
    // } else {
    //     res.redirect("/admin");
    // }
});

router.get("/admins/add", async(req, res) => {
    res.render("addAdmin");
    // const adminData = await AdminModel.findOne();
    // if (req.session.userID == adminData._id) {
    //     await ArticleModel.findByIdAndDelete(req.params.id)
    //     res.redirect("/admins");
    // } else {
    //     res.redirect("/admin");
    // }
});

router.post("/admins/add", async(req, res) => {
    await AdminModel.create({...req.body })

    res.redirect("/admin/admins");
    // const adminData = await AdminModel.findOne();
    // if (req.session.userID == adminData._id) {
    //     await ArticleModel.findByIdAndDelete(req.params.id)
    //     res.redirect("/admins");
    // } else {
    //     res.redirect("/admin");
    // }
});

// router.get("/admins/edit/", async(req, res) => {
//     const chosenAdmin = await AdminModel.findOne()
//     console.log(chosenAdmin)
//     res.render("editAdmin", { chosenAdmin });
// });

router.get("/admins/edit-admin/:id", async(req, res) => {
    const chosenAdmin = await AdminModel.findById(req.params.id);
    console.log(chosenAdmin)
        // const chosenAdmin = await AdminModel.findById(req.params.id);
    res.render("editAdmin");
});

router.get("/delete-admin/:id", async(req, res) => {
    await AdminModel.findByIdAndDelete(req.params.id);
    res.redirect("/admin/admins")
});

module.exports = router;