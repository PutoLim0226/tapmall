#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

echo "====================================="
echo " Starting Tapmall Deployment Process "
echo "====================================="

echo "1. Pulling latest code from git..."
git pull

echo "2. Installing dependencies..."
yarn install

echo "3. Updating Database Schema..."
cd packages/api
npx prisma db push
npx prisma generate
cd ../..

echo "4. Building Project..."
yarn build

echo "5. Restarting Backend API via PM2..."
pm2 restart tapmall-api

echo "====================================="
echo " Deployment Completed Successfully!  "
echo "====================================="
