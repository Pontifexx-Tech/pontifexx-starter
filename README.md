# Pontifexx Starter Kit

Een moderne, productieklare Laravel + React starter kit met alles wat je nodig hebt om snel te beginnen.

## Stack

- **Backend**: Laravel 12, PHP 8.2+
- **Frontend**: React 19, TypeScript 5.7, Inertia.js
- **Styling**: Tailwind CSS 4, Radix UI
- **Auth**: Laravel Fortify, Socialite (Microsoft SSO)
- **AI**: NeuronAI (Anthropic, OpenAI, Gemini, Mistral, Ollama)

## Installatie

### Met Laravel Herd

```bash
laravel new my-project --using=pontifexx/starter-kit
```

### Handmatig

```bash
# Clone repository
git clone <repository-url> my-project
cd my-project

# Installeer dependencies
composer install
npm install

# Configureer omgeving
cp .env.example .env
php artisan key:generate

# Database setup
php artisan migrate

# Start ontwikkeling
composer dev
```

## Functies

- Authenticatie (login, registratie, wachtwoord reset, 2FA)
- Microsoft SSO via OAuth
- Donkere modus met systeemvoorkeur
- Type-veilige routing met Wayfinder
- UI componenten (Radix UI)
- Server-Side Rendering
- AI integratie klaar (NeuronAI)
- Volledig Nederlandse UI

## Configuratie

### Microsoft SSO

```env
MICROSOFT_CLIENT_ID=your-client-id
MICROSOFT_CLIENT_SECRET=your-client-secret
MICROSOFT_TENANT_ID=common
```

### AI Providers

```env
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=...
MISTRAL_API_KEY=...
OLLAMA_HOST=http://localhost:11434
```

## Commando's

```bash
composer dev          # Start ontwikkelomgeving
composer lint         # PHP code style fix
npm run lint          # JS/TS linting
npm run build         # Build voor productie
php artisan test      # Run tests
```

## Documentatie

Zie `CLAUDE.md` voor uitgebreide documentatie over de stack, coding standards en best practices.

## Licentie

Eigendom van Pontifexx Paddock.
