#!/bin/bash

# Navigate to the main project directory
cd "$(dirname "$0")"

nvm use 16
# Fetch updates from GitHub
git fetch origin
git reset --hard origin/main

# Navigate to the frontend directory
cd frontend  

# Install frontend dependencies
npm install

# Build the Angular app in production mode
ng build --configuration production

# Navigate to the backend directory
cd ../backend

# Install backend dependencies
npm install

nvm use 10
# Restart the backend application using PM2
pm2 restart itpliveportal
