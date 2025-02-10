#   Gadget API

##  Project Overview
Gadget API is a RESTful service for managing gadgets with authentication and authorization. It supports user authentication, gadget creation, updates, and self-destruction functionalities.

## Tech Stack
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** PostgreSQL (Prisma ORM)
- **Authentication:** JWT
- **Middleware:** Express Validator, bcrypt, dotenv
- **Logging & Error Handling:** Winston, Morgan

---
##  Project Structure
```
Gadget API/
│── src/
│   ├── application/
│   │   └── services/           # Business logic (GadgetService)
│   ├── domain/
│   │   └── repositories/       # Database interactions (GadgetRepository)
│   ├── presentation/
│   │   ├── controllers/       # Express Controllers
│   │   ├── routes/            # Express Routes
│   ├── shared/
│   │   ├── middleware/        # Auth & Error Middleware
│── prisma/
│   ├── schema.prisma          # Database Schema
|   ├── migrations/            # Prisma Migrations
│── .env                       # Environment Variables
├── server.ts                  # API Entry Point
│── package.json               # Dependencies
│── README.md                  # Documentation
```

---
##  Installation & Setup

### 1️ **Clone the Repository**
```sh
git clone https://github.com/yourusername/imf-gadget-api.git
cd imf-gadget-api
```

### 2️ **Install Dependencies**
```sh
npm install
```

### 3️ **Set Up Environment Variables**
Create a `.env` file in the root folder and add:
```env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
JWT_SECRET=your_secret_key
```

### 4️**Run Database Migrations**
```sh
npx prisma migrate dev --name init
```

### 5️ **Start the Server**
```sh
npm run dev
```

---
##  Authentication
- **Login:** `/api/auth/login` (POST)
- **Protected Routes:** `/api/gadgets/*` (Requires JWT)
- **Token Format:** `Authorization: Bearer <your_token>`

---
## API Endpoints
### **Auth Routes**
| Method | Endpoint       | Description |
|--------|--------------|-------------|
| POST   | /api/auth/login | Authenticate user and get JWT |

### **Gadget Routes (Protected)**
| Method | Endpoint                   | Description |
|--------|----------------------------|-------------|
| GET    | /api/gadgets                | Get all gadgets |
| POST   | /api/gadgets                | Create a new gadget |
| PATCH  | /api/gadgets/:id            | Update gadget details |
| DELETE | /api/gadgets/:id            | Decommission gadget |
| POST   | /api/gadgets/:id/self-destruct | Self-destruct a gadget |

---
