# Gym Management System

![Gym Logo](public/img/gym-logo.png)

## Overview

**Gym Management System** is a modern, full-stack web application designed to streamline gym operations, including membership management, billing, notifications, and more. Built with React, Firebase, and Node.js, it offers a seamless experience for both gym administrators and members, with real-time updates, secure authentication, and a beautiful, responsive UI.

---

## ✨ Features

- **User Authentication**: Secure signup/login for members and admins (role-based access)
- **Admin Dashboard**:
  - Manage members (add, edit, delete, search)
  - Create and assign bills
  - Automated and manual notifications (email reminders)
  - View all members and their payment status
- **Member Dashboard**:
  - View personal bills and payment history
  - Receive notifications about dues and events
- **User Dashboard**:
  - Search for members by name or email
- **Digital Receipts**: All payment records are stored and accessible online
- **Automated Email Notifications**: Membership expiry reminders via SendGrid
- **Responsive Design**: Mobile-friendly, modern UI with image slider and branding
- **Real-time Database**: All data is synced instantly using Firebase Firestore
- **Role Management**: Admin and user roles with different permissions
- **Secure Logout**: With confirmation dialog
- **Error Handling & Validation**: User-friendly error messages and form validation
- **Testing**: React Testing Library setup for frontend tests

---

## 🛠️ Technologies Used

- **Frontend**: React, React Router, Material-UI, Bootstrap, React Bootstrap, React Modal
- **Backend**: Node.js, Express.js, SendGrid (for email notifications)
- **Database & Auth**: Firebase (Firestore, Authentication)
- **Styling**: CSS, Responsive Design
- **Testing**: Jest, React Testing Library

---

## 📁 Project Structure

```
Gym_Management_Project/
├── backend/                # Express server for notifications
│   ├── server.js
│   ├── package.json
├── public/
│   └── img/                # Logos and gym images
├── src/
│   ├── components/
│   │   ├── admin/          # Admin dashboard & features
│   │   ├── auth/           # Login, signup, context
│   │   ├── member/         # Member dashboard
│   │   ├── pages/          # Landing, NavBar, ImageSlider
│   │   ├── user/           # User dashboard
│   │   ├── services/       # Firestore and auth logic
│   │   ├── firebaseConfig.js
│   │   ├── App.js
│   │   └── ...
├── package.json            # Frontend dependencies
├── README.md
└── ...
```

---

## 🚀 Getting Started

### 1. **Clone the Repository**
```bash
git clone https://github.com/Sagarpatil8421/Gym_Management_Project.git
cd Gym_Management_Project
```

### 2. **Install Frontend Dependencies**
```bash
npm install
```

### 3. **Install Backend Dependencies**
```bash
cd backend
npm install
cd ..
```

### 4. **Firebase Setup**
- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
- Enable **Authentication** (Email/Password)
- Create **Firestore** database
- Add a web app and get your config
- Create a `.env` file in the root with:

```
REACT_APP_API_KEY=your_firebase_api_key
REACT_APP_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_PROJECT_ID=your_firebase_project_id
REACT_APP_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_APP_ID=your_firebase_app_id
REACT_APP_MEASUREMENT_ID=your_firebase_measurement_id
```

### 5. **SendGrid Setup (for Email Notifications)**
- Create a [SendGrid](https://sendgrid.com/) account
- Get your API key
- In `backend/.env` add:
```
SENDGRID_API_KEY=your_sendgrid_api_key
```

### 6. **Run the Backend Server**
```bash
cd backend
node server.js
```

### 7. **Run the Frontend**
```bash
npm start
```

---

## 🌐 Main Routes

- `/` — Landing Page
- `/login` — Login
- `/signup` — Signup
- `/admin` — Admin Dashboard (admin only)
- `/member` — Member Dashboard (admin only)

---

## 🔒 Environment Variables

- **Frontend**: `.env` in root (Firebase keys)
- **Backend**: `backend/.env` (SendGrid key)

---

## 🧩 Firestore Collections

- `users`: `{ email, role, createdAt }`
- `members`: `{ name, email, phone, address }`
- `bills`: `{ memberId, amount, dueDate, paymentDate, createdAt }`
- `notifications`: `{ memberId, ... }`

---

## 📦 Scripts

- `npm start` — Start React frontend
- `npm run build` — Build frontend
- `npm test` — Run frontend tests
- `node backend/server.js` — Start backend server

---

## 🖼️ Branding & UI

- Custom logo: `public/img/gym-logo.png`
- Image slider: `public/img/img1.jpg` ... `img14.jpg`
- Responsive, modern design with Material-UI and Bootstrap

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 📬 Contact

- **Email**: support@gymmanage.com
- **Phone**: +123 456 7890
- **Author**: Sagar Patil

---

## ⭐ Acknowledgements

- [Firebase](https://firebase.google.com/)
- [SendGrid](https://sendgrid.com/)
- [React](https://react.dev/)
- [Material-UI](https://mui.com/)
- [Bootstrap](https://getbootstrap.com/)

---

> _Empowering gyms to manage memberships, payments, and notifications with ease and style!_
