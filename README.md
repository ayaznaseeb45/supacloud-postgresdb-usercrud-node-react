# SupaCloud CRUD - Node.js + React

A simple dummy CRUD project built with React and Node.js, using a PostgreSQL database hosted on Supabase Cloud. You can create, view, update, and delete users, with a separate About page.

## Tech stack

- **Frontend:** React, Vite, Tailwind CSS, and Axios.
- **Backend:** Node.js, Express, Zod, and Prisma.
- **Database:** PostgreSQL hosted on Supabase Cloud, accessed through Prisma.

## Requirements

- Node.js 22.12 or newer and npm. The frontend's Vite package requires Node.js `^20.19.0 || >=22.12.0`.
- Git to clone the repository, or download and extract the ZIP from GitHub.
- A Supabase project with a cloud-hosted PostgreSQL database and its connection URL.

## 1. Download the project

```bash
git clone https://github.com/ayaznaseeb45/supacloud-postgresdb-usercrud-node-react.git
cd supacloud-postgresdb-usercrud-node-react
```

There are two separate apps: `userbacked` (backend) and `userfrontend` (frontend). Run `npm i` inside each folder, not at the repository root.

## 2. Set up and start the backend

In your first terminal, starting from the repository root:

```bash
cd userbacked
npm i
```

Create a file named `.env` inside `userbacked`:

```dotenv
PORT=5000
DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:5432/DATABASE?sslmode=require"
```

Replace the example URL with your own Supabase PostgreSQL connection string. Copy it from your Supabase project's connection settings and replace its password placeholder with your database password. Use the database connection URL, not the Supabase project API URL or API key. The database runs on Supabase Cloud, so you do not need to install PostgreSQL locally. The React frontend and Node.js backend run locally with the steps below.

Use a database intended for this practice project. The next command creates or syncs the tables defined in `prisma/schema.prisma`.

From the same `userbacked` terminal, run:

```bash
npx prisma generate
npx prisma db push
npx prisma db execute --schema prisma/schema.prisma --file prisma/email-unique.sql
npm run dev
```

The extra SQL index prevents duplicate emails even when letter case or surrounding spaces differ. Apply it after syncing the Prisma schema. If existing duplicates prevent index creation, resolve those records first; this command does not delete users.

Keep this terminal running. The backend starts at `http://localhost:5000`.

- Open `http://localhost:5000/` to check that the API server is running.
- Open `http://localhost:5000/api/users` to check the database connection and fetch users. An empty list is normal before adding your first user.

You can also use `npm start` to run the backend without automatic restarts.

## 3. Set up and start the frontend

Open a second terminal at the repository root:

```bash
cd userfrontend
npm i
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

Keep both terminals running while using the app. The frontend calls `http://localhost:5000/api`, configured in `userfrontend/src/services/userApi.js`. If you change the backend port, update that URL too. No frontend `.env` file is required for the current setup.

## 4. Try the app

1. On **Home**, enter a name and email, optionally add age and city, and click **Add User**.
2. View the new user in the table.
3. Click **Edit** to update their details.
4. Click **Delete** and confirm to remove them.
5. Open **About** to read about the project and its tech stack.

## Frontend production build

From `userfrontend`:

```bash
npm run build
npm run preview
```

This builds and previews the frontend locally. The backend must still be running for CRUD operations to work.

## Common setup issues

- **`npm i` cannot find package.json:** Check that you are inside `userbacked` or `userfrontend`.
- **Missing `DATABASE_URL`:** Create `userbacked/.env` before running Prisma commands or starting the backend.
- **Prisma cannot connect:** Check the database URL, password, database availability, and whether the connection host is reachable from your network.
- **Failed to fetch users:** Check that the backend is running on port 5000, the database setup succeeded, and the frontend API URL matches your backend.
- **Vite reports an unsupported Node.js version:** Check `node -v` against the version requirement above.

Local `.env` files and `node_modules` are excluded from Git. Keep database credentials in your local `.env` file.
