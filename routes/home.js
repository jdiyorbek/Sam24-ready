const { Router } = require("express");
const router = Router();
const ArticleModel = require("../models/article");

router.get("/", async (req, res) => {
  const lastArticles = await ArticleModel.find({}, [], {
    limit: 6,
  }).sort({ date: -1 });
  const popularArticles = await ArticleModel.find({}, [], {
    limit: 6,
  }).sort({ view: -1 });
  res.render("index", { lastArticles, popularArticles });
});
module.exports = router;
