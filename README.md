# LMS Auth API

A Learning Management System (LMS) Authentication API built with Node.js and Express.

## Features
- User Signup
- User Sign-In
- Get User Info
- User Logout

## Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/uttam1910/lms-auth-api.git
   cd lms-auth-api

2. Install dependencies:
   ```bash
   npm install
   
3. Create a .env file in the root of the project and add your environment variables:
   ```bash
   MONGO_URI=mongodb://localhost:27017/mydb
   PORT=3000
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
4. Start the server:
   ```bash
   node index.js

## Endpoints
POST /auth/signup
POST /auth/signin
GET /auth/user
POST /auth/logout
GET /


