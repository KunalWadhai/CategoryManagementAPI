import mongoose from 'mongoose';

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Sub-category name is required'],
    unique: true,
    trim: true,
    index: true
  },
  image: {
    type: String,
    required: [true, 'Sub-category image URL is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Sub-category description is required'],
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category reference is required']
  },
  taxApplicability: {
    type: Boolean,
    default: false
  },
  tax: {
    type: Number,
    min: 0,
    default: 0
  }
}, {
  timestamps: true
});

// Index for faster searches
subCategorySchema.index({ name: 'text' });
subCategorySchema.index({ category: 1 });

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

export default SubCategory;

