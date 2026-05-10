# ADR 001: Users Dashboard architecture

- Status: accepted
- Date: 2026-05-10

## English

### Context

The assignment asks to build a dashboard with a list of users. The exact UI, features, and stack are left to the implementer.

The project needed to stay small enough for a test assignment, but still show clear decisions around data loading, UI state, user interactions, export, and tests.

### Decision

The dashboard is built with Next.js, React, TypeScript, Tailwind CSS, and Zod.

The app uses a small feature-oriented structure:

- raw DummyJSON data is isolated behind a data boundary;
- UI components work with a safe normalized `User` model;
- search, filters, sorting, and pagination are stored in the URL query string;
- query processing and CSV generation are pure helpers;
- browser-only CSV download logic is isolated from CSV formatting;
- tests are split by layer: unit, component, and smoke.

### Why

This keeps the project easy to review without adding a heavy architecture layer.

The safe `User` model keeps raw API details out of the UI. URL query state makes the dashboard view shareable. Pure helpers make the main dashboard behavior easier to test. Smoke tests check only the main browser flows instead of duplicating all unit and component coverage.

### Consequences

The dashboard can be reviewed locally without deployment.

The feature structure is slightly more explicit than a single-page implementation, but it keeps the main responsibilities separated and easier to change.

---

## Русский

### Контекст

Задание требует построить дашборд со списком пользователей. Конкретный UI, возможности и стек остаются на усмотрение исполнителя.

Проект должен быть достаточно компактным для тестового задания, но при этом показать понятные решения по загрузке данных, состоянию интерфейса, действиям пользователя, экспорту и тестам.

### Решение

Дашборд реализован на Next.js, React, TypeScript, Tailwind CSS и Zod.

Проект разделён на небольшие feature-модули:

- raw-данные DummyJSON изолированы за data boundary;
- UI-компоненты работают с безопасной нормализованной моделью `User`;
- поиск, фильтры, сортировка и пагинация хранятся в URL query string;
- обработка query-параметров и CSV-генерация вынесены в чистые helper-функции;
- browser-only логика скачивания CSV отделена от форматирования CSV;
- тесты разделены по слоям: unit, component и smoke.

### Почему

Так проект остаётся удобным для ревью без тяжёлой архитектурной обвязки.

Безопасная модель `User` не даёт raw-деталям API попадать в UI. URL query state позволяет воспроизвести текущий вид дашборда по ссылке. Чистые helper-функции проще тестировать. Smoke-тесты проверяют только основные browser-сценарии и не дублируют unit/component coverage.

### Последствия

Дашборд можно проверить локально без деплоя.

Структура проекта чуть подробнее, чем в одном большом page-компоненте, но основные ответственности разделены и их проще менять.
