const mongoose = require("mongoose");
const Review = require("./ReviewModel");
const { Schema } = mongoose;

const movieSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    titleImage: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    video: {
      type: String,
    },
    rate: {
      type: Number,
      required: true,
      default: 0,
    },
    numberOfReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [],
    casts: [
      {
        name: { type: String, required: true },
        image: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", movieSchema);
