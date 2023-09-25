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
- https://book-catalog-bay.vercel.app/api/v1/users/fbeca08e-8151-4124-81a7-4e999d052310 (Single GET) Include an id that is saved in your database
- https://book-catalog-bay.vercel.app/api/v1/users/fbeca08e-8151-4124-81a7-4e999d052310 (PATCH)
- https://book-catalog-bay.vercel.app/api/v1/users/fbeca08e-8151-4124-81a7-4e999d052310 (DELETE) Include an id that is saved in your database
- https://book-catalog-bay.vercel.app/api/v1/profile (GET)

### Category

- https://book-catalog-bay.vercel.app/api/v1/categories/create-category (POST)
- https://book-catalog-bay.vercel.app/api/v1/categories (GET)
- https://book-catalog-bay.vercel.app/api/v1/categories/549917dc-c590-4343-ade1-dc38de7b223b (Single GET) Include an id that is saved in your database
- https://book-catalog-bay.vercel.app/api/v1/categories/549917dc-c590-4343-ade1-dc38de7b223b (PATCH)
- https://book-catalog-bay.vercel.app/api/v1/categories/549917dc-c590-4343-ade1-dc38de7b223b (DELETE) Include an id that is saved in your database

### Books

- https://book-catalog-bay.vercel.app/api/v1/books/create-book (POST)
- https://book-catalog-bay.vercel.app/api/v1/books (GET)
- https://book-catalog-bay.vercel.app/api/v1/books/549917dc-c590-4343-ade1-dc38de7b223b/category (GET)
- https://book-catalog-bay.vercel.app/api/v1/books/a1600d71-e34f-4408-830e-28533d4067d1 (GET)
- https://book-catalog-bay.vercel.app/api/v1/books/a1600d71-e34f-4408-830e-28533d4067d1 (PATCH)
- https://book-catalog-bay.vercel.app/api/v1/books/a1600d71-e34f-4408-830e-28533d4067d1 (DELETE)

### Orders

- https://book-catalog-bay.vercel.app/api/v1/orders/create-order (POST)
- https://book-catalog-bay.vercel.app/api/v1/orders (GET)
- https://book-catalog-bay.vercel.app/api/v1/orders/74e52164-6a20-41fa-a361-a8335fc3408e (GET)
