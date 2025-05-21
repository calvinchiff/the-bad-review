# The Bad Review (TBR)

The Bad Review (TBR) is a fullstack application where players can join a game room, answer movie review-based questions, and compete in real time.

---

## Project Structure

```
/
├── backend/         # Express + Socket.IO + Prisma server
├── frontend/        # Next.js user interface
└── README.md        # Global project guide
```

---

# Backend

### Run locally

```bash
cd backend
npm install
npm run dev
```

> Make sure to create a `.env` file in the `backend/` folder with a valid `DATABASE_URL` pointing to your Supabase database.

### Run tests

```bash
cd backend
npm run test
```

> Requires the `DATABASE_URL` environment variable to be set properly.

### Docker

```bash
cd backend
docker build -t tbr-backend .
docker run -p 3000:3000 --env-file .env tbr-backend
```

### Simulate GitHub Actions with act

```bash
# From the root of the project
act push --container-architecture linux/amd64 --secret-file ./backend/.env
```

> The `.env` file must include a valid `DATABASE_URL`.

### Required environment variables

Define the following in a `.env` file inside the `backend/` folder:

```
DATABASE_URL=postgresql://username:password@your-supabase-host:5432/dbname
```

You can find this value in Supabase under Project Settings > Database.

---

# Frontend

### Run locally

```bash
cd frontend
npm install
npm run dev
```

> The frontend uses mocked API responses and Socket.IO events during development. The backend is not required to preview the interface.

---

# Tech Stack

- **Backend**: Express, Prisma, PostgreSQL, Socket.IO
- **Frontend**: Next.js, React, Tailwind CSS
- **DevOps**: Docker, GitHub Actions, act

---

# License

MIT
