# Paper Trading Platform

A stock trading practice app that uses virtual money only. Users can sign up, buy and sell simulated stocks, and track their portfolio and order history. No real money, brokerage accounts, or live market prices are involved.

Built for the Cloud Architecture and Design DA2 assignment at VIT Chennai.

Live site: https://prithamsamy.github.io/paper-trading-platform/

---

## Project Status

The frontend is deployed and the backend was built and tested end to end on AWS.

After the project presentation, the AWS backend is taken offline so that no ongoing cloud charges are incurred. Because of this, the live site will load, but login and trading will not work until a backend is connected again.

The project is ready to plug in. All backend code and the deployment template are included in this repository, and reconnecting takes only a redeploy and two small configuration changes. See [Reconnecting the Backend](#reconnecting-the-backend).

---

## What It Does

- Register and log in with an email and password
- View a list of five simulated stocks and their prices
- Start with a virtual balance of Rs. 100,000
- Buy and sell shares using that balance
- View current holdings with invested amount, current value, and profit or loss
- View the latest 50 orders, newest first

Stock prices are fixed values stored in the database. They do not change on their own.

---

## How It Works

1. The user logs in through Amazon Cognito, which handles accounts and passwords.
2. The website receives an access token and sends it with every request to the backend.
3. Amazon API Gateway checks the token before the request goes any further.
4. An AWS Lambda function runs the trading logic.
5. Amazon DynamoDB stores the stocks, balances, holdings, and orders.

A buy or sell changes three things at once: the balance, the holding, and the order record. These are saved together in one database transaction, so either all of them happen or none of them do. Each request is also protected against being applied twice if it is retried.

Every request is tied to the logged-in user's unique ID, so one user cannot see or change another user's data.

---

## Built With

| Part | Technology |
| :-- | :-- |
| Website | React, Vite, React Router |
| Website hosting | GitHub Pages |
| Automatic deployment | GitHub Actions |
| Login and accounts | Amazon Cognito |
| API | Amazon API Gateway (HTTP API) |
| Backend code | AWS Lambda, Node.js |
| Backend deployment | AWS SAM |
| Database | Amazon DynamoDB |
| Logs | Amazon CloudWatch |

AWS region: Asia Pacific (Mumbai), `ap-south-1`.

---

## Project Structure

```
paper-trading-platform/
├── backend/
│   ├── src/
│   │   ├── routes/          One file per API route
│   │   └── utils/           Shared helpers
│   ├── package.json
│   └── template.yaml        AWS SAM deployment template
├── docs/
│   ├── architecture/
│   └── screenshots/
├── frontend/
│   ├── src/
│   │   ├── api/             Backend request helper
│   │   ├── auth/            Cognito login logic
│   │   ├── components/      Navigation bar
│   │   ├── pages/           Login, Register, Dashboard, Stocks,
│   │   │                    Buy / Sell, Portfolio, Orders
│   │   ├── config.js        Cognito settings
│   │   └── main.jsx
│   ├── index.html
│   └── vite.config.js
└── .github/
    └── workflows/
        └── deploy.yml       Builds and publishes the website
```

---

## API Routes

All routes except `/health` require a valid login token.

| Method | Route | Purpose |
| :-- | :-- | :-- |
| GET | `/health` | Check that the API is running |
| GET | `/me` | Return the logged-in user's ID |
| GET | `/stocks` | List all stocks and prices |
| GET | `/wallet` | Return the user's cash balance |
| POST | `/buy` | Buy shares of a stock |
| POST | `/sell` | Sell shares of a stock |
| GET | `/portfolio` | Return the user's holdings |
| GET | `/orders` | Return the user's latest 50 orders |

---

## Database Tables

| Table | What it stores |
| :-- | :-- |
| `Stocks` | Stock symbol, name, and price |
| `Wallets` | Each user's virtual cash balance |
| `Portfolios` | Each user's holdings: symbol, quantity, average buy price |
| `Orders` | Completed buy and sell orders |
| `Transactions` | Internal record of each completed trade |

Simulated stocks: TCS, INFY, RELIANCE, HDFCBANK, SBIN.

---

## Trading Rules

- A buy is rejected if the balance is too low.
- A sell is rejected if the user does not own enough shares.
- Selling part of a holding keeps the original average buy price.
- Selling a whole holding removes it from the portfolio.
- Quantities must be positive whole numbers.

---

## Running the Website Locally

Requirements: Node.js 20.19 or newer, and Git.

```bash
git clone https://github.com/PrithamSamy/paper-trading-platform.git
cd paper-trading-platform/frontend
npm install
npm run dev
```

Open the address shown in the terminal. Because the site is hosted under a sub-path, it is served at `http://localhost:5173/paper-trading-platform/`.

Without a connected backend, the pages will load but login and data requests will fail.

---

## Reconnecting the Backend

Requirements: an AWS account, the AWS CLI, and the AWS SAM CLI.

1. Create a Cognito user pool and an app client in `ap-south-1`.
2. Create the five DynamoDB tables with these keys:

   | Table | Partition key | Sort key |
   | :-- | :-- | :-- |
   | `Stocks` | `symbol` | none |
   | `Wallets` | `userId` | none |
   | `Portfolios` | `userId` | `symbol` |
   | `Orders` | `orderId` | none |
   | `Transactions` | `transactionId` | none |

   `Orders` and `Transactions` also need a secondary index on `userId` and the creation time, so the latest orders can be listed quickly. The exact definitions are in `backend/template.yaml` and the route files.

3. Add the five stocks to the `Stocks` table with numeric prices.
4. Deploy the backend:

   ```bash
   cd backend
   npm install
   sam build
   sam deploy --guided
   ```

5. Update the frontend settings:
   - In `frontend/src/config.js`, set `userPoolId` and `clientId`.
   - In `frontend/src/api/client.js`, set the API address to the one printed after deployment.
6. Push to the `main` branch. GitHub Actions rebuilds and republishes the website.

The Cognito pool ID and app client ID are public identifiers, not secrets. Never commit AWS access keys.

---

## Taking the Backend Offline

To stop all AWS usage and avoid charges:

```bash
cd backend
sam delete --stack-name paper-trading-backend --region ap-south-1
```

Then delete the DynamoDB tables, the S3 demo bucket, and the Cognito user pool from the AWS Console if they were created separately, and turn off point-in-time recovery on any table you keep.

---

## Limitations

- Prices are simulated and fixed. They are not live market data.
- There is no real payment, brokerage, or market connection.
- The project is a learning exercise and is not meant for real financial use.

## Possible Next Steps

- Live or regularly updated prices
- Price history
- Realized profit and loss
- Automated tests
- Request rate limiting
- A full transaction history page

---

## Author

Pritham Samy
