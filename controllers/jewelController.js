//handlers go in this file
const Jewel = require('../models/jewelModel'); 
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const multer = require('multer');
const sharp = require('sharp');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if(file.mimetype.startsWith('image')){
    cb(null, true);
  }else{
    cb(new AppError('Only images are allowed to be uploaded.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.resizeJewelImages = catchAsync(async (req, res, next) => {
  if (!req.files.picture) return next();

  req.body.picture = `jewel-${req.params.id}-${Date.now()}-cover.jpeg`;
  await sharp(req.files.picture[0].buffer)
    .resize(500, 503)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/jewels/${req.body.picture}`);
  next();
});

exports.uploadjewelImage = upload.single('picture');

exports.createJewels = catchAsync(async (req, res, next) => {

  const newJewel = await Jewel.create(req.body);

  res.status(201).json({
    status : 'success',
    data: {
      jewel : newJewel
    }
  });
});

exports.getAllJewels = catchAsync(async (req, res, next) => {

    const features = new APIFeatures(Jewel.find(), req.query).filter().sort().limitFields().paginate();
    const jewels = await features.query;
 
    res.status(200).json({
      status : 'success',
      results: jewels.length,
      data: {
        jewels
      }
    });
  });

exports.getJewel = catchAsync(async (req, res, next) => {

    const jewel = await Jewel.findById(req.params.id);

    if(!jewel){
      return next(new AppError(`No Jewel found with that ID`, 404));
    };
  
    res.status(201).json({
      status : 'success',
      data: {
        jewel
      }
    });
  });

exports.updateJewel = catchAsync(async (req, res, next) => {

    const jewel = await Jewel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators : true,
    });

    if(!jewel){
      return next(new AppError(`No Jewel found with that ID`, 404));
    };
  
    res.status(201).json({
      status : 'success',
      data: {
        jewel 
      } 
    });
  });

exports.deleteJewel = catchAsync(async (req, res, next) => {

    const jewel = await Jewel.findByIdAndDelete(req.params.id);

    if(!jewel){
      return next(new AppError(`No Jewel found with that ID`, 404));
    };
    
    res.status(204).json({
      status : 'success',
      data: null
    });
  });



