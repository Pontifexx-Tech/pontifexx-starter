# CLAUDE.md - Pontifexx Starter Kit

This document provides comprehensive guidance for working with this codebase. It covers the technology stack, architecture, coding standards, and best practices.

## Technology Stack

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| PHP | ^8.2 | Runtime |
| Laravel | 12.x | Backend framework |
| Laravel Fortify | 1.x | Authentication scaffolding |
| Inertia.js | 2.x | Server-side adapter |
| Laravel Wayfinder | 0.1.x | Type-safe route generation |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.x | UI library |
| TypeScript | 5.7.x | Type-safe JavaScript |
| Inertia.js React | 2.x | Client-side adapter |
| Tailwind CSS | 4.x | Utility-first CSS |
| Radix UI | Various | Accessible UI primitives |
| Vite | 7.x | Build tool |

### Development Tools

| Tool | Purpose |
|------|---------|
| Laravel Pint | PHP code style (Laravel preset) |
| ESLint | JavaScript/TypeScript linting |
| Prettier | Code formatting |
| Pest | PHP testing framework |

## Project Structure

```
pontifexx-template/
├── app/                          # PHP application code
│   ├── Actions/Fortify/          # Authentication action classes
│   ├── Concerns/                 # Shared PHP traits
│   ├── Http/
│   │   ├── Controllers/          # Route controllers
│   │   ├── Middleware/           # HTTP middleware
│   │   └── Requests/             # Form request validation
│   ├── Models/                   # Eloquent models
│   └── Providers/                # Service providers
├── config/                       # Laravel configuration files
├── database/
│   ├── factories/                # Model factories
│   ├── migrations/               # Database migrations
│   └── seeders/                  # Database seeders
├── public/                       # Web-accessible files
│   ├── favicon.ico               # Favicon (ICO format)
│   ├── favicon.svg               # Favicon (SVG format)
│   └── Pontifexx-paddock-logo.svg # Company logo
├── resources/
│   ├── css/
│   │   └── app.css               # Tailwind CSS configuration
│   ├── js/
│   │   ├── app.tsx               # React entry point
│   │   ├── ssr.tsx               # SSR entry point
│   │   ├── components/           # React components
│   │   │   ├── ui/               # Radix UI wrapper components
│   │   │   ├── app-logo.tsx      # Application logo component
│   │   │   └── app-logo-icon.tsx # Logo SVG icon
│   │   ├── hooks/                # Custom React hooks
│   │   ├── layouts/              # Layout components
│   │   ├── pages/                # Inertia page components
│   │   │   ├── auth/             # Authentication pages
│   │   │   ├── settings/         # User settings pages
│   │   │   ├── dashboard.tsx     # Dashboard page
│   │   │   └── welcome.tsx       # Home page
│   │   ├── routes/               # Auto-generated route types
│   │   ├── types/                # TypeScript type definitions
│   │   └── lib/                  # Utility functions
│   └── views/
│       └── app.blade.php         # Main HTML template
├── routes/
│   ├── web.php                   # Web routes
│   └── settings.php              # Settings routes
├── storage/                      # Runtime storage
├── tests/                        # Test files
├── .env                          # Environment variables
├── .env.example                  # Environment template
├── .prettierrc                   # Prettier configuration
├── eslint.config.js              # ESLint configuration
├── pint.json                     # Laravel Pint configuration
├── composer.json                 # PHP dependencies
├── package.json                  # npm dependencies
├── tsconfig.json                 # TypeScript configuration
└── vite.config.ts                # Vite configuration
```

## Development Commands

### Starting Development

```bash
# Full development environment (server + queue + vite)
composer dev

# With SSR enabled
composer dev:ssr
```

### Building

```bash
# Build frontend assets
npm run build

# Build with SSR
npm run build:ssr
```

### Code Quality

```bash
# PHP linting (auto-fix)
composer lint

# PHP lint check (no fix)
composer test:lint

# JavaScript/TypeScript linting (auto-fix)
npm run lint

# Format with Prettier
npm run format

# Check formatting
npm run format:check

# TypeScript type checking
npm run types
```

### Testing

```bash
# Run all tests
composer test

# Run PHP tests only
php artisan test
```

## Coding Standards

### PHP (Laravel Pint)

This project uses Laravel Pint with the `laravel` preset. Key standards:

- PSR-12 coding style
- Laravel-specific conventions
- Automatic import sorting
- Consistent spacing and formatting

```bash
# Auto-fix PHP code style
composer lint
```

### TypeScript/JavaScript (ESLint + Prettier)

#### ESLint Rules

- **Type imports**: Use `type` keyword for type-only imports
  ```typescript
  import type { User } from '@/types';
  import { useState } from 'react';
  ```

- **Import ordering**: Imports are automatically sorted by group
  1. Built-in modules
  2. External packages
  3. Internal modules (`@/`)
  4. Parent/sibling/index imports

- **React**: No need for `import React` (React 17+ JSX transform)

#### Prettier Configuration

| Setting | Value |
|---------|-------|
| Print width | 80 characters |
| Tab width | 4 spaces |
| Semicolons | Yes |
| Single quotes | Yes |
| Trailing commas | ES5 |

Tailwind CSS class sorting is enabled via `prettier-plugin-tailwindcss`.

### TypeScript

- Strict mode enabled
- Path alias: `@/*` maps to `./resources/js/*`
- Use type annotations for function parameters and return types
- Prefer interfaces for object shapes, types for unions/intersections

```typescript
// Good
interface UserProps {
    user: User;
    onUpdate: (user: User) => void;
}

// Good
type Status = 'pending' | 'active' | 'completed';
```

## Architecture Patterns

### Inertia.js Pages

Pages are React components in `resources/js/pages/`. They receive data as props from Laravel controllers.

```typescript
// resources/js/pages/dashboard.tsx
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface DashboardProps {
    stats: { users: number; posts: number };
}

export default function Dashboard({ stats }: DashboardProps) {
    return (
        <AppLayout>
            <Head title="Dashboard" />
            {/* Page content */}
        </AppLayout>
    );
}
```

### Type-Safe Routes (Wayfinder)

Routes are auto-generated in `resources/js/routes/`. Always use these instead of hardcoding URLs.

```typescript
import { dashboard, login, settings } from '@/routes';

// Usage
<Link href={dashboard()}>Dashboard</Link>
<Link href={settings.profile()}>Profile</Link>
```

### Components

#### UI Components (`components/ui/`)

Wrapper components around Radix UI primitives. These are styled with Tailwind and use `class-variance-authority` for variants.

```typescript
import { Button } from '@/components/ui/button';

<Button variant="destructive" size="sm">Delete</Button>
```

#### App Components (`components/`)

Application-specific components like `AppLogo`, `AppSidebar`, `NavUser`, etc.

### Layouts

- `AppLayout`: Main authenticated layout with sidebar
- `AuthLayout`: Layout for authentication pages
- `AppSidebarLayout`: Sidebar variant of app layout

### Hooks

Custom hooks in `resources/js/hooks/`:

- `useAppearance()`: Theme management (light/dark/system)

## Theming

### CSS Variables

Theme colors are defined in `resources/css/app.css` using CSS custom properties:

```css
:root {
    --primary: #1c4571;
    --secondary: #d6ab93;
    --background: #ffffff;
    --foreground: #020817;
    /* ... more variables */
}

.dark {
    --background: #020817;
    --foreground: #f8fafc;
    /* ... dark mode overrides */
}
```

### Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#1c4571` / `#203f6c` | Primary actions, logo |
| Secondary Tan | `#d6ab93` / `#dbb298` | Accents, secondary elements |

### Dark Mode

Dark mode is handled via:
1. System preference detection
2. User preference stored in localStorage and cookie
3. `useAppearance()` hook for React components
4. `HandleAppearance` middleware for SSR

## Authentication

Authentication is powered by Laravel Fortify with the following features:

- Login / Logout
- Registration
- Password reset
- Email verification
- Two-factor authentication (TOTP)
- Profile management

### Auth Pages

Located in `resources/js/pages/auth/`:
- `login.tsx`
- `register.tsx`
- `reset-password.tsx`
- `forgot-password.tsx`
- `verify-email.tsx`
- `two-factor-challenge.tsx`

### Settings Pages

Located in `resources/js/pages/settings/`:
- `profile.tsx` - Profile information
- `password.tsx` - Password change
- `appearance.tsx` - Theme preferences
- `two-factor.tsx` - 2FA setup

## Database

Default configuration uses SQLite for simplicity. For production, configure MySQL/PostgreSQL in `.env`.

```bash
# Run migrations
php artisan migrate

# Fresh migration with seeders
php artisan migrate:fresh --seed
```

## Environment Variables

Key environment variables in `.env`:

```env
APP_NAME="Pontifexx Starter Kit"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://pontifexx-template.test

DB_CONNECTION=sqlite

MAIL_MAILER=log
```

## Best Practices

### Do

- Use type-safe routes from `@/routes`
- Use the `@/` path alias for imports
- Follow the existing component patterns
- Use Radix UI components for accessibility
- Run `composer lint` and `npm run lint` before committing
- Write meaningful commit messages

### Don't

- Hardcode URLs - use Wayfinder routes
- Skip TypeScript types - maintain type safety
- Modify UI components directly - extend with variants
- Commit with linting errors
- Use `any` type without justification

## Troubleshooting

### Common Issues

**Vite not loading assets**
```bash
npm run build
# or restart dev server
npm run dev
```

**Route types not updating**
```bash
php artisan wayfinder:generate
```

**SSR issues**
```bash
npm run build:ssr
php artisan inertia:start-ssr
```

**Database issues**
```bash
php artisan migrate:fresh
```

## Resources

- [Laravel Documentation](https://laravel.com/docs)
- [React Documentation](https://react.dev)
- [Inertia.js Documentation](https://inertiajs.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
