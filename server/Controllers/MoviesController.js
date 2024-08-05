const asyncHandler = require("express-async-handler");
const Movie = require("../Models/MovieModel");
const movieData = require("../data/moviesData");

//Import movies
//Post api/movies/import
//public
const importMovies = asyncHandler(async (req, res) => {
  await Movie.deleteMany({});
  const movies = await Movie.insertMany(movieData);
  res.status(201).json(movies);
});
//Get all movies
//Get api/movies/
//Public
const getAllMovies = asyncHandler(async (req, res) => {
  try {
    //filter movies by category, language, time, year, rate and search
    const { category, language, time, year, rate, search } = req.query;
    let query = {
      ...(category && { category }),
      ...(language && { language }),
      ...(time && { time }),
      ...(year && { year }),
      ...(rate && { rate }),
      ...(search && { name: { $regex: search, $options: "i" } }),
    };
    //load with page
    const page = Number(req.query.pageNumber) || 1;
    const limit = 8;
    const skip = (page - 1) * limit;
    //find by query and page
    const movies = await Movie.find(query)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });
    //get total Number
    const count = await Movie.countDocuments(query);
    res.status(201).json({
      movies,
      totalMovies: count,
      pages: Math.ceil(count / limit),
      page,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Get movie by id
//Get api/movies/:id
//public
const getMovieById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Get top rate movies
//Get api/movies/rated
//public
const getTopRatedMovies = asyncHandler(async (req, res) => {
  try {
    const movies = await Movie.find({}).sort({ rate: -1 });
    res.json(movies);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Random movies
//Get api/movies/random
//Public
const getMoviesRandom = asyncHandler(async (req, res) => {
  try {
    const movies = await Movie.aggregate([{ $sample: { size: 8 } }]);
    res.json(movies);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Create movie review
//Post api/movies/:id/review
//Private
const createMovieReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      const alreadyReview = movie.reviews.find(
        (re) => re.userId.toString() === req.user._id.toString()
      );
      if (alreadyReview) {
        res.status(400);
        throw new Error("You reviewed this movie");
      }
      const review = {
        username: req.user.fullname,
        userImage: req.user.image,
        comment: comment,
        rating: Number(rating),
        userId: req.user._id,
      };
      movie.reviews.push(review);
      movie.numberOfReviews = movie.reviews.length;
      movie.rate =
        movie.reviews.reduce((acc, cur) => cur.rating + acc, 0) /
        movie.reviews.length;
      await movie.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Update movie
//Put api/movies/:id
//Private
const updateMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    desc,
    titleImage,
    image,
    category,
    language,
    time,
    year,
    casts,
    video,
  } = req.body;
  try {
    const movie = await Movie.findById(id);
    if (movie) {
      movie.name = name || movie.name;
      movie.desc = desc || movie.desc;
      movie.titleImage = titleImage || movie.titleImage;
      movie.image = image || movie.image;
      movie.category = category || movie.category;
      movie.language = language || movie.language;
      movie.time = time || movie.time;
      movie.year = year || movie.year;
      movie.casts = casts || movie.casts;
      movie.video = video || movie.video;
      await movie.save();
      res.json({ message: "Update successfully" });
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Delete movie
//Delete api/movies/:id
//Private
const deleteMovie = asyncHandler(async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(201).json({ message: "Movie deleted successfully" });
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
const getAllLanguageMovie = asyncHandler(async (req, res) => {
  try {
    const movies = await Movie.find({});
    if (movies) {
      const languages = movies.map((movie) => movie.language);
      const uniqueLanguages = [...new Set(languages)];
      const listLanguages = uniqueLanguages.map((lan) => {
        return { title: lan };
      });
      res.json(listLanguages);
    } else {
      res.status(404);
      throw new Error("Movies not found");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
const getAllYearMovie = asyncHandler(async (req, res) => {
  try {
    const movies = await Movie.find({});
    if (movies) {
      const years = movies.map((movie) => movie.year);
      const uniqueYears = [...new Set(years)];
      uniqueYears.sort((a, b) => a - b);
      const listYears = uniqueYears.map((ye) => {
        return { title: ye };
      });
      res.json(listYears);
    } else {
      res.status(404);
      throw new Error("Movies not found");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
const createMovie = asyncHandler(async (req, res) => {
  try {
    const newUser = await Movie.create(req.body);
    if (newUser) {
      res.json({ message: "Create movie successfully" });
    } else {
      res.status(400);
      throw new Error("Create movie failed");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = [
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
];
