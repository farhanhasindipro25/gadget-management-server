Features

-----> Access Dashboard (Use JWT)
Register
Login

-----> Electric Gadget Management CRUD Operations
Add New Electric Gadget (POST)
Delete Electric Gadget (DELETE)
Edit Electric Gadget (PATCH)
View Electric Gadgets List (GET)
View Electric Gadgets Details (GET)
BULK Delete All Electric Gadgets (DELETE)

-----> Sales Management CRUD Operations
List of products to sell (GET)
Sell Product (POST)
Sales History (GET)

-----> Search and Filter Operations
Search by Product Title
Filter by Price Range
Filter by Release Date
Filter by Brand (Search)
Filter by Model Number (Search)
Filter by Category
Filter by Connectivity
Filter by Power Source
Filter by Features

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
