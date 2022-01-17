const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Jewel = require('../models/jewelModel');
const User = require('../models/userModel'); 
const Cart = require('../models/cartModel');  
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.addToCart = catchAsync(async (req, res, next) => {

    const user = await User.findById(req.user.id);
    const item = await Jewel.findById(req.params.productId);
    let cart = await Cart.findOne({ user });
    const itemsArray = [];

    if (cart) {
        //cart exists for user
        let itemIndex = cart.products.findIndex(p => p.product.toString() == item._id.toString());
  
        if (itemIndex > -1) {
          
          const productItem = cart.products[itemIndex];

          //product exists in the cart, update the quantity
          productItem.quantity += 1;
          cart.products[itemIndex] = productItem;

           //update the total price in cart
           cart.totalPrice += productItem.price;

        } else {
          //product does not exists in cart, add new item
          cart.products.push({
            "product": item._id,
            "name": item.name,
            "quantity":1,
            "price": item.price,
         });
         cart.totalPrice += item.price ;
        }
        cart = await cart.save();
        res.status(201).json({
            status : 'success',
            data: {
              cart
            }
          });
      } else {
        //no cart for user, create new cart
           itemsArray.push({
               "product": item._id,
               "name": item.name,
               "quantity":1,
               "price": item.price,
            });
         

        const totalPrice = item.price;
         
        const newCart = await Cart.create({
          user,
          products: itemsArray,
          totalPrice
        });

        res.status(201).json({
            status : 'success',
            data: {
              newCart
            }
          });
        }
});

exports.deleteItemCart = catchAsync(async (req, res, next) => {

  const user = await User.findById(req.user.id);
  const item = await Jewel.findById(req.params.productId);
  let cart = await Cart.findOne({ user });

  if(!user || !cart){
    return next(
      new AppError(`Cart does not exist.`, 404)
    );
  }
  if (cart) {
      //cart exists for user
      let itemIndex = cart.products.findIndex(p => p.product.toString() == item._id.toString());

      if (itemIndex > -1) {
        const quantityOfItem = cart.products[itemIndex].quantity;
        cart.totalPrice -= (item.price*quantityOfItem);
        
        //if cart empty after item deletion, then delete cart
        if(cart.products.length == 1){
          await cart.deleteOne({ products: { product: item._id }});

          res.status(200).json({
            status : 'success',
          });
        }
        else{
        await cart.updateOne({ $set: {totalPrice : cart.totalPrice}} );
        cart = await cart.updateOne( { $pull: { products: { product: item._id }}});

        //cart = await cart.save();
        res.status(200).json({
            status : 'success',
            data: {
              cart
            }
          });
        }

      } else {
        return next(
          new AppError(`Product is not in cart.`, 404)
        );  
      }
    } 
});

exports.getCart = catchAsync(async (req, res, next) => {

  const user = await User.findById(req.user.id);
  let cart = await Cart.findOne({ user });

  if(!user || !cart){
    return next(
      new AppError(`Cart does not exist.`, 404)
    );
  }

  res.status(200).json({
    status : 'success',
    data : {
      cart
    }
  });
})