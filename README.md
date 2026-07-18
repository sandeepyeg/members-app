# Members Management App

An Angular 17 single-page application for managing members, membership status and authenticated admin workflows. It is the frontend companion to the [Members Management API](https://github.com/sandeepyeg/members-backend).

## What It Shows

- JWT-based login flow with route guards
- Auth interceptor for protected API requests
- Centralized loading and error handling interceptors
- Member list with search, expired-only filter and pagination
- Add, edit, delete and details workflows
- Reactive forms with custom validation
- Responsive Tailwind CSS and DaisyUI interface
- Feature-focused Angular structure with standalone components

## Project Structure

```text
src/app/
  core/       Auth, guards, interceptors and shared application services
  features/   Login and members feature areas
  shared/     Shared UI components and modules
```

## Local Setup

Prerequisites:

- Node.js 20+
- npm
- The backend API running locally from `members-backend`

Install dependencies:

```bash
npm ci
```

Start the app:

```bash
npm start
```

Open `http://localhost:4200`.

The development API URL is configured in `src/environments/environment.ts`:

```ts
apiUrl: 'http://localhost:5058/api/v1'
```

Default demo login, when using the seeded backend:

```text
Email: admin@company.com
Password: 123456
```

## Build

```bash
npm run build
```

For production deployments, update `src/environments/environment.prod.ts` or replace it through your deployment pipeline. Do not commit real private API endpoints or secrets.

## Portfolio Notes

This app is intentionally focused on practical business software rather than visual novelty. It demonstrates the kind of full-stack admin workflow that teams maintain every day: authenticated screens, guarded routes, API-backed state, forms, validation, loading states, list/detail views and repeatable CRUD operations.

## Next Improvements

- Add a Docker Compose demo that runs the Angular app and API together
- Add screenshots or a short demo walkthrough
- Add stronger component tests for form validation and member workflows
- Add role-aware UI states that reflect backend authorization policies
