1. PROJECT TITLE
#  Demo App

description:
A full-stack CRM application to manage leads and tasks with authentication.



 2. TECH STACK
##  Tech Stack

Frontend:
- React (Vite)
- Tailwind CSS

Backend:
- Node.js
- Express.js

Database:
- MongoDB

Other:
- Axios
- JWT Authentication
- Vercel (Frontend)
- Render (Backend)



---------------------------------------------------------------------------------


##  Frontend Architecture

The frontend is built using **React (Vite)** with a clean and modular structure for scalability and maintainability.

---
##  Frontend Structure


frontend/
│
├── src/
│ ├── api/ # API layer (Axios instances & endpoints)
│ │ ├── axiosInstance.js
│ │ ├── authApi.js
│ │ ├── leadsApi.js
│ │ └── taskApi.js
│ │
│ ├── pages/ # Application pages
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ ├── Dashboard.jsx
│ │ └── Home.jsx
│ │
│ ├── components/ # Reusable UI components
│ │ └── Navbar.jsx
│ │
│ ├── routes/protechtedRoute
│ ├── App.jsx # Main routing setup
│ └── main.jsx # Entry point
│
└── package.json



##  API Handling (Axios)

- Created a centralized **Axios instance** (`axiosInstance.js`)
- Configured with:
  - Base URL for backend API
  - Request interceptor → attaches JWT token automatically
  - Response interceptor → handles errors (like 401 unauthorized)

###  Interceptors Usage

- Automatically adds token in headers:

Authorization: Bearer <token>

- Handles session expiry:
- On 401 → clears token and redirects to login

---

##  API Layer Design

- Each feature has its own API file:
- `authApi.js`
- `leadsApi.js`
- `taskApi.js`

- Keeps API logic separate from UI  
- Improves code readability and maintainability  

---

##  Routing (React Router)

- Implemented client-side routing using React Router
- Pages include:



--------------------------------------------------------------------------------------------

##  Backend Architecture (Monolithic Structure) and ##  Backend Design Highlights

The backend follows a **monolithic architecture** with a clean and scalable folder structure.

###  Project Structure

backend/
│
├── server.js # Entry point
├── src/
│ ├── app.js # Express app setup
│ ├── config/
│ │ └── db.js # Database connection
│ │
│ ├── models/
│ │ ├── UserModel.js
│ │ ├── LeadModel.js
│ │ └── TaskModel.js
│ │
│ ├── controllers/
│ │ ├── authController.js
│ │ ├── leadController.js
│ │ └── taskController.js
│ │
│ ├── routes/
│ │ ├── authRoutes.js
│ │ ├── leadRoutes.js
│ │ └── taskRoutes.js
│ │
│ ├── middleware/
│ │ └── authMiddleware.js
│ │
│ ├── utils/
│ │ └── generateToken.js
│ │
│ 
│
└── package.json




##  Backend Design Highlights

-  **Monolithic Architecture**  
  All backend logic is organized in a single service but follows modular separation (controllers, routes, models).

-  **Authentication Middleware**  
  Custom middleware (`authMiddleware.js`) is used to protect private routes using JWT.

-  **Controller-Based Logic**  
  Each feature (Auth, Leads, Tasks) has its own controller for better separation of concerns.

-  **Modular Routing**  
  Routes are separated into different files and connected to controllers.

-  **MongoDB Models (Mongoose)**  
  Separate models for Users, Leads, and Tasks.

---

##  Error Handling & Code Quality

-  Used **try-catch blocks** in all backend APIs for proper error handling  
-  Prevents server crashes and ensures controlled responses  
-  Returns meaningful error messages to frontend  

---

##  Middleware Usage

-  Authentication middleware verifies JWT token
- Protects routes like:
  - Leads
  - Tasks
- Ensures only logged-in users can access protected data

---

##  Utility Functions

- `generateToken.js`  
  Used to generate JWT tokens during login and registration.

---

##  Future Improvements (Backend)

-  Centralized **Response Handler** (for success & error responses)
-  ## Global error handling middleware
-  Logging system (Winston / Morgan)
-  Unit & integration testing
-  Refresh token implementation
-  ## Async wrapper for better handling response

--------------------------------------------------------------------------------------------------

 3. FEATURES
##  Features

- User Registration & Login
- JWT Authentication
- Create / Edit / Delete Leads
- Create / Edit / Delete Tasks
- Protected Dashboard
- Loading states & UX improvements
- Responsive UI
-----------------------------------------------------------------------------


 4. LIVE LINKS
##  Live Demo

Frontend: https://demo-project-kf0aa6sc2-chegondi-yashwanths-projects.vercel.app/
Backend API: https://demoproject-vhvc.onrender.com/


----------------------------------------------------------------------


 6. INSTALLATION
##  Installation

### Clone repo
git clone : https://github.com/Yashwanth-57/DemoProject

### Frontend
cd DemoFrontend
npm install
npm run dev

### Backend
cd DemoBackend
npm install
npm run dev

------------------------------------------------------

7. ENV VARIABLES
##  Environment Variables

Backend (.env):

PORT=5000  
MONGO_URI=your_mongodb_url  
JWT_SECRET=your_secret_key  

Frontend (.env):

VITE_API_URL=https://your-backend-url

------------------------------------------------------------------

 8. API ENDPOINTS (IMP FOR ASSIGNMENT)
##  API Endpoints

Auth:
POST /api/auth/register  
POST /api/auth/login  

Leads:
GET /api/leads  
POST /api/leads  
PUT /api/leads/:id  
DELETE /api/leads/:id  

Tasks:
GET /api/tasks  
POST /api/tasks  
PUT /api/tasks/:id  
DELETE /api/tasks/:id  

---------------------------------------------------------

 9. IMPORTANT NOTES
##  Notes

- Uses JWT for authentication
- Protected routes implemented
- Vercel routing fix added (vercel.json)
- Handles loading states for better UX

----------------------------------------------------------------

 10. FUTURE IMPROVEMENTS
##  Future Improvements

- ## redux for user login information
- ##  redux saga for the crud opration of tasks and leads
- Add pagination
- Add search & filters
- Add role-based access
- Improve UI animations

--------------------------------------------------------------

 11. AUTHOR
##  Author

Yashwanth  Chegondi
portfolio: https://portfolio-fp17-pqhlqyjpx-chegondi-yashwanths-projects.vercel.app/

