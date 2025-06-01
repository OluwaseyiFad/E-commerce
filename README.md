# E-commerce Platform

An advanced e-commerce website facilitating the sale of phones and gadgets, featuring personalized recommendations and a modern full-stack architecture.

## Features

- Product catalog with phones and gadgets
- Recommendation engine for personalized shopping
- User authentication and profiles
- Shopping cart and checkout workflow
- Order history and management
- Admin dashboard for product and order management

## Tech Stack

- **Front End:** React, TypeScript, Vite
- **Back End:** Node.js, Express
- **Database:** (add your DB, e.g., MongoDB, PostgreSQL)
- **APIs:** RESTful endpoints for all major features

## Repository Structure

```
/
├── frontEnd/        # Front-end (React, TypeScript, Vite)
│   └── README.md
├── backEnd/         # Back-end (API, business logic, server)
│   └── README.md
├── resources/       # Documentation and assets
├── Presentation.pptx
├── documentation links
├── LICENSE
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

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

Create a `.env` file in the `backEnd/` directory with the following contents (example):

```
SECRET_KEY=your_secret_key
```

## API Overview

The backend exposes a RESTful API for frontend consumption. Below are some sample endpoints:

| Method | Endpoint               | Description                        |
|--------|------------------------|------------------------------------|
| POST   | /auth/users            | Register a new user                |
| POST   | /auth/login            | User login                         |
| GET    | /api/products          | List all products                  |
| GET    | /api/products/:id      | Get product details                |
| POST   | /api/cart              | Add item to cart                   |
| GET    | /api/cart              | Get user's cart                    |
| POST   | /api/orders            | Place a new order                  |
| GET    | /api/orders            | Get user's order history           |

> For full API documentation, see the backend or use an API tool like Postman with your running backend.

## Documentation


## License

This project is licensed under the terms of the [LICENSE](LICENSE).

---

*For questions or suggestions, please open an issue or contact the maintainer.*
