# Matsmart Logistik Frontend

This is the **intranet-style** frontend for Matsmart’s warehouse management system. After logging in, users can:

- View current stock levels (**Lager**)
- Update an item’s stock amount (+/-)
- Browse and manage items (**Artiklar**)
- Create, edit, and delete items

The frontend communicates with the Matsmart backend API (JWT-based auth).

## Tech Stack

- **Vue 3**
- **Vue Router**
- **TypeScript**
- **Tailwind CSS v4**
- **Vite** (dev server + build)
- **vue-toast-notification**
- **vue-spinner** (loading spinners)

## Project Structure

```plaintext
src/
├── assets/                 # Global CSS + icons
│   ├── images/             # SVG icons used in the UI
│   └── main.css            # Tailwind custom styling
├── components/             # UI components
├── composables/            # Reusable logic
├── models/                 # TypeScript types
├── router/                 # Vue Router setup
├── types/                  # Type declarations
├── views/                  # Route views
├── App.vue                 # Root component
└── main.ts                 # App entry point

public/
└── images/                 # Selectable item images (served as /images/*)
```

## Authentication & API

- JWT is stored in `localStorage` under the key `token`.
- Protected views validate the token via the backend `/login/auth` endpoint.
- API requests send `Authorization: Bearer <token>`.

### Environment variable

By default, the app uses the deployed backend API:

- `https://matsmart-backend.azurewebsites.net/api`

To run against a local backend, create a `.env` file in the project root:

```bash
VITE_API_BASE_URL=http://localhost:3000/api
```

> The base URL must include `/api`, since the frontend calls endpoints like `/items` and `/users/login`.

## Running Locally

### Prerequisites

- [Node.js](https://nodejs.org/)
- Git

### Step 1: Clone the project

```bash
git clone https://github.com/RobinHawiz/matsmart-frontend.git
cd matsmart-frontend
```

### Step 2: Install and run

```bash
npm install
npm run dev
```

The frontend runs locally on:

- `http://localhost:5173`

### Useful scripts

```bash
npm run dev        # Start dev server
npm run build      # Typecheck + production build
npm run preview    # Preview production build locally
npm run typecheck  # Typecheck
```

> **Backend required:** This frontend expects the Matsmart backend API to be running separately.
> You can find it here: https://github.com/RobinHawiz/matsmart-backend
