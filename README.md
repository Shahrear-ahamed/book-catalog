# Build a Book Catalog Backend Assignment

### Live Link: https://book-catalog-bay.vercel.app

### Application Routes:

#### User

```
// signup user

{
    "name": "shahrear ahamed",
    "email": "its.shahrear@gmail.com",
    "password": "123456",
    "contactNo": "01517821912",
    "address": "dhaka"
}

```

// sign in user

```

{
    "email": "its.shahrear@gmail.com",
    "password": "123456", // admin user
}

```

```

{
    "email": "its.shahrear1@gmail.com",
    "password": "123456", // customer user
}

```

- https://book-catalog-bay.vercel.app/api/v1/auth/signup (POST)
- https://book-catalog-bay.vercel.app/api/v1/users (GET)
- https://book-catalog-bay.vercel.app/api/v1/users/a5820513-343d-4e33-b01d-a809b37e1c34 (Single GET) Include an id that is saved in your database
- https://book-catalog-bay.vercel.app/api/v1/users/a5820513-343d-4e33-b01d-a809b37e1c34 (PATCH)
- https://book-catalog-bay.vercel.app/api/v1/users/a5820513-343d-4e33-b01d-a809b37e1c34 (DELETE) Include an id that is saved in your database
- https://book-catalog-bay.vercel.app/api/v1/profile (GET)

### Category

- https://book-catalog-bay.vercel.app/api/v1/categories/create-category (POST)
- https://book-catalog-bay.vercel.app/api/v1/categories (GET)
- https://book-catalog-bay.vercel.app/api/v1/categories/a9131a1d-bc1e-4cb2-86a2-6b66fd49ea19 (Single GET) Include an id that is saved in your database
- https://book-catalog-bay.vercel.app/api/v1/categories/a9131a1d-bc1e-4cb2-86a2-6b66fd49ea19 (PATCH)
- https://book-catalog-bay.vercel.app/api/v1/categories/a9131a1d-bc1e-4cb2-86a2-6b66fd49ea19 (DELETE) Include an id that is saved in your database

### Books

- https://book-catalog-bay.vercel.app/api/v1/books/create-book (POST)
- https://book-catalog-bay.vercel.app/api/v1/books (GET)
- https://book-catalog-bay.vercel.app/api/v1/books/a9131a1d-bc1e-4cb2-86a2-6b66fd49ea19/category (GET)
- https://book-catalog-bay.vercel.app/api/v1/books/ef919185-27ab-4b18-9f0b-93a3481e6ec9 (GET)
- https://book-catalog-bay.vercel.app/api/v1/books/ef919185-27ab-4b18-9f0b-93a3481e6ec9 (PATCH)
- https://book-catalog-bay.vercel.app/api/v1/books/ef919185-27ab-4b18-9f0b-93a3481e6ec9 (DELETE)

### Orders

- https://book-catalog-bay.vercel.app/api/v1/orders/create-order (POST)
- https://book-catalog-bay.vercel.app/api/v1/orders (GET)
- https://book-catalog-bay.vercel.app/api/v1/orders/a949091c-4f8b-4163-969a-25cbbaf80cb3 (GET)
