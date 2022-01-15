const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    tour: {
        type: mongoose.Schema.ObjectId,
        ref: 'Jewel',
        required: [true, 'Cart must contain a jewelry!']
      },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Cart must belong to a User!']
    },
    products: [
      {
        productId: Number,
        quantity: Number,
        name: String,
        price: Number
      }
    ],
    paid: {
        type: Boolean,
        default: true
      }
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;