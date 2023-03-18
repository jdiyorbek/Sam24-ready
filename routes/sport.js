const { Router } = require("express");
const router = Router();
const ArticleModel = require("../models/article");

router.get("/", async(req, res) => {
    const articles = await ArticleModel.find({
        type: "sport",
    }, []).sort({ date: -1 })
    res.render("posts", { articles });
});

module.exports = router;