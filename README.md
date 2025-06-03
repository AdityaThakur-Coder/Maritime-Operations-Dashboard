# Maritime Operations Dashboard

A full-stack web application built for monitoring and interacting with maritime data. Developed as part of a full-stack developer assessment. Includes secure user authentication, a responsive React dashboard, and a ship details search feature using mock marine data.

## 🔗 Live Demo

<!-- Add your deployed site link here -->
[Live Demo](https://maritime-dashboard.netlify.app/login)

---

## 📁 Project Structure

```
maritime-dashboard/
├── backend/                # Express.js backend
│   ├── routes/
│   │   ├── auth.js         # Signup and login routes
│   │   └── marine.js       # Marine ship data search
│   ├── models/
│   │   └── User.js         # Mongoose user model
│   ├── data/
│   │   └── marineData.json # Mock ship data
│   └── server.js           # Main Express server
├── frontend/               # React dashboard frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── ShipSearch.jsx
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   └── App.jsx
├── README.md
└── .env
```

---

## ✨ Features

### 🔒 Backend (Express + MongoDB)
- User Signup and Login
- Password hashing using **bcrypt**
- Session management with **JWT**
- MongoDB with Mongoose
- Ship details API using mock JSON data

### 📊 Frontend (React + Tailwind)
- Responsive dashboard layout
- Welcome message with logged-in user’s name
- Dummy charts/cards showing marine data
- Ship search form with live API results
- Tailwind CSS for styling

---

## 🚀 Getting Started

### Prerequisites

- Node.js & npm
- MongoDB (local or cloud)
- Create `.env` file in `/backend`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
```

---

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔍 API Endpoints

### Auth

| Method | Endpoint          | Description            |
|--------|-------------------|------------------------|
| POST   | /api/auth/signup  | Register a new user    |
| POST   | /api/auth/login   | Login with credentials |

### Marine Data

| Method | Endpoint           | Description               |
|--------|--------------------|---------------------------|
| GET    | /api/marine/:name  | Get ship details by name  |

---

## 🧪 Mock Ship Data Example

```json
[
  {
    "name": "Evergreen",
    "type": "Cargo",
    "flag": "Panama",
    "imo": "1234567"
  },
  {
    "name": "Ocean Spirit",
    "type": "Tanker",
    "flag": "Liberia",
    "imo": "7654321"
  }
]
```

---

## 📸 Screenshots

> Add screenshots of your dashboard here  
> Example: Login Page, Dashboard with marine cards, Search result

---

## 📦 Deployment

- Backend can be deployed on **Render / Railway / Heroku**
- Frontend can be deployed on **Vercel / Netlify**
- Connect both using CORS and proper base URLs

---

## 🛠️ Tools & Libraries

- React
- Express.js
- MongoDB & Mongoose
- JWT, bcrypt
- Tailwind CSS
- Axios

---

## 👨‍💻 Author

**Aditya Thakur**  
[GitHub](https://github.com/AdityaThakur-Coder) • [Portfolio](https://aditya-portfolio-ms.netlify.app/#home)

---

## 📸 Screenshots

### ✅ Login Page

![image](https://github.com/user-attachments/assets/02f94148-b1bb-4179-afa1-c8b669477f36)

### ✅ Dashboard View

![image](https://github.com/user-attachments/assets/55604fea-da41-4426-8f46-7b3f13a68625)

### ✅ Ship Search Result 

![image](https://github.com/user-attachments/assets/ecbdfde5-db11-41c9-891b-325f48f6b3bb)



