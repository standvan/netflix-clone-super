const router = require("express").Router();
const [protect, admin] = require("../middlewares/auth");
const [
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
] = require("../Controllers/CategoriesController");

//Get
router.get("/", getCategories);
//Post
router.post("/", protect, admin, createCategory);
//put
router.put("/:id", protect, admin, updateCategory);
//delete
router.delete("/:id", protect, admin, deleteCategory);

module.exports = router;
