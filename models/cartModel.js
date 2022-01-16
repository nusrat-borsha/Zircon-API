const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Cart must belong to a User!']
    },
    products: [
      {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Jewel',
          },
        quantity: Number,
        name: String,
        price: Number
      }
    ],
    totalPrice: Number,
    paid: {
        type: Boolean,
        default: false
      }
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;