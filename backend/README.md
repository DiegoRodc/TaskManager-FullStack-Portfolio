# Task Manager API

Express + MongoDB backend for the Task Manager Vue application.

## Requirements

- Node.js 18+
- MongoDB Atlas (or a compatible MongoDB deployment)
- Google OAuth 2.0 web application credentials

## Local setup

```bash
cd backend
npm ci
cp .env.example .env
```

Set the values in `.env`:

- `MONGODB_CONNECTION_STRING`: MongoDB connection string with the `Todo` database selected.
- `SESSION_SECRET`: long random secret used to sign the session cookie.
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: Google OAuth credentials.
- `CORS_CLIENT_ORIGIN`: exact frontend origin, such as `http://localhost:8081`.
- `PROTOCOL=http` and `PORT=1337` for local development.

In Google Cloud Console, configure the authorized redirect URI to:

`http://localhost:1337/api/v1/auth/google/callback`

Start the API:

```bash
npm run server
```

The status endpoint is `http://localhost:1337/api/v1/status`.

## API

All routes are prefixed with `/api/v1`.

| Method | Endpoint | Authentication | Purpose |
|---|---|---|---|
| GET | `/auth/google` | No | Start Google login |
| GET | `/auth/google/callback` | OAuth callback | Complete login |
| GET/POST | `/auth/logout` | Session | Log out |
| GET | `/status` | No | API/database status |
| GET | `/user` | Yes | Current user |
| GET | `/tasks` | Yes | List the current user's tasks |
| POST | `/tasks` | Yes | Create a task |
| GET | `/tasks/:id` | Yes | Read an owned task |
| PUT | `/tasks/:id` | Yes | Update an owned task |
| DELETE | `/tasks/:id` | Yes | Delete an owned task |

Task records use `userId`, `text`, `done`, and `date`.

## Security notes

- Task reads, updates, and deletes are scoped to the authenticated user's ID.
- OAuth redirect destinations are restricted to `CORS_CLIENT_ORIGIN` to prevent open redirects.
- Keep `.env` out of Git. Rotate any credentials that were previously committed or shared.
- Use HTTPS in production and configure secure cookie settings and the exact production frontend origin.
