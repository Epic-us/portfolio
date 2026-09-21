import type { PortfolioProject } from "@/lib/types";

export const fallbackProjects: PortfolioProject[] = [
  {
    _id: "demo-service-desk",
    title: "Service Desk API",
    slug: "service-desk-api",
    eyebrow: "Системный анализ · REST API",
    excerpt:
      "Демонстрационный шаблон кейса: от бизнес-задачи и модели данных до API-контракта и тестовых сценариев.",
    problem:
      "Обращения пользователей поступают по разным каналам, теряются и не имеют единой истории обработки. Руководителю сложно контролировать SLA и загрузку специалистов.",
    solution:
      "Спроектирована единая система регистрации и маршрутизации обращений с ролевой моделью, историей статусов, приоритетами и контролем SLA.",
    role:
      "Сбор и декомпозиция требований, моделирование процессов, проектирование данных и REST API, подготовка тестовых сценариев.",
    status: "published",
    featured: true,
    isDemo: true,
    skills: ["REST API", "OpenAPI", "BPMN", "SQL", "PostgreSQL", "Postman"],
    year: "2026",
    accent: "#6ee7b7",
    artifacts: [
      {
        _key: "architecture",
        type: "architecture",
        title: "Архитектура решения",
        description:
          "Клиентское приложение работает с сервисом через REST API. Сервис хранит обращения и историю изменений в PostgreSQL.",
        code: `flowchart LR
  U[Пользователь] --> W[Web-приложение]
  A[Специалист поддержки] --> W
  W -->|HTTPS / JSON| API[Service Desk API]
  API --> AUTH[Авторизация]
  API --> DB[(PostgreSQL)]
  API --> N[Сервис уведомлений]
  N --> E[Email / Telegram]`,
      },
      {
        _key: "process",
        type: "process",
        title: "Жизненный цикл обращения",
        description:
          "Статусная модель исключает некорректные переходы и позволяет восстановить полную историю обработки.",
        code: `stateDiagram-v2
  [*] --> New
  New --> Assigned: назначить
  Assigned --> InProgress: принять в работу
  InProgress --> Waiting: запросить информацию
  Waiting --> InProgress: получить ответ
  InProgress --> Resolved: предложить решение
  Resolved --> Closed: подтвердить
  Resolved --> InProgress: переоткрыть
  Closed --> [*]`,
      },
      {
        _key: "api",
        type: "api",
        title: "API-контракт",
        description:
          "Ключевые операции: создание обращения, назначение исполнителя, смена статуса и получение истории.",
        code: `POST /api/v1/tickets
Content-Type: application/json

{
  "subject": "Не проходит оплата",
  "description": "После подтверждения появляется ошибка",
  "priority": "high",
  "channel": "web"
}

201 Created
{
  "id": "TCK-1042",
  "status": "new",
  "createdAt": "2026-09-21T12:00:00Z"
}`,
      },
      {
        _key: "data",
        type: "data",
        title: "Модель данных",
        description:
          "История статусов отделена от обращения, чтобы обеспечить аудит и аналитику времени обработки.",
        code: `erDiagram
  USER ||--o{ TICKET : creates
  USER ||--o{ TICKET : handles
  TICKET ||--o{ STATUS_HISTORY : has
  TICKET ||--o{ COMMENT : contains
  USER ||--o{ COMMENT : writes

  TICKET {
    uuid id PK
    string subject
    string priority
    string status
    timestamp created_at
    timestamp resolved_at
  }`,
      },
      {
        _key: "testing",
        type: "testing",
        title: "Проверка решения",
        description:
          "Позитивные и негативные сценарии покрывают права доступа, обязательные поля, допустимые переходы статусов и SLA.",
      },
    ],
  },
  {
    _id: "demo-order-flow",
    title: "Order Flow",
    slug: "order-flow",
    eyebrow: "Бизнес-процесс · BPMN",
    excerpt:
      "Шаблон проекта по анализу процесса оформления заказа и интеграции платёжного сервиса.",
    problem:
      "Ошибки оплаты обрабатываются вручную, а клиент не понимает, был ли заказ создан и когда вернутся средства.",
    solution:
      "Описаны основной и альтернативные потоки, границы транзакций, идемпотентность и обработка событий платёжного провайдера.",
    role: "Моделирование процесса, описание интеграций и нефункциональных требований.",
    status: "published",
    featured: true,
    isDemo: true,
    skills: ["BPMN", "Integration", "Webhooks", "Sequence Diagram"],
    year: "2026",
    accent: "#93c5fd",
    artifacts: [
      {
        _key: "order-sequence",
        type: "architecture",
        title: "Сценарий оплаты",
        description:
          "Синхронное создание платежа и асинхронное подтверждение через webhook разделены.",
        code: `sequenceDiagram
  actor C as Клиент
  participant O as Order Service
  participant P as Payment Provider
  C->>O: Оформить заказ
  O->>P: Создать платёж
  P-->>O: paymentUrl
  O-->>C: Перенаправление
  P-->>O: Webhook: payment.succeeded
  O-->>C: Заказ подтверждён`,
      },
    ],
  },
];
