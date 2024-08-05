const router = require("express").Router();
const [protect, admin] = require("../middlewares/auth");
const [
  importMovies,
  getAllMovies,
  getMovieById,
  getTopRatedMovies,
  getMoviesRandom,
  createMovieReview,
  updateMovie,
  deleteMovie,
  getAllLanguageMovie,
  getAllYearMovie,
  createMovie,
] = require("../Controllers/MoviesController");
//post
router.post("/import", importMovies);
router.post("/create", createMovie);
router.post("/:id/review", protect, createMovieReview);

//get
router.get("/", getAllMovies);
router.get("/find/:id", getMovieById);
router.get("/rated", getTopRatedMovies);
router.get("/random", getMoviesRandom);
router.get("/language", getAllLanguageMovie);
router.get("/year", getAllYearMovie);
//put
router.put("/:id", protect, admin, updateMovie);
//delete
router.delete("/:id", protect, admin, deleteMovie);

module.exports = router;
