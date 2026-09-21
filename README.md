# Systems Analyst Portfolio

Портфолио системного аналитика на Next.js и Payload CMS. Приложение, PostgreSQL, файлы и админ-панель разворачиваются на собственном сервере.

## Возможности

- проекты, навыки и связи между ними;
- интерактивные Mermaid-диаграммы, OpenAPI, ссылки и загружаемые файлы;
- черновики, версии, автосохранение и отложенная публикация;
- локализация RU/EN и общие настройки сайта;
- REST API, GraphQL API и защищённая админка `/admin`.

## Локальная разработка

Для базы данных проще всего запустить PostgreSQL через Docker, а Next.js — локально.

```powershell
Copy-Item .env.example .env
# Замените пароли и секрет в .env, затем:
docker compose up -d postgres
$env:DATABASE_URL="postgres://portfolio:ВАШ_ПАРОЛЬ@127.0.0.1:5432/portfolio"
$env:PAYLOAD_SECRET="ВАШ_СЛУЧАЙНЫЙ_СЕКРЕТ_НЕ_КОРОЧЕ_32_СИМВОЛОВ"
npm ci
npm run dev
```

Сайт: `http://localhost:3000`  
Админка: `http://localhost:3000/admin`

При первом открытии админки Payload предложит создать первого владельца. После этого анонимная регистрация автоматически закрывается.

## Проверки

```powershell
npm run generate:types
npm run typecheck
npm run lint
npm run build
```

## Развёртывание на Debian

```bash
git clone https://github.com/Epic-us/portfolio.git
cd portfolio
cp .env.example .env
nano .env
docker compose up -d --build
docker compose ps
curl --fail http://127.0.0.1:3000/api/health
```

В `.env` значения `POSTGRES_PASSWORD` и пароль внутри `DATABASE_URL` должны совпадать. `PAYLOAD_SECRET` можно создать командой:

```bash
openssl rand -hex 32
```

Приложение слушает только `127.0.0.1:3000`. Для публичного доступа настройте Caddy или Nginx с HTTPS. Резервное копирование должно включать оба Docker volume: `postgres_data` и `media_data`.

Для Cloudflare Tunnel добавьте `CLOUDFLARE_TUNNEL_TOKEN` в `.env` и запустите профиль:

```bash
docker compose --profile tunnel up -d
```
