# Cloud-Native Paper Trading Platform

A university Cloud Architecture and Design project demonstrating a paper-trading platform on AWS. The application is for simulation and education only: it uses virtual money and does not execute real trades, handle real payments, or connect to brokerage accounts.

## Project purpose

This project explores how a small web application can use managed cloud services for its frontend, authentication, API, database, storage, monitoring, and backup design. It uses fixed simulated prices for five stocks: TCS, INFY, RELIANCE, HDFCBANK, and SBIN.

## Architecture

The frontend is a React application built with Vite and hosted on GitHub Pages. Amazon Cognito provides user sign-up and sign-in. An Amazon API Gateway HTTP API fronts an AWS Lambda function. The API has a public health-check route and a Cognito JWT-protected user-information route.

Amazon DynamoDB tables are configured for stock, wallet, portfolio, order, and transaction data. Point-in-time recovery (PITR) is enabled on the tables. Amazon S3 is intended for private report or export storage. Amazon CloudWatch collects Lambda logs, and AWS CloudTrail Event history can be used to inspect recent account management activity.

## Current implementation status

- React + Vite frontend hosted on GitHub Pages.
- Cognito registration, email confirmation, login, and logout are implemented in the frontend.
- API Gateway HTTP API and Lambda backend are deployed.
- `GET /health` returns the API health status.
- `GET /me` requires a valid Cognito access token.
- DynamoDB tables are configured, and the `Stocks` table is intended to hold fixed simulated prices.
- DynamoDB PITR is enabled on the tables.
- Lambda invocation logs are visible in CloudWatch.
- The frontend currently displays mock dashboard, stock, portfolio, and transaction data.
- The Lambda currently does not read from or write to DynamoDB or S3.
- BUY/SELL operations, wallet changes, persistent portfolio updates, and transaction/order creation are not implemented in the current deployment.

## Demonstrated API

| Method | Route | Authentication | Purpose |
|---|---|---|---|
| `GET` | `/health` | Public | Returns service health information. |
| `GET` | `/me` | Cognito JWT | Returns the authenticated user's identifier and token claims. |

## Technology

- React and Vite
- GitHub Pages
- Amazon Cognito User Pools
- Amazon API Gateway HTTP API
- AWS Lambda, Node.js 24
- Amazon DynamoDB
- Amazon S3
- Amazon CloudWatch
- AWS CloudTrail
- AWS SAM and CloudFormation

## Connecting AWS resources

The AWS resources were deployed for the course demonstration. The GitHub Pages frontend is a static site and can be used independently, but backend-connected features require the AWS resources to be available and the frontend/API configuration to be set correctly.

After the presentation, AWS resources may be disabled or deleted to limit ongoing usage and charges. AWS Free Tier eligibility and included limits vary by account and service. DynamoDB PITR, requests, storage, and other usage can incur charges, so check the AWS Billing and Cost Management console before and after using the resources.

If the AWS resources are removed, the hosted frontend remains available, but Cognito login and API requests will no longer work until the required AWS resources are restored and configured again.

## Security notes

- The application is a simulation, not a real trading service.
- No AWS access keys or secret keys belong in the frontend or Git repository.
- The S3 bucket should remain private with Block Public Access enabled.
- API routes that access user data must validate Cognito JWTs.
- The current API implementation does not yet perform trading or database operations.

## Local frontend development

From the `frontend` directory:

```powershell
npm install
npm run dev
```

Build the frontend:

```powershell
npm run build
```

## Backend deployment

The backend is defined in `backend/template.yaml` and can be built and deployed using AWS SAM. Deployment requires AWS CLI/SAM CLI setup, valid AWS credentials, the Cognito User Pool ID, the app client ID, and the correct frontend origin.

```powershell
cd backend
sam build
sam deploy
```

Do not commit AWS credentials, secret keys, access tokens, or other private authentication material.

## Project limitation

This repository documents a cloud-native paper-trading architecture and an initial deployed prototype. It does not currently implement a persistent end-to-end trading workflow. BUY/SELL, wallet, portfolio, order, and transaction operations are future implementation work.
