import express from 'express';
import {
  createCategory,
  getAllCategories,
  getCategoryByIdOrName,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';

const router = express.Router();

// Create Category
router.post('/', createCategory);

// Get All Categories
router.get('/', getAllCategories);

// Get Category by ID or Name
router.get('/:identifier', getCategoryByIdOrName);

// Update Category
router.put('/:id', updateCategory);

// Delete Category
router.delete('/:id', deleteCategory);

export default router;

