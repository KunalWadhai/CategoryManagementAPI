import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true,
    index: true
  },
  image: {
    type: String,
    required: [true, 'Category image URL is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Category description is required'],
    trim: true
  },
  taxApplicability: {
    type: Boolean,
    required: [true, 'Tax applicability is required'],
    default: false
  },
  tax: {
    type: Number,
    required: function() {
      return this.taxApplicability;
    },
    min: 0,
    default: 0
  }
}, {
  timestamps: true
});

// Index for faster searches
categorySchema.index({ name: 'text' });

const Category = mongoose.model('Category', categorySchema);

export default Category;

