const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch('/updateMyPassword', authController.protect, authController.updatePassword);
router.patch('/updateMyData', authController.protect, userController.updateMyData);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

router
    .route('/')
    .get(authController.protect, authController.restrictTo('admin'), userController.getAllUsers);

router
    .route('/:id')  
    .patch(authController.protect, authController.restrictTo('admin'), userController.updateUser)
    .delete(authController.protect, authController.restrictTo('admin'), userController.deleteUser);


module.exports = router;