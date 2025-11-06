# API Examples

This document provides example API calls for testing the Category Management API.

## Prerequisites

1. Make sure MongoDB is running
2. Start the server: `npm run dev`
3. Use a tool like Postman, curl, or Thunder Client to test the APIs

## Example API Calls

### 1. Create a Category

```bash
POST http://localhost:3000/api/categories
Content-Type: application/json

{
  "name": "Electronics",
  "image": "https://example.com/electronics.jpg",
  "description": "Electronic items and gadgets",
  "taxApplicability": true,
  "tax": 10
}
```

### 2. Get All Categories

```bash
GET http://localhost:3000/api/categories
```

### 3. Get Category by Name

```bash
GET http://localhost:3000/api/categories/Electronics
```

### 4. Update Category

```bash
PUT http://localhost:3000/api/categories/{categoryId}
Content-Type: application/json

{
  "description": "Updated description for electronics",
  "tax": 12
}
```

### 5. Create a Sub-Category

```bash
POST http://localhost:3000/api/subcategories
Content-Type: application/json

{
  "name": "Smartphones",
  "image": "https://example.com/smartphones.jpg",
  "description": "Smartphone devices",
  "categoryId": "{categoryId from step 1}",
  "taxApplicability": true,
  "tax": 10
}
```

**Note:** If `taxApplicability` and `tax` are not provided, they will default to the parent category's values.

### 6. Get All Sub-Categories

```bash
GET http://localhost:3000/api/subcategories
```

### 7. Get Sub-Categories by Category

```bash
GET http://localhost:3000/api/subcategories/category/{categoryId}
```

### 8. Get Sub-Category by Name

```bash
GET http://localhost:3000/api/subcategories/Smartphones
```

### 9. Create an Item under Sub-Category

```bash
POST http://localhost:3000/api/items
Content-Type: application/json

{
  "name": "iPhone 15",
  "image": "https://example.com/iphone15.jpg",
  "description": "Latest iPhone model with advanced features",
  "subCategoryId": "{subCategoryId from step 5}",
  "taxApplicability": true,
  "tax": 10,
  "baseAmount": 999,
  "discount": 50
}
```

**Note:** The `totalAmount` will be automatically calculated as `baseAmount - discount` (999 - 50 = 949).

### 10. Create an Item under Category (without sub-category)

```bash
POST http://localhost:3000/api/items
Content-Type: application/json

{
  "name": "Generic Electronic Item",
  "image": "https://example.com/generic.jpg",
  "description": "A generic electronic item",
  "categoryId": "{categoryId}",
  "taxApplicability": false,
  "tax": 0,
  "baseAmount": 100,
  "discount": 10
}
```

### 11. Get All Items

```bash
GET http://localhost:3000/api/items
```

### 12. Get Items by Category

```bash
GET http://localhost:3000/api/items/category/{categoryId}
```

### 13. Get Items by Sub-Category

```bash
GET http://localhost:3000/api/items/subcategory/{subCategoryId}
```

### 14. Get Item by Name

```bash
GET http://localhost:3000/api/items/iPhone%2015
```

### 15. Search Items by Name

```bash
GET http://localhost:3000/api/items/search?name=iPhone
```

This will return all items with "iPhone" in the name (case-insensitive).

### 16. Update Item

```bash
PUT http://localhost:3000/api/items/{itemId}
Content-Type: application/json

{
  "baseAmount": 1099,
  "discount": 100
}
```

**Note:** The `totalAmount` will be automatically recalculated.

### 17. Health Check

```bash
GET http://localhost:3000/health
```

## Complete Workflow Example

Here's a complete workflow to test the entire system:

1. **Create Category:**
   ```json
   POST /api/categories
   {
     "name": "Electronics",
     "image": "https://example.com/electronics.jpg",
     "description": "Electronic items",
     "taxApplicability": true,
     "tax": 10
   }
   ```
   Save the `_id` from the response.

2. **Create Sub-Category (using category defaults):**
   ```json
   POST /api/subcategories
   {
     "name": "Smartphones",
     "image": "https://example.com/smartphones.jpg",
     "description": "Smartphone devices",
     "categoryId": "{categoryId}"
   }
   ```
   Note: `taxApplicability` and `tax` will default to category's values.

3. **Create Item:**
   ```json
   POST /api/items
   {
     "name": "iPhone 15",
     "image": "https://example.com/iphone15.jpg",
     "description": "Latest iPhone",
     "subCategoryId": "{subCategoryId}",
     "taxApplicability": true,
     "tax": 10,
     "baseAmount": 999,
     "discount": 50
   }
   ```

4. **Search for Item:**
   ```
   GET /api/items/search?name=iPhone
   ```

## Testing with cURL

### Create Category
```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Electronics",
    "image": "https://example.com/electronics.jpg",
    "description": "Electronic items",
    "taxApplicability": true,
    "tax": 10
  }'
```

### Get All Categories
```bash
curl http://localhost:3000/api/categories
```

### Search Items
```bash
curl "http://localhost:3000/api/items/search?name=iPhone"
```

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `409` - Conflict (duplicate entry)
- `500` - Internal Server Error

