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

// exports.createUpdateCart = catchAsync(async (req, res, next) => {

//     const user = await User.findById(req.user.id);

//     let cart = await Cart.findOne({ user });

//     if (cart) {
//         //cart exists for user
//         let itemIndex = cart.products.findIndex(p => p.productId == productId);
  
//         if (itemIndex > -1) {
//           //product exists in the cart, update the quantity
//           let productItem = cart.products[itemIndex];
//           productItem.quantity = quantity;
//           cart.products[itemIndex] = productItem;
//         } else {
//           //product does not exists in cart, add new item
//           cart.products.push({ productId, quantity, name, price });
//         }
//         cart = await cart.save();
//         return res.status(201).send(cart);
//       } else {
//         //no cart for user, create new cart
//        const items = req.body.products;
//        let totalPrice = 0;
//        const itemsArray = [];
    
//        await Promise.all(items.map(async (el) => {
//            const item = await Jewel.findOne({ _id: el.product });
//            totalPrice += parseInt(item.price*el.quantity);
//            console.log(item.price);
//            //console.log(typeof(el.quantity);
//            itemsArray.push({
//                "product": item._id,
//                "name": item.name,
//                "quantity":el.quantity,
//                "price": parseInt(item.price*el.quantity),
//             });
//          })
//        );

//         const newCart = await Cart.create({
//           user,
//           products: itemsArray,
//           totalPrice
//         });

//         res.status(201).json({
//             status : 'success',
//             data: {
//               newCart
//             }
//           });
//       }
// });

// exports.getCheckoutSession = catchAsync(async (req, res, next) => {

//     const jewel = await Jewel.findById(req.params.jewelID);

//     const session = stripe.checkout.session.create({
//         payment_method_types: ['card'],
//         success_url: `${req.protocol}://${req.get('host')}`, 
//         cancel_url: `${req.protocol}://${req.get('host')}/jewel/${jewel.slug}`, 
//         customer_email: req.user.email,
//         line_items: [{
//             name: `${jewel.name}`, 
//             description: jewel.description,
//             amount = jewel.price*100,
//             currency: 'usd',
//             quantity: 1
//         }]
//     })
     
// });