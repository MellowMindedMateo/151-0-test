# 151-0

A Pokémon draft game where you build a team and battle through gym leaders across Kanto, Johto, and Hoenn.

## How to Play

1. Pick your generation (Gen I, II, III or mix)
2. Pick your region's gym leaders to face
3. Draft a team of 6 Pokémon — first pick is always a starter
4. Battle through every gym leader and the Elite Four
5. Submit your score to the global leaderboard

## Features

- 300+ Pokémon across Gen I, II, and III
- Type matchups matter — super effective hits give real advantages
- Legendary Pokémon have a major power boost
- Daily challenge mode with a shared seed (everyone gets the same Pokémon)
- Global leaderboard with daily, weekly, monthly, and all-time filters
- Shareable results card

## Tech Stack

- Next.js 16
- TypeScript
- Tailwind CSS
- Vercel Postgres (leaderboard)
- Vercel Analytics

## Database Setup

The leaderboard requires a Postgres database. In Vercel, go to Storage → Create Database → Postgres. Then run this SQL to create the table:

```sql
CREATE TABLE leaderboard (
  id SERIAL PRIMARY KEY,
  name TEXT,
  wins INT,
  losses INT,
  total INT,
  team TEXT,
  gen_label TEXT,
  region_label TEXT,
  daily BOOLEAN,
  ts BIGINT
);
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Vercel Postgres connection string |

## Local Development

```bash
pnpm install
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000)

## Live Site

[151-0.com](https://151-0.com)
