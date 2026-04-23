# Student Grievance Management System

## Title Page

- Project Title: Student Grievance Management System
- Subject: AI Driven Full Stack Development
- Course: B.Tech 4th Semester
- Student Name:
- Roll Number:
- Department:
- College Name:
- Submitted To:
- Date:

## Objective

To develop a MERN stack web application that allows college students to register, login, submit grievances, view submitted grievances, search by title, update grievance details and delete grievances securely.

## Technology Stack

- Frontend: React.js with Vite
- Backend: Node.js and Express.js
- Database: MongoDB Atlas
- Authentication: JWT
- Password Security: bcrypt
- Deployment: Render
- API Testing: Postman

## MongoDB Schema Explanation

### Student Schema

- name: stores student name
- email: stores unique student email
- password: stores hashed password

### Grievance Schema

- title: grievance title
- description: detailed complaint
- category: Academic, Hostel, Transport or Other
- date: date of grievance submission
- status: Pending or Resolved
- studentId: reference to the logged-in student

## Backend Code

Paste backend code screenshots or important snippets:

- server.js
- config/db.js
- models/Student.js
- models/Grievance.js
- controllers/authController.js
- controllers/grievanceController.js
- middleware/authMiddleware.js
- routes/authRoutes.js
- routes/grievanceRoutes.js

## Frontend Code

Paste frontend code screenshots or important snippets:

- src/App.jsx
- src/main.jsx
- src/services/api.js
- src/pages/Register.jsx
- src/pages/Login.jsx
- src/pages/Dashboard.jsx
- src/components
- src/styles.css

## Output Screenshots Placeholders

- Registration page screenshot
- Login page screenshot
- Dashboard page screenshot
- Submit grievance form screenshot
- Grievance list screenshot
- Search result screenshot
- Update grievance screenshot
- Delete confirmation screenshot

## Postman Screenshots Placeholders

- Register API screenshot
- Login API screenshot with JWT token
- Add grievance API screenshot
- Get all grievances API screenshot
- Update grievance API screenshot
- Delete grievance API screenshot
- Search grievance API screenshot

## MongoDB Storage Screenshots Placeholders

- MongoDB Atlas database screenshot
- students collection screenshot
- grievances collection screenshot

## Render Deployment Screenshot Placeholder

- Backend Render Web Service screenshot
- Frontend Render Static Site screenshot
- Environment variables screenshot

## Live URL And Endpoint Testing Section

- Frontend Live URL:
- Backend Live URL:
- Register endpoint:
- Login endpoint:
- Grievance endpoint:
- Search endpoint:

## Conclusion

The Student Grievance Management System successfully provides secure student authentication and complete grievance CRUD functionality. The project demonstrates MERN stack development, MongoDB Atlas integration, JWT authorization, API testing and Render deployment.
