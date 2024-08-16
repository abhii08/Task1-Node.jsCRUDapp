# Node.js CRUD Application

This project is a simple CRUD (Create, Read, Update, Delete) application built with Node.js and Express.js. It interacts with the FreshSales CRM API to manage contacts, and also includes a local MySQL database as an alternative backend.

## Features

- Create, retrieve, update, and delete contacts using the FreshSales CRM API.

## Prerequisites

- Node.js
- MySQL (for local database usage)
- FreshSales CRM API key

## Setup

1. Install dependencies:
    npm install

3. Create a `.env` file to store environment variables:
    touch .env
   Add your MySQL credentials and FreshSales API key:
   
    MYSQL_HOST=localhost
    MYSQL_USER=root
    MYSQL_PASSWORD=yourpassword
    MYSQL_DATABASE=contacts
    FRESHSALES_API_KEY=your_freshsales_api_key

5. Create the MySQL database:
    node createDB.js

6. Start the application:
    node server.js

