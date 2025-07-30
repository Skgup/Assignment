# HighwayAssignment
 Notes App – OTP Authentication with Dashboard
📌 Overview
This is a full-stack Notes App where users can sign up, log in, and manage notes. The application uses OTP-based authentication (via email) and JWT for session management. Users can create, view, and delete notes securely.

🚀 Features
✅ OTP-based user authentication (via email)

✅ JWT-protected API endpoints

✅ Secure OTP with expiration

✅ User Dashboard to manage notes

✅ CRUD operations on notes

✅ Tailwind CSS for modern UI

✅ Responsive design (mobile + desktop)

✅ Deployable to Vercel (frontend) & Render/Heroku (backend)

🛠 Tech Stack
Frontend
React (TypeScript)

Tailwind CSS

Axios (for API calls)

React Router DOM

Backend
Node.js + Express.js

MongoDB + Mongoose

JWT (for authentication)

Nodemailer / SendGrid (for email OTP)

dotenv (for environment variables)


📂 Project Structure

/frontend
  ├── src/
  │    ├── pages/ (Signup, Login, Dashboard)
  │    ├── components/ (NoteCard, Loader)
  │    ├── services/api.ts
  │    └── App.tsx
/backend
  ├── models/ (User.ts, Note.ts)
  ├── controllers/ (authController.ts, noteController.ts)
  ├── routes/ (authRoutes.ts, noteRoutes.ts)
  ├── middlewares/authMiddleware.ts
  ├── utils/ (generateJWT.ts, sendEmail.ts)
  └── server.ts


Run backend: npm start

Run frontend:npm start



Authentication
Method	Endpoint	Description
POST	/api/auth/send-otp	Sends OTP to user email
POST	/api/auth/verify-otp	Verifies OTP & returns JWT

Notes
Method	Endpoint	Description
GET	/api/notes	Fetch all notes (protected)
POST	/api/notes	Create new note (protected)
DELETE	/api/notes/:id	Delete a note (protected)



##Create a .env file in the backend directory:
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password   # Or use SENDGRID_API_KEY if using SendGrid








