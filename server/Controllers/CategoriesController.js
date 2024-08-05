const asyncHandler = require("express-async-handler");
const Category = require("../Models/CategoryModel");
//Get all category
//Get /api/category/
//public
const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({});
    if (categories) {
      res.json(categories);
    } else {
      res.status(404);
      throw new Error("Category not found");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
const createCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;
  try {
    await Category.create({ title });
    res.json({ message: "Created category successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const category = await Category.findById(id);
    if (category) {
      category.title = title || category.title;
      await category.save();
      res.json({ message: "Category updated successfully" });
    } else {
      res.status(404);
      throw new Error("Category not found");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (category) {
      await Category.findByIdAndDelete(id);
      res.json({ message: "Deleted Category Successfully" });
    } else {
      res.status(400);
      throw new Error("Category not found");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = [
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
];
