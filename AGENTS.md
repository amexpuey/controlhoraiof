# Project Architecture

- All iframe tools use `useIframeHeight`; keep height measurement and parent messaging centralized there so every embedded tool behaves consistently.