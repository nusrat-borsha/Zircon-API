//handlers go in this file
const Jewel = require('../models/jewelModel'); 
const APIFeatures = require('../utils/apiFeatures');

exports.createJewels = async (req, res) => {

try{
  const newJewel = await Jewel.create(req.body);

  res.status(201).json({
    status : success,
    data: {
      jewel : newJewel
    }
  });
} catch(err){
  res.status(400).json({
    status : 'fail',
    message : 'Invalid data sent'
  });
}
};

exports.getAllJewels = async (req, res) => {

  try{

    const features = new APIFeatures(Jewel.find(), req.query).filter();
    const jewels = await features.query;
   
    // send query
    res.status(200).json({
      status : 'success',
      data: {
        jewels
      }
    });
  } catch(err){
    res.status(404).json({
      status : 'fail',
      message : err
    });
  }
  };

exports.getJewel = async (req, res) => {

  try{
    const jewel = await Jewel.findById(req.params.id);
  
    res.status(201).json({
      status : 'success',
      data: {
        jewel
      }
    });
  } catch(err){
    res.status(404).json({
      status : 'fail',
      message : err
    });
  }
  };

exports.updateJewel = async (req, res) => {

  try{
    const jewel = await Jewel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators : true,
    });
  
    res.status(201).json({
      status : 'success',
      data: {
        jewel 
      } 
    });
  } catch(err){
    res.status(400).json({
      status : 'fail',
      message : err
    });
  }
  };

exports.deleteJewel = async (req, res) => {

  try{
    const jewel = await Jewel.findByIdAndDelete(req.params.id);
    // if (!jewel) {
    //   return new AppError('No jewelry found with that ID', 404);
    // }
    res.status(204).json({
      status : success,
      data: null
    });
  } catch(err){
    res.status(400).json({
      status : "fail",
      message : err
    });
  }
  };

  exports.getJewelByCategory = async (req, res) => {

    try{
      const jewels = await Jewel.find({category: req.params.category});
    
      res.status(201).json({
        status : 'success',
        data: {
          jewels
        }
      });
    } catch(err){
      res.status(404).json({
        status : 'fail',
        message : err
      });
    }
    };
