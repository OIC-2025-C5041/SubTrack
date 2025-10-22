# SubTrack Backend

Requirements: Node.js (16+) and a running MySQL server.

1. Install dependencies

```powershell
cd "c:\Users\gamin\OneDrive\Desktop\Subscription Analytics Tool\backend"
npm install
```

1. Configure environment

Copy `.env.example` to `.env` and update values (DB credentials, JWT secret).

1. Create MySQL database

Using your MySQL client, create a database matching the `DB_NAME` value in `.env`. You can run the SQL in `db/schema.sql` to create tables.

1. Start dev server

```powershell
npm run dev
```

The API will be available at `http://localhost:4000/api`.

Endpoints:

- `POST /api/auth/register` — body: { name, email, password }
- `POST /api/auth/login` — body: { email, password }
- `GET /api/subscriptions` — authenticated
- `POST /api/subscriptions` — authenticated
- `PUT /api/subscriptions/:id` — authenticated
- `DELETE /api/subscriptions/:id` — authenticated
