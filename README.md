# GADGET MANAGEMENT SYSTEM

### DOCUMENTATION LINK:

### HOW TO SETUP THIS PROJECT

1. Clone this repository

`https://github.com/Porgramming-Hero-web-course/l2b2-full-stack-a5-server-side-farhanhasindipro25.git`

2. Install all essentials

`yarn install`

3. Run on development server

`yarn start`

### TECHNOLOGIES USED

- Typescript
- ExpressJS
- MongoDB
- Mongoose
- Zod
- Prettier
- Eslint
- Winston
- Husky
- Lint staged
- Swagger

### CODEBASE INSIGHTS

- Modular Architecture
- Authentication using JSON WEB TOKENS
- Info and Error Logging
- Well defined date-time based terminal
- Pre-commit setup with Husky and lint-staged
- Efficient use of EsLint to get rid of unused imports, variables, etc.
- Swagger documentation
- Postman file with all API endpoints

### FEATURES

**USER MANAGEMENT**

1. User Creation (POST)
2. User Login (POST)

**GADGET MANAGEMENT**

1. Add New Electric Gadget (POST)
2. Delete Electric Gadget (DELETE)
3. Edit Electric Gadget (PATCH)
4. View Electric Gadgets List (GET)
5. View Electric Gadgets Details (GET)
6. Search, Sort and Filter Gadgets (GET)
7. BULK Delete Selected Electric Gadgets (DELETE)

**SALES MANAGEMENT**

1. List of products to sell (GET)
2. Sell Product (POST)
3. Sales History (GET)
4. Search Sale Information (GET)
5. Edit Sale Information (PATCH)
6. Delete Sale Information (DELETE)

#### Reference of Sales and Gadgets

Sales is connected to Gadget.
Gadget - Sales -> One to many

Samsung Galaxy
Sale 1
Sale 2
Sale 3

Gadget Sale

- title
- quantity
- Sale (reference)

After populating

- title
- quantity
- Sale
  - id
  - title
  - quantity
  - buyer
