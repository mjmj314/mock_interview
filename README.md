# Mock Interview — Frontend / React

A starter project for a frontend mock interview focused on React. It contains a
minimal React client (Vite + Tailwind) and a simple Node.js backend that serves
a products list from JSON storage.

## Structure

```
mock_interview/
├── client/   # React + Vite + Tailwind (root renders "hello world")
└── server/   # Node.js + Express, JSON product storage
```

## Backend (`server/`)

```bash
cd server
npm install
npm run dev        # or: npm start
```

Runs at `http://localhost:4000`.

### Data model

```ts
type Review = {
  id: number;
  userName: string;
  value: number;   // 1 to 5
  content: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  reviews: Review[];
};
```

### Endpoints

| Method   | Path             | Description                          |
| -------- | ---------------- | ------------------------------------ |
| `GET`    | `/products`      | Returns the full list of products.   |
| `DELETE` | `/products/:id`  | Removes the product with that `id`.  |

> The list is loaded into memory from `server/data/products.json` at startup and
> resets on restart, keeping the seed data intact for repeated practice.

## Frontend (`client/`)

```bash
cd client
npm install
npm run dev
```

Runs at `http://localhost:5173`. The root component (`src/App.jsx`) renders a
`hello world` div. Tailwind is already wired up via `src/index.css`.
