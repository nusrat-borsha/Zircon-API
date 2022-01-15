// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const Jewel = require('../models/jewelModel'); 
// const catchAsync = require('./../utils/catchAsync');
// const AppError = require('./../utils/appError');

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