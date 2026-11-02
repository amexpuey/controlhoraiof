# Project Architecture

- All iframe tools use `useIframeHeight`; keep height measurement and parent messaging centralized there so every embedded tool behaves consistently.
- Excel control workbooks use ExcelJS entirely in the browser and separate reference schedules from real-record conversion; this preserves privacy and prevents planned hours becoming clock-ins.
- Keep Excel validation in the pure recordLogic module and regression tests beside it; workbook generation and the wizard must use the same validation rules.
- Public routes are children of `PublicLayout`, which shows the INWOUT editor disclosure; embedded tools and admin are excluded there so iframes stay clean.
- INWOUT is identified by slug via `isOwnProduct` (never `is_promoted`/`title`), so the "Nuestro producto" label and comparisons read only real data.
