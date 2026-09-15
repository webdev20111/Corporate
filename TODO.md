# Deployment Plan for Angular + Laravel to Profreehost

## Information Gathered
- Angular frontend with routing, built using `ng build --prod`.
- Laravel backend with API routes prefixed at `/api`, admin routes at `/admin`, root serves `welcome` view.
- Domain: https://mpssoftware.unaux.com/ points to root directory.
- Profreehost shared hosting supports PHP and MySQL.
- Created `environment.prod.ts` with `apiBaseUrl: 'https://mpssoftware.unaux.com/api'`.
- Backend requires `.env` configuration for production database.

## Plan
1. [x] Create production environment file for Angular.
2. Build Angular frontend for production.
3. Integrate Angular build into Laravel's public folder.
4. Configure Laravel backend for production.
5. Upload Laravel project to server's root directory (public_html).
6. Set up database and run migrations/seeders.
7. Set proper permissions and test deployment.

## Dependent Files to be edited
- `frontend/src/environments/environment.prod.ts` (created)
- `backend/.env` (user to create/configure with production values)

## Followup Steps
- Build frontend and integrate with backend.
- Configure backend environment.
- Upload to server via FTP.
- Database setup and migrations.
- Permission settings and testing.
