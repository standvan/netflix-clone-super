const router = require("express").Router();
const [
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  changeUserPassword,
  getLikedMovies,
  addLikedMovies,
  deleteLikedMovies,
  getAllUsers,
  deleteUserById,
  deleteLikedMovieById,
] = require("../Controllers/UsersController");
const [protect, admin] = require("../middlewares/auth");

//post
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/favorites", protect, addLikedMovies);
//update
router.put("/", protect, updateUser);
router.put("/password", protect, changeUserPassword);
//delete
router.delete("/", protect, deleteUser);
router.delete("/favorites", protect, deleteLikedMovies);
router.delete("/favorite/:movieId", protect, deleteLikedMovieById);
router.delete("/:id", protect, admin, deleteUserById);

//get
router.get("/favorites", protect, getLikedMovies);
router.get("/", protect, admin, getAllUsers);

module.exports = router;
