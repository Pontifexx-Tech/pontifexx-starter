import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import type { SharedData } from '@/types';
import AppLogoIcon from '@/components/app-logo-icon';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
                {/* Header */}
                <header className="border-b border-[#e3e3e0] px-6 py-4 dark:border-[#3E3E3A]">
                    <div className="mx-auto flex max-w-6xl items-center justify-between">
                        <AppLogoIcon className="h-8 w-auto" />
                        <nav className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="inline-block rounded-md bg-[#203f6c] px-5 py-2 text-sm font-medium text-white hover:bg-[#1a3459]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="inline-block rounded-md px-5 py-2 text-sm font-medium text-[#1b1b18] hover:bg-[#f5f5f4] dark:text-[#EDEDEC] dark:hover:bg-[#1a1a1a]"
                                    >
                                        Log in
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="inline-block rounded-md bg-[#203f6c] px-5 py-2 text-sm font-medium text-white hover:bg-[#1a3459]"
                                        >
                                            Register
                                        </Link>
                                    )}
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="border-b border-[#e3e3e0] px-6 py-16 dark:border-[#3E3E3A]">
                    <div className="mx-auto max-w-6xl text-center">
                        <h1 className="mb-4 text-4xl font-semibold tracking-tight lg:text-5xl">
                            Pontifexx Starter Kit
                        </h1>
                        <p className="mx-auto mb-8 max-w-2xl text-lg text-[#706f6c] dark:text-[#A1A09A]">
                            A modern, production-ready starter kit built with
                            Laravel 12, React 19, Inertia.js, and Tailwind CSS.
                            Everything you need to build beautiful, fast web
                            applications.
                        </p>
                        <div className="flex justify-center gap-4">
                            <a
                                href="#features"
                                className="inline-block rounded-md bg-[#203f6c] px-6 py-3 text-sm font-medium text-white hover:bg-[#1a3459]"
                            >
                                Explore Features
                            </a>
                            <a
                                href="#stack"
                                className="inline-block rounded-md border border-[#e3e3e0] px-6 py-3 text-sm font-medium hover:bg-[#f5f5f4] dark:border-[#3E3E3A] dark:hover:bg-[#1a1a1a]"
                            >
                                View Stack
                            </a>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section
                    id="features"
                    className="border-b border-[#e3e3e0] px-6 py-16 dark:border-[#3E3E3A]"
                >
                    <div className="mx-auto max-w-6xl">
                        <h2 className="mb-12 text-center text-3xl font-semibold">
                            What's Included
                        </h2>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <FeatureCard
                                title="Authentication"
                                description="Complete authentication system with login, registration, password reset, email verification, and two-factor authentication powered by Laravel Fortify."
                            />
                            <FeatureCard
                                title="Dark Mode"
                                description="Built-in dark mode support with system preference detection and user override. Seamlessly integrates with SSR for flash-free theme switching."
                            />
                            <FeatureCard
                                title="Type-Safe Routing"
                                description="Auto-generated TypeScript route definitions with Wayfinder. Never write a wrong route again with full IDE autocomplete support."
                            />
                            <FeatureCard
                                title="UI Components"
                                description="Pre-built, accessible UI components using Radix UI primitives. Includes buttons, dialogs, dropdowns, forms, and more."
                            />
                            <FeatureCard
                                title="Server-Side Rendering"
                                description="SSR enabled out of the box for better SEO and faster initial page loads. Configured and ready for production."
                            />
                            <FeatureCard
                                title="User Settings"
                                description="Complete settings pages for profile management, password changes, appearance preferences, and two-factor authentication setup."
                            />
                        </div>
                    </div>
                </section>

                {/* Stack Section */}
                <section
                    id="stack"
                    className="border-b border-[#e3e3e0] px-6 py-16 dark:border-[#3E3E3A]"
                >
                    <div className="mx-auto max-w-6xl">
                        <h2 className="mb-12 text-center text-3xl font-semibold">
                            The Stack
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            <StackCard
                                category="Backend"
                                items={[
                                    {
                                        name: 'Laravel 12',
                                        description:
                                            'The PHP framework for web artisans',
                                    },
                                    {
                                        name: 'Laravel Fortify',
                                        description:
                                            'Backend authentication scaffolding',
                                    },
                                    {
                                        name: 'SQLite / MySQL',
                                        description:
                                            'Flexible database support',
                                    },
                                ]}
                            />
                            <StackCard
                                category="Frontend"
                                items={[
                                    {
                                        name: 'React 19',
                                        description:
                                            'The library for building user interfaces',
                                    },
                                    {
                                        name: 'Inertia.js',
                                        description:
                                            'The modern monolith approach',
                                    },
                                    {
                                        name: 'TypeScript 5.7',
                                        description: 'Type-safe JavaScript',
                                    },
                                ]}
                            />
                            <StackCard
                                category="Styling"
                                items={[
                                    {
                                        name: 'Tailwind CSS 4',
                                        description:
                                            'Utility-first CSS framework',
                                    },
                                    {
                                        name: 'Radix UI',
                                        description:
                                            'Unstyled, accessible components',
                                    },
                                    {
                                        name: 'Lucide Icons',
                                        description:
                                            'Beautiful & consistent icons',
                                    },
                                ]}
                            />
                            <StackCard
                                category="Tooling"
                                items={[
                                    {
                                        name: 'Vite 7',
                                        description:
                                            'Next generation frontend tooling',
                                    },
                                    {
                                        name: 'ESLint & Prettier',
                                        description:
                                            'Code quality and formatting',
                                    },
                                    {
                                        name: 'Laravel Pint',
                                        description: 'PHP code style fixer',
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </section>

                {/* Getting Started Section */}
                <section
                    id="getting-started"
                    className="border-b border-[#e3e3e0] px-6 py-16 dark:border-[#3E3E3A]"
                >
                    <div className="mx-auto max-w-3xl">
                        <h2 className="mb-12 text-center text-3xl font-semibold">
                            Getting Started
                        </h2>
                        <div className="space-y-6">
                            <Step
                                number={1}
                                title="Clone the repository"
                                code="git clone <repository-url> my-project"
                            />
                            <Step
                                number={2}
                                title="Install dependencies"
                                code="composer install && npm install"
                            />
                            <Step
                                number={3}
                                title="Set up environment"
                                code="cp .env.example .env && php artisan key:generate"
                            />
                            <Step
                                number={4}
                                title="Run migrations"
                                code="php artisan migrate"
                            />
                            <Step
                                number={5}
                                title="Start development"
                                code="composer dev"
                            />
                        </div>
                    </div>
                </section>

                {/* Project Structure Section */}
                <section
                    id="structure"
                    className="border-b border-[#e3e3e0] px-6 py-16 dark:border-[#3E3E3A]"
                >
                    <div className="mx-auto max-w-4xl">
                        <h2 className="mb-12 text-center text-3xl font-semibold">
                            Project Structure
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="rounded-lg border border-[#e3e3e0] p-6 dark:border-[#3E3E3A]">
                                <h3 className="mb-4 font-semibold">
                                    Backend (Laravel)
                                </h3>
                                <pre className="overflow-x-auto text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                    {`app/
├── Actions/      # Fortify actions
├── Http/
│   ├── Controllers/
│   └── Middleware/
├── Models/       # Eloquent models
└── Providers/    # Service providers

config/           # Configuration files
routes/           # Route definitions
database/         # Migrations & seeders`}
                                </pre>
                            </div>
                            <div className="rounded-lg border border-[#e3e3e0] p-6 dark:border-[#3E3E3A]">
                                <h3 className="mb-4 font-semibold">
                                    Frontend (React)
                                </h3>
                                <pre className="overflow-x-auto text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                    {`resources/js/
├── components/   # React components
│   └── ui/       # Radix UI wrappers
├── hooks/        # Custom React hooks
├── layouts/      # Layout components
├── pages/        # Inertia pages
│   ├── auth/     # Auth pages
│   └── settings/ # Settings pages
├── routes/       # Generated routes
└── types/        # TypeScript types`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Documentation Links */}
                <section className="border-b border-[#e3e3e0] px-6 py-16 dark:border-[#3E3E3A]">
                    <div className="mx-auto max-w-6xl">
                        <h2 className="mb-12 text-center text-3xl font-semibold">
                            Documentation
                        </h2>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <DocLink
                                href="https://laravel.com/docs"
                                title="Laravel"
                                description="Backend framework documentation"
                            />
                            <DocLink
                                href="https://react.dev"
                                title="React"
                                description="Frontend library documentation"
                            />
                            <DocLink
                                href="https://inertiajs.com"
                                title="Inertia.js"
                                description="The modern monolith"
                            />
                            <DocLink
                                href="https://tailwindcss.com/docs"
                                title="Tailwind CSS"
                                description="Utility-first CSS framework"
                            />
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="px-6 py-8">
                    <div className="mx-auto max-w-6xl text-center text-sm text-[#706f6c] dark:text-[#A1A09A]">
                        <p>
                            Built with care by Pontifexx Paddock. Ready for your
                            next project.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}

function FeatureCard({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <div className="rounded-lg border border-[#e3e3e0] p-6 dark:border-[#3E3E3A]">
            <h3 className="mb-2 font-semibold">{title}</h3>
            <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                {description}
            </p>
        </div>
    );
}

function StackCard({
    category,
    items,
}: {
    category: string;
    items: { name: string; description: string }[];
}) {
    return (
        <div className="rounded-lg border border-[#e3e3e0] p-6 dark:border-[#3E3E3A]">
            <h3 className="mb-4 text-lg font-semibold text-[#203f6c] dark:text-[#dbb298]">
                {category}
            </h3>
            <ul className="space-y-3">
                {items.map((item) => (
                    <li key={item.name}>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                            {' '}
                            - {item.description}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function Step({
    number,
    title,
    code,
}: {
    number: number;
    title: string;
    code: string;
}) {
    return (
        <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#203f6c] text-sm font-semibold text-white">
                {number}
            </div>
            <div className="flex-1">
                <h3 className="mb-2 font-medium">{title}</h3>
                <code className="block rounded-md bg-[#f5f5f4] px-4 py-2 font-mono text-sm dark:bg-[#1a1a1a]">
                    {code}
                </code>
            </div>
        </div>
    );
}

function DocLink({
    href,
    title,
    description,
}: {
    href: string;
    title: string;
    description: string;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-lg border border-[#e3e3e0] p-4 transition-colors hover:border-[#203f6c] dark:border-[#3E3E3A] dark:hover:border-[#dbb298]"
        >
            <h3 className="mb-1 font-medium group-hover:text-[#203f6c] dark:group-hover:text-[#dbb298]">
                {title}
                <span className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">
                    &rarr;
                </span>
            </h3>
            <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                {description}
            </p>
        </a>
    );
}
