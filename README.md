# E-commerce Platform (School Project)

An advanced e-commerce website facilitating the sale of phones and gadgets, featuring a modern full-stack architecture.

Live website: https://superlian.tech/ 

## Features

- Product catalog with phones and gadgets
- User authentication and profiles
- Shopping cart and checkout workflow
- Order history and management
- Admin dashboard for user, product, and order management

## Tech Stack

- **Front End:** React, TypeScript, Vite
- **Back End:** Django, Rest Framework
- **Database:** SQLite
- **APIs:** RESTful endpoints for all major features


## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- python3


### Back End Setup

```
cd backEnd
```

#### Environment Variables

Create a `.env` file in the `backEnd/` directory and set variables

```
DJANGO_DEBUG=True 
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1     # Make sure to add the correct host for your backend
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174,http://localhost:5175     # Make sure to add the correct URL for your frontend
```

```bash

# Setup and activate virtual environments
python3 -m venv venv
source venv/bin/activate
# Install dependencies
pip install -r requirements.txt

python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py createsuperuser  # Follow the prompts to create a superuser
python3 manage.py runserver
```

### Front End Setup

```bash
cd frontEnd
npm install
touch .env
# Add the following line to the .env file
VITE_REACT_APP_API_URL=http://127.0.0.1:8000/ # Make sure to use the correct URL for your backend
npm run dev
```

#### Log in to the Django admin panel with the superuser credentials you created via http://127.0.0.1:8000/admin/    or <CORRECT_URL>/admin
- Navigate to the "Products" section and add some products (make sure to follow the correct format for adding storage and size, format is below the textbox)

#### Log in to the frontend with the superuser credentials you created: http://localhost:5174/login  or <CORRECT_URL>/login
- Navigate to the profile  and update profile information
- Create a new order by adding products to the cart and proceeding to checkout

## API Overview

The backend exposes a RESTful API for frontend consumption. Below are some sample endpoints:

| Method | Endpoint               | Description                        |
|--------|------------------------|------------------------------------|
| POST   | /auth/users            | Register a new user                |
| POST   | /auth/login            | User login                         |
| GET    | /api/products          | List all products                  |
| GET    | /api/products/:id      | Get product details                |
| GET    | /api/categories        | Get product categories             |
| POST   | /api/cart              | Update cart                        |
| GET    | /api/cart/me           | Get current user's cart            |
| POST   | /api/cart-item/        | Create new cart item               |
| PATCH  | /api/cart-item/:id     | Update cart item                   |
| POST   | /api/orders            | Place a new order                  |
| GET    | /api/orders/me         | Get current user's order history   |

> For full API documentation, see the backend or services folder on the frontend


## License

This project is licensed under the terms of the [LICENSE](LICENSE).

---

