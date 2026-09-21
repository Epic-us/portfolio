# Systems Analyst Portfolio

Портфолио системного аналитика на Next.js с интерактивными Mermaid-диаграммами и встроенной Sanity Studio.

## Локальный запуск

```powershell
Copy-Item .env.example .env.local
npm ci
npm run dev
```

Сайт: `http://localhost:3000`  
Админка: `http://localhost:3000/studio`

Если Sanity ещё не настроен, сайт использует демонстрационные данные из `src/lib/fallback-data.ts`.

## Подключение Sanity

1. Создать проект на `https://www.sanity.io/manage`.
2. Скопировать Project ID в `.env.local`.
3. Добавить `http://localhost:3000` и публичный домен сайта в CORS Origins проекта Sanity с разрешением credentials.
4. Перезапустить приложение и открыть `/studio`.

```dotenv
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-09-21
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SANITY_API_READ_TOKEN=
GITHUB_TOKEN=
```

## Проверки

```powershell
npm run typecheck
npm run lint
npm run build
```

## Развёртывание на Debian с Docker

```bash
git clone https://github.com/Epic-us/portfolio.git
cd portfolio
cp .env.example .env
docker compose up -d --build
docker compose ps
curl --fail http://127.0.0.1:3000/api/health
```

Контейнер слушает только `127.0.0.1:3000`. Для публичного доступа требуется reverse proxy с HTTPS.
