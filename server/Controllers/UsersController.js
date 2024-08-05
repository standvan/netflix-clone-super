const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../Models/UserModel");
const generateToken = require("../middlewares/generateToken");
//api/users/register
const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User Already Exists");
    }
    //bcrypt password
    const salt = bcrypt.genSaltSync(10);
    var hashedPass = bcrypt.hashSync(password, salt);
    //create user
    const newUser = await User.create({
      fullname,
      password: hashedPass,
      email,
      image:
        "https://firebasestorage.googleapis.com/v0/b/netflix-pro-32b7c.appspot.com/o/e463d8cc-e6a6-48f6-b8da-ff161755237d.png?alt=media",
    });
    if (newUser) {
      res.status(201).json({
        fullname: newUser.fullname,
        email: newUser.email,
        image: newUser.image,
        isAdmin: false,
        _id: newUser._id,
        token: generateToken(newUser._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    //if exist
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(201).json({
        fullname: user.fullname,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        _id: user._id,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Put:api/users/
//private
const updateUser = asyncHandler(async (req, res) => {
  const { fullname, email, image } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      if (email && email !== user.email) {
        const emailExist = await User.findOne({ email });
        if (emailExist) {
          res.status(400);
          throw new Error("Email already exists");
        }
      }
      user.email = email || user.email;
      user.fullname = fullname || user.fullname;
      user.image = image || user.image;
      const updateUser = await user.save();
      res.json({
        _id: updateUser._id,
        fullname: updateUser.fullname,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
        image: updateUser.image,
        token: generateToken(updateUser._id),
      });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Delete: api/users/delete
//private
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      throw new Error("User does not exist");
    }
    if (user.isAdmin) {
      res.status(403);
      throw new Error("Can't user is Admin");
    } else {
      const deleteUser = await User.findByIdAndDelete(req.user._id);
      res.json({ message: "User deleted successfully" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Change user password
//Put /api/uses/password
//private
const changeUserPassword = asyncHandler(async (req, res) => {
  const { password, newPassword } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (user && bcrypt.compareSync(password, user.password)) {
      let salt = bcrypt.genSaltSync(10);
      let hashedPass = bcrypt.hashSync(newPassword, salt);
      user.password = hashedPass;
      user.save();
      res.json({ message: "Changed password successfully" });
    } else {
      res.status(401);
      throw new Error("Password invalid");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Get all liked movies
//Get /api/users/favorites
//private
const getLikedMovies = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("likedMovies");
    if (user) {
      res.json(user.likedMovies);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Add liked movies
//Post /api/users/favorites
//private
const addLikedMovies = asyncHandler(async (req, res) => {
  const { movieId } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      if (user.likedMovies.includes(movieId)) {
        res.status(400);
        throw new Error("Movie already liked");
      }
      user.likedMovies.push(movieId);
      await user.save();
      res.json({ message: "Movie add to liked movies" });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Delete all liked movies
//Delete /api/users/favorites
//private
const deleteLikedMovies = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.likedMovies = [];
      user.save();
      res.json({ message: "Your favorites movies deleted successfullly" });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Get all user
//Get /api/users/
//private
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      if (user.isAdmin) {
        const listUser = await User.find().select("-password");
        res.json(listUser);
      } else {
        res.status(401);
        throw new Error("Only admin can see");
      }
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Delete user by id
//Delete /api/users/:id
//private
const deleteUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      if (user.isAdmin) {
        res.status(403);
        throw new Error("Can't delete admin");
      } else {
        await User.findByIdAndDelete(id);
        res.json({ message: "User deleted sucessfully" });
      }
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Delete movie from favorites movies
//Delete /api/users/favorites/:id
const deleteLikedMovieById = asyncHandler(async (req, res) => {
  const { movieId } = req.params;
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      if (user.likedMovies.includes(movieId)) {
        user.likedMovies.remove(movieId);
        user.save();
        res.json({
          message: "Deleted movie from favorites movie successfully",
        });
      } else {
        res.status(404);
        throw new Error("Movie is not list");
      }
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = [
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
];
