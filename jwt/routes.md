# Current Routes

Here is a list of all the API routes currently defined in your Express application:

## Core Routes (`src/index.js`)

| Method | Route | Description |
|---|---|---|
| `GET` | `/` | Returns "Hello World". (Fixed missing `req, res` issue) |

## Auth Routes (`src/routes/auth.routes.js`)
These routes are prefixed with `/auth`.

| Method | Route | Description |
|---|---|---|
| `POST`| `/auth/login` | Handles user login. |
| `POST`| `/auth/register` | Handles user registration. |
