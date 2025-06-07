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

### Front End Setup

```bash
cd frontEnd
npm install
npm run dev
```

### Back End Setup

```bash
cd backEnd

# Setup and activate virtual environments
python3 -m venv venv
source venv/bin/activate
# Install dependencies
pip install -r requirements.txt

python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver
```

### Environment Variables

Create a `.env` file in the `backEnd/` directory and set variables if needed

```
DJANGO_SECRET_KEY
DJANGO_DEBUG
DJANGO_ALLOWED_HOSTS
CORS_ALLOWED_ORIGINS
```

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

