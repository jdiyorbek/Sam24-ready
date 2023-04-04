const { Router } = require("express");
const router = Router();
const ArticleModel = require("../models/article");
const adModel = require("../models/ad");
const middlewareAuth = require("../middleware/auth");

router.get("/", (req, res) => {
  res.redirect("/");
});

router.get("/:id", async (req, res) => {
  const article = await ArticleModel.findById(req.params.id);
  const recs = await ArticleModel.find(
    { type: article.type },
    { limit: 3 }
  ).sort({ date: -1 });
  let ads = await adModel.findOne();
  if (ads) {
    if (ads.view <= ads.viewed + 1) {
      await adModel.findByIdAndDelete(ads.id);
    }
  }

  res.render("article", { article, recs, ads });
  // setTimeout(async() => {
  await ArticleModel.findByIdAndUpdate(req.params.id, {
    view: article.view + 1,
  });
  if (ads) {
    await adModel.findByIdAndUpdate(ads._id, { viewed: ads.viewed + 1 });
  }
  // }, 10000);
});

module.exports = router;
