# Category Management API

A RESTful API for managing categories, sub-categories, and items with tax calculations and hierarchical relationships.

## Features

- ✅ Create, Read, Update operations for Categories
- ✅ Create, Read, Update operations for Sub-Categories
- ✅ Create, Read, Update, Search operations for Items
- ✅ Automatic tax inheritance from categories to sub-categories
- ✅ Automatic total amount calculation (Base Amount - Discount)
- ✅ Search items by name
- ✅ Get items by category or sub-category
- ✅ MongoDB database with Mongoose ODM
- ✅ Error handling and validation
- ✅ Rate limiting and security middleware

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

## Installation

1. Clone the repository and navigate to the backend directory:
```bash
cd CategoryManagementAPI/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your MongoDB connection string:
```
MONGODB_URI=mongodb://localhost:27017/categorymanagement
```

5. Start the server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

## API Endpoints

### Categories

#### Create Category
- **POST** `/api/categories`
- **Body:**
```json
{
  "name": "Electronics",
  "image": "https://example.com/electronics.jpg",
  "description": "Electronic items",
  "taxApplicability": true,
  "tax": 10
}
```

#### Get All Categories
- **GET** `/api/categories`

#### Get Category by ID or Name
- **GET** `/api/categories/:identifier`
- Example: `/api/categories/Electronics` or `/api/categories/507f1f77bcf86cd799439011`

#### Update Category
- **PUT** `/api/categories/:id`
- **Body:** (all fields optional)
```json
{
  "name": "Updated Electronics",
  "image": "https://example.com/new-image.jpg",
  "description": "Updated description",
  "taxApplicability": false,
  "tax": 0
}
```

#### Delete Category
- **DELETE** `/api/categories/:id`

### Sub-Categories

#### Create Sub-Category
- **POST** `/api/subcategories`
- **Body:**
```json
{
  "name": "Smartphones",
  "image": "https://example.com/smartphones.jpg",
  "description": "Smartphone devices",
  "categoryId": "507f1f77bcf86cd799439011",
  "taxApplicability": true,  // Optional, defaults to category's taxApplicability
  "tax": 10  // Optional, defaults to category's tax
}
```

#### Get All Sub-Categories
- **GET** `/api/subcategories`

#### Get Sub-Categories by Category
- **GET** `/api/subcategories/category/:categoryId`

#### Get Sub-Category by ID or Name
- **GET** `/api/subcategories/:identifier`

#### Update Sub-Category
- **PUT** `/api/subcategories/:id`

#### Delete Sub-Category
- **DELETE** `/api/subcategories/:id`

### Items

#### Create Item
- **POST** `/api/items`
- **Body:**
```json
{
  "name": "iPhone 15",
  "image": "https://example.com/iphone15.jpg",
  "description": "Latest iPhone model",
  "categoryId": "507f1f77bcf86cd799439011",  // Optional if subCategoryId is provided
  "subCategoryId": "507f1f77bcf86cd799439012",  // Optional if categoryId is provided
  "taxApplicability": true,
  "tax": 10,
  "baseAmount": 999,
  "discount": 50
}
```
- **Note:** Item must belong to either a category or sub-category. Total amount is automatically calculated as (baseAmount - discount).

#### Get All Items
- **GET** `/api/items`

#### Get Items by Category
- **GET** `/api/items/category/:categoryId`

#### Get Items by Sub-Category
- **GET** `/api/items/subcategory/:subCategoryId`

#### Get Item by ID or Name
- **GET** `/api/items/:identifier`

#### Search Items by Name
- **GET** `/api/items/search?name=iPhone`
- Returns all items matching the search query (case-insensitive)

#### Update Item
- **PUT** `/api/items/:id`
- **Body:** (all fields optional)
```json
{
  "name": "iPhone 15 Pro",
  "baseAmount": 1099,
  "discount": 100
}
```

#### Delete Item
- **DELETE** `/api/items/:id`

## Response Format

All responses follow this format:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
```

## Data Models

### Category
- `name` (String, required, unique)
- `image` (String, required, URL)
- `description` (String, required)
- `taxApplicability` (Boolean, required, default: false)
- `tax` (Number, required if taxApplicability is true, default: 0)

### Sub-Category
- `name` (String, required, unique)
- `image` (String, required, URL)
- `description` (String, required)
- `category` (ObjectId, required, reference to Category)
- `taxApplicability` (Boolean, defaults to category's taxApplicability)
- `tax` (Number, defaults to category's tax)

### Item
- `name` (String, required, unique)
- `image` (String, required, URL)
- `description` (String, required)
- `category` (ObjectId, optional, reference to Category)
- `subCategory` (ObjectId, optional, reference to Sub-Category)
- `taxApplicability` (Boolean, required)
- `tax` (Number, required if taxApplicability is true)
- `baseAmount` (Number, required)
- `discount` (Number, required, default: 0)
- `totalAmount` (Number, auto-calculated as baseAmount - discount)

## Notes

1. **Tax Inheritance:** When creating a sub-category, if `taxApplicability` and `tax` are not provided, they default to the parent category's values.

2. **Item Placement:** Items can be created under either a category or a sub-category. If created under a sub-category, the category reference is automatically set.

3. **Total Amount Calculation:** The total amount for items is automatically calculated as `baseAmount - discount` and cannot be negative.

4. **Search:** Item search is case-insensitive and uses regex matching.

## Health Check

- **GET** `/health` - Returns server status and uptime

## License

MIT

