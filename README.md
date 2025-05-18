# CricShort

A T3 Stack application for cricket match management and statistics.

## Quick Start (Using Docker)

```bash
# Build and run the application
docker build -t cs .
docker run -p 3000:3000 --name cricshort cs
```

Access the application at http://localhost:3000/

### Updating Database (Inside Docker)

To update match data, points, or innings, run the following scripts:

```bash
# Update matches
docker exec -it cricshort bun run src/scripts/matches.ts

# Update points table
docker exec -it cricshort bun run src/scripts/points.ts

# Update innings data
docker exec -it cricshort bun run src/scripts/innings.ts
```

## Running Without Docker

### Prerequisites
- [Bun](https://bun.sh) installed on your system
- SQLite

### Steps
```bash
# Install dependencies
bun install

# Run in development mode
bun run dev

# Or build and run in production
bun run build
bun run start
```

## Database

The application uses SQLite stored in `db.sqlite` in the root folder. You can use any SQLite browser to view or modify the database contents.

## Tech Stack

Built with [T3 Stack](https://create.t3.gg/):
- Next.js for the frontend
- tRPC for type-safe APIs
- Drizzle for database ORM
- Tailwind CSS for styling