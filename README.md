# 🧠 EVAL — A Retro-Inspired Quiz App

**EVAL** is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to help students practice more effectively with a shared question inventory, smart test generation system, mistake tracking, control over repeated questions and a nostalgic retro interface. 

---

## 🚀 Features

- 🎮 **Retro Matrix UI**: Unique pixel-inspired design with console-style visuals
- 🧠 **Smart Test Generation**: Skip repeated questions unless needed
- ❌ **Mistake Tracking**: View and retry questions you've previously gotten wrong
- 🧼 **Clear History**: Remove question history and reset practice
- ✅ **Answer Highlighting**: Shows correct answers after submission
- 🔐 **Authentication**: Secure login/signup with JWT
- 🌐 **Responsive**: Works smoothly on both desktop and mobile

---

## 💡 Potential Improvements

- 🖼️ **Image Support** — Add the ability to attach images to questions.
- 👤 **User Profiles** — Personalized dashboards, avatars, and activity stats.
- 📈 **Reports & Trends** — Visualize learning progress over time.
- 🧮 **Score Tracking** — Track scores per subject or difficulty level.
- 💡 **Hints System** — Offer subtle hints before submitting answers.
- 🏆 **Leaderboards & Awards** — Competitive rankings and achievement badges.
- ⚔️ **Duels & Wars** — Real-time 1v1 quiz challenges or team-based battles.

---

## 🧩 Tech Stack

| Frontend       | Backend         | Database   | Other     |
|----------------|-----------------|------------|-----------|
| React (Vite)   | Node.js         | MongoDB    | Redux     |
| Redux Toolkit  | Express.js      | Mongoose   | SCSS      |
| React Router   | JWT Auth        |            | Vite      |

---

## 📂 Project Structure

```bash
EVAL/
├── client/             # Frontend (React + Vite)
│   ├── components/     # Reusable UI components
│   ├── features/       # Redux slices and logic
│   ├── pages/          # Route-based views (Dashboard, TestPage, etc.)
│   └── styles/         # SCSS modules & animations
├── server/             # Backend (Node + Express)
│   ├── controllers/    # Route logic
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   └── middleware/     # Auth, error handlers
└── README.md
```

---


## 📸 Screenshots

<p align="center">
  <img src="client/public/screenshots/Register.png" width="31%" />
  <img src="client/public/screenshots/Test_Params.png" width="31%" />
  <img src="client/public/screenshots/Posting_Question.png" width="31%" />
</p>

<p align="center">
  <img src="client/public/screenshots/Dashboard.png" width="48%" />
  <img src="client/public/screenshots/Test.png" width="48%" />
</p>

---

## 🧪 Local Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/eval-app.git
```

2. Install client and server dependencies:

```bash
cd client && npm install
cd ../server && npm install
```

3. Configure environment variables in /server/.env:

```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
```

4. Run the app:

```bash
# In client/
npm start

# In server/
npm run dev
```

## 👾 Author
Made with love (and pixel art) by **Mohamed Khedrawy**
# <p align=center>💻 Frontend | 🧠 Backend | 🎨 Design </p>
