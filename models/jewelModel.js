const mongoose = require('mongoose');
const slugify = require('slugify');

//create schema and then model
const jewelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A jewelry must have a name'],
    unique: false,
  },
  slug: String,
  price: {
    type: Number,
    required: [true, "A jewelry must have a price"]
  },
  units: {
    type: Number,
    required: [true, "A jewelry must be in stock"]
  },
  category: {
    type: String,
    required: [true, 'A jewelry must have a category'],
    unique: false,
  },
  material: {
    type: String,
    required: [true, 'A jewelry must have a material'],
    unique: false,
  },
  picture: {
    type: String,
    required: [true, 'A jewelry must have an image']
  },
  description: {
    type: String,
    trim: true
  },
  material : {
    type: String,
    required: [true, 'A jewelry must have a material'],
    unique: false,
  },
  length: {
    type: Number,
    required: [true, "A jewelry must have a length"]
  },
});

jewelSchema.index({ slug: 1 });

jewelSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
  });

const Jewel = mongoose.model('Jewel', jewelSchema);

module.exports = Jewel;