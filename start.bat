@echo off

REM Start backend
cd backend
npm install
start npm start

REM Build frontend
cd ..\frontend\blockchain
npm install
npm run build
