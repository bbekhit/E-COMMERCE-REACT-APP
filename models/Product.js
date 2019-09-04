const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  category: {
    type: String
  },
  images: {
    type: Array,
    default: []
  },
  
  brand: {
    type: String,
  },
  model: {
    type: String

  },
  price: {
    type: String,
  },
  description: {
    type: String
  },
  size: {
    type: String
  },
  sold: {
    type: Number,
    maxlength: 100,
    default: 0
  },
  shipping: {
    type: Boolean
  },
  available: {
    type: Boolean
  },
  date: {
    type: Date,
    default: Date.now
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
      },
      name: {
        type: String,
      },
      likes:[
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
          }
        }
      ],
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  rating: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      },
      dynamicValue: {
        type: Number,
      },
    }
  ],
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product };
