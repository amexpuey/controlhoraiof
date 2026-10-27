# Project Architecture

- All iframe tools use `useIframeHeight`; keep height measurement and parent messaging centralized there so every embedded tool behaves consistently.
- Excel control workbooks use ExcelJS entirely in the browser and separate reference schedules from real-record conversion; this preserves privacy and prevents planned hours becoming clock-ins.
- Keep Excel validation in the pure recordLogic module and regression tests beside it; workbook generation and the wizard must use the same validation rules.