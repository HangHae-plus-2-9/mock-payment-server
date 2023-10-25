# Mock payment Server

## How to run

```bash
npm install
npm start
```

## APIs

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
