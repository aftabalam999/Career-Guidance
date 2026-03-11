# CareerPath AI - Career Guidance Platform

A full-stack AI-powered Career Guidance Platform built with the MERN stack and Google Gemini AI.

## 🚀 Features

- **AI Recommendations**: Personalized college suggestions based on 10th/12th marks, interests, and budget.
- **Admin Dashboard**: Comprehensive management of colleges, users, scholarships, and analytics.
- **Aptitude Test**: Real-time evaluation of student potential with sectional scoring.
- **Notification Center**: Real-time alerts for new college additions and system updates.
- **Maintenance Mode**: Global platform toggle for scheduled updates.

## 🛠 Tech Stack

- **Frontend**: React, Vite, TailwindCSS (for custom utilities), Lucide React.
- **Backend**: Node.js, Express, MongoDB, Mongoose.
- **AI**: Google Gemini AI (Gemini 2.0 Flash).
- **Security**: Helmet, Rate Limiting, JWT Authentication, Bcrypt Hashing.

## 📦 Production Deployment

### 1. Build Frontend
```bash
cd frontend
npm install
npm run build
```

### 2. Configure Backend
Copy `.env.example` to `.env` in the `backend` folder and fill in your credentials:
```bash
cp backend/.env.example backend/.env
```

### 3. Run Platform
The backend is configured to serve the frontend static files in production.
```bash
cd backend
npm install
npm start
```

## 🔒 Security Measures

- **Rate Limiting**: Prevents brute-force attacks on API endpoints.
- **Secure Headers**: Using Helmet to protect against common web vulnerabilities.
- **Encrypted Storage**: All passwords are hashed using Bcrypt.
- **CORS Protection**: Restricted origins for production environments.

## 📋 Environment Variables

| Variable | Description |
| :--- | :--- |
| `PORT` | API Port (default: 5000) |
| `NODE_ENV` | Environment (development/production) |
| `MONGO_URI` | MongoDB Connection String |
| `JWT_SECRET` | Secret key for token signing |
| `GEMINI_API_KEY` | API key from Google AI Studio |
| `FRONTEND_URL` | Your production frontend URL for CORS |
