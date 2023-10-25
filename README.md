# Mock payment Server

## Description

This is a mock payment server for testing.
Use 8000 port for default.

## How to run

```bash
npm install
npm run start:dev
```

## APIs

- base url: http://localhost:8000

- GET /status  
  - get server status
  - return 200 if server is running
  - return 500 if server is not running
- POST /payment
  - create a payment
  - return 200 if payment is created
  - return 500 if payment is not created
- POST /down
  - make server down
- POST /up
  - make server up
