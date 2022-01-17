const catchAsync = require('./../utils/catchAsync');
const AppError  = require('./../utils/appError');
const User = require('./../models/userModel');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    
    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el)){
            newObj[el] = obj[el];
        }
    });
    return newObj;
}

exports.getAllUsers = catchAsync(async (req, res, next) => {

    const users = await User.find();

    res.status(200).json({
        status : 'success',
        data:{
            users,
        }
    });
});

//not the route for password change! Only other user data change is allowed
exports.updateUser = catchAsync(async (req, res, next) => {

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators : true,
      });
  
      if(!user){
        return next(new AppError(`No user found with that ID`, 404));
      };
    
      res.status(201).json({
        status : 'success',
        data: {
          user
        } 
      });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if(!user){
      return next(new AppError(`No user found with that ID`, 404));
    };
    
    res.status(204).json({
      status : 'success',
      data: null
    });
});

//update current user's data
exports.updateMyData = catchAsync(async (req, res, next) => {

    if(req.body.password || req.body.passwordConfirm){
      return next(
        new AppError('This is not the correct route for password update',400)
      )
    };
  
    //update and save user data
    const filteredData = filterObj(req.body, 'email', 'name');
    const updatedUserData = await User.findByIdAndUpdate(req.user.id, filteredData,{
      new: true,
      runValidators: true
    });
  
    res.status(200).json({
      status: 'success',
      data: {
          user: updatedUserData,
      }
    });
});

//delete current user (only deactivate but does not remove from DB)
exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, {active : false})

    res.status(200).json({
        status : 'success',
        data: null
    })
});