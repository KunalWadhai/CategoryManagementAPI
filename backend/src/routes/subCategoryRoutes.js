import express from 'express';
import {
  createSubCategory,
  getAllSubCategories,
  getSubCategoriesByCategory,
  getSubCategoryByIdOrName,
  updateSubCategory,
  deleteSubCategory
} from '../controllers/subCategoryController.js';

const router = express.Router();

// Create Sub-Category
router.post('/', createSubCategory);

// Get All Sub-Categories
router.get('/', getAllSubCategories);

// Get All Sub-Categories under a Category
router.get('/category/:categoryId', getSubCategoriesByCategory);

// Get Sub-Category by ID or Name
router.get('/:identifier', getSubCategoryByIdOrName);

// Update Sub-Category
router.put('/:id', updateSubCategory);

// Delete Sub-Category
router.delete('/:id', deleteSubCategory);

export default router;

