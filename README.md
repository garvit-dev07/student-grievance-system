# Student Grievance Management System

A complete MERN stack project for a B.Tech 4th Semester AI Driven Full Stack Development exam. This web portal allows college students to register, login, submit grievances, view their grievances, search by title, update grievance details and delete grievances.

## Features

- Student registration and login
- Password hashing with bcrypt
- JWT-based authentication
- Protected grievance routes
- Add, view, search, update and delete grievances
- Owner-only update and delete authorization
- MongoDB Atlas database support
- Simple responsive React UI
- Render-ready backend and frontend setup
- Postman collection and sample test data included

## Technologies Used

- MongoDB Atlas
- Express.js
- React.js with Vite
- Node.js
- Mongoose
- JWT
- bcryptjs
- Axios
- React Router
- Plain CSS

## Folder Structure

```text
student-grievance-system/
  backend/
    config/
      db.js
    controllers/
      authController.js
      grievanceController.js
    middleware/
      authMiddleware.js
    models/
      Student.js
      Grievance.js
    routes/
      authRoutes.js
      grievanceRoutes.js
    .env.example
    package.json
    server.js
  frontend/
    src/
      components/
      pages/
      services/
      App.jsx
      main.jsx
      styles.css
    .env.example
    index.html
    package.json
    vite.config.js
  docs/
    api-test-requests.md
    postman_collection.json
    submission-document-outline.md
  sample-data/
    sample-data.json
  render.yaml
  README.md
```

## Local Setup

### 1. Open the project

```bash
cd student-grievance-system
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Create backend `.env`

Create `backend/.env` using `backend/.env.example`.

```env
PORT=5000
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/student_grievance_db
JWT_SECRET=my_exam_project_secret_12345
CLIENT_URL=http://localhost:5173
```

### 4. Run backend

```bash
npm run dev
```

Backend will run at:

```text
http://localhost:5000
```

### 5. Install frontend dependencies

Open a new terminal:

```bash
cd student-grievance-system/frontend
npm install
```

### 6. Create frontend `.env`

Create `frontend/.env` using `frontend/.env.example`.

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 7. Run frontend

```bash
npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

## Environment Variables

### Backend

| Variable | Description |
| --- | --- |
| `PORT` | Backend server port |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key used to sign JWT tokens |
| `CLIENT_URL` | Frontend URL allowed by CORS |

### Frontend

| Variable | Description |
| --- | --- |
| `VITE_API_BASE_URL` | Backend API URL ending with `/api` |

## API Endpoints

### Auth APIs

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/register` | Register student |
| POST | `/api/login` | Login student |

### Grievance APIs

All grievance routes require:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/grievances` | Add grievance |
| GET | `/api/grievances` | Get logged-in student's grievances |
| GET | `/api/grievances/:id` | Get one grievance |
| PUT | `/api/grievances/:id` | Update grievance |
| DELETE | `/api/grievances/:id` | Delete grievance |
| GET | `/api/grievances/search?title=marks` | Search grievances by title |

## Sample API Requests

### Register Student

```json
{
  "name": "Aarav Sharma",
  "email": "aarav@example.com",
  "password": "student123"
}
```

### Login Student

```json
{
  "email": "aarav@example.com",
  "password": "student123"
}
```

### Add Grievance

```json
{
  "title": "Internal marks not updated",
  "description": "My AI internal assessment marks are not visible on the student portal.",
  "category": "Academic",
  "status": "Pending"
}
```

More test requests are available in:

```text
docs/api-test-requests.md
docs/postman_collection.json
```

## Sample Test Data

Sample students and grievances are available in:

```text
sample-data/sample-data.json
```

Use the register and add grievance APIs to insert this data through the application or Postman.

## GitHub Push Steps

```bash
cd student-grievance-system
git init
git add .
git commit -m "Initial commit - Student Grievance Management System"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/student-grievance-system.git
git push -u origin main
```

## Render Deployment Steps

### Backend as Render Web Service

1. Push the project to GitHub.
2. Open Render and select New Web Service.
3. Connect your GitHub repository.
4. Set Root Directory to `backend`.
5. Set Build Command:

```bash
npm install
```

6. Set Start Command:

```bash
npm start
```

7. Add environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_long_secret_key
CLIENT_URL=https://your-frontend-url.onrender.com
```

8. Deploy and copy the backend URL.

### Frontend as Render Static Site

1. Open Render and select New Static Site.
2. Connect the same GitHub repository.
3. Set Root Directory to `frontend`.
4. Set Build Command:

```bash
npm install && npm run build
```

5. Set Publish Directory:

```text
dist
```

6. Add environment variable:

```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
```

7. Deploy the frontend.

8. Update backend `CLIENT_URL` with the frontend Render URL and redeploy backend if required.

## Live API Endpoint Examples

Replace the base URL with your deployed backend URL:

```text
POST https://your-backend-url.onrender.com/api/register
POST https://your-backend-url.onrender.com/api/login
POST https://your-backend-url.onrender.com/api/grievances
GET  https://your-backend-url.onrender.com/api/grievances
GET  https://your-backend-url.onrender.com/api/grievances/search?title=marks
```

## Exam Submission Checklist

- Project title page prepared
- Objective written
- Technology stack listed
- MongoDB schemas explained
- Backend code screenshots added
- Frontend code screenshots added
- Registration and login screenshots added
- Dashboard screenshots added
- Postman testing screenshots added
- MongoDB Atlas collection screenshots added
- Render deployment screenshots added
- Live frontend URL added
- Live backend API URL added
- GitHub repository link added
- Conclusion written

## Important Notes

- Do not commit real `.env` files to GitHub.
- Use a strong `JWT_SECRET` in production.
- In MongoDB Atlas, allow Render's connection by configuring Network Access. For exam demos, `0.0.0.0/0` is commonly used, but restrict it for real production projects.
- The frontend stores the JWT in `localStorage` for beginner-friendly exam implementation.
