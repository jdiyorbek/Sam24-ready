const { Router } = require("express");
const router = Router();
const ArticleModel = require("../models/article");

router.get("/", async (req, res) => {
  const articles = await ArticleModel.find(
    {
      type: "policy",
    },
    { limit: 0 }
  ).sort({ date: -1 });
  res.render("posts", { articles });
});

module.exports = router;
