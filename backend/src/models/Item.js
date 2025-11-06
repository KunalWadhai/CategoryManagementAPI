import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Item name is required'],
    unique: true,
    trim: true,
    index: true
  },
  image: {
    type: String,
    required: [true, 'Item image URL is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Item description is required'],
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: false // Can be null if item is directly under sub-category
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory',
    required: false // Can be null if item is directly under category
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
  },
  baseAmount: {
    type: Number,
    required: [true, 'Base amount is required'],
    min: 0
  },
  discount: {
    type: Number,
    required: [true, 'Discount is required'],
    min: 0,
    default: 0
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: 0
  }
}, {
  timestamps: true
});

// Pre-save middleware to calculate totalAmount
itemSchema.pre('save', function(next) {
  if (this.isModified('baseAmount') || this.isModified('discount')) {
    this.totalAmount = Math.max(0, this.baseAmount - this.discount);
  }
  next();
});

// Index for faster searches
itemSchema.index({ name: 'text' });
itemSchema.index({ category: 1 });
itemSchema.index({ subCategory: 1 });

// Validation: Item must belong to either category or subCategory
itemSchema.pre('validate', function(next) {
  if (!this.category && !this.subCategory) {
    next(new Error('Item must belong to either a category or a sub-category'));
  } else {
    next();
  }
});

const Item = mongoose.model('Item', itemSchema);

export default Item;

