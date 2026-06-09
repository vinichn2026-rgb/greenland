# Greenland — MySQL Backend Setup Guide

## Quick Start

### Step 1 — Set Up MySQL

1. Make sure **MySQL Server** is installed and running.
2. Open **MySQL Workbench** or the MySQL command line.
3. Run the schema script to create the database and seed data:

```sql
source server/schema.sql
```

Or run it from the command line:
```bash
mysql -u root -p < server/schema.sql
```

---

### Step 2 — Configure .env

Edit the `.env` file in the project root and fill in your MySQL credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=your_mysql_password_here
DB_NAME=greenland_db
SERVER_PORT=3001
CLIENT_ORIGIN=http://localhost:5173
VITE_API_URL=http://localhost:3001
```

---

### Step 3 — Install Dependencies

```bash
npm install
```

---

### Step 4 — Start Both Servers

```bash
npm start
```

This runs **both** the Vite frontend (port 5173) and the Express API (port 3001) simultaneously.

Or start them separately:
```bash
# Terminal 1 — Frontend
npm run dev

# Terminal 2 — API Server
npm run server
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |
| GET | `/api/plots` | List all property listings |
| GET | `/api/plots/:id` | Get single listing detail |
| POST | `/api/plots` | Create a new listing |
| POST | `/api/contacts` | Save a contact form submission |
| GET | `/api/contacts` | View all submissions (admin) |
| POST | `/api/users/register` | Register a new user |
| POST | `/api/users/login` | Authenticate user |

---

## Database Tables

| Table | Purpose |
|-------|---------|
| `plots` | Property listings |
| `plot_images` | Images per listing (max 5) |
| `users` | Registered accounts |
| `contacts` | Contact form messages |

---

## Verify It's Working

1. Open http://localhost:3001/api/health — should return `{"status":"ok"}`
2. Open http://localhost:3001/api/plots — should return the 4 seeded plots as JSON
3. Open the app at http://localhost:5173 — listings should load from MySQL
