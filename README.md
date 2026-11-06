# TaskManager – Full-Stack Web Application
 
A full-stack task management application designed to help users organize, track, and manage their daily tasks. Built with Vue.js, Node.js, Express, and MongoDB, the application features Google authentication, persistent data storage, and a Progressive Web App (PWA) architecture for web and mobile accessibility.
 
## Overview
 
TaskManager is a full-stack application that combines a responsive frontend with a RESTful backend API and a cloud-hosted database.
 
The project focuses on building a complete application architecture, implementing user authentication, managing database operations, and securing user-specific resources.
 
## Features
 
- **Google OAuth Authentication:** Secure user authentication through Google.
- **Task Management:** Create, view, complete, and delete tasks.
- **Task Organization:** Manage task statuses and due dates.
- **Persistent Storage:** Store task data using MongoDB Atlas.
- **User-Specific Access:** Ensure users can only access and modify their own tasks.
- **Progressive Web App:** Designed to support web and mobile access.
- **RESTful API:** Backend endpoints connect the frontend with database operations.
## Technologies Used
 
| Category | Technologies |
|---|---|
| Frontend | Vue.js 3, JavaScript |
| UI Framework | Vuetify |
| Backend | Node.js, Express.js |
| Database | MongoDB, MongoDB Atlas |
| Authentication | Google OAuth |
| API | REST |
| Development Tools | Git, GitHub, npm |
 
## Architecture
 
The application follows a client-server architecture:
 
1. **Frontend:** The Vue.js application provides the user interface and communicates with the backend through API requests.
2. **Backend:** The Express.js server handles authentication, API requests, application logic, and database operations.
3. **Database:** MongoDB Atlas stores task information and associates records with their respective users.
## Project Structure
 
```text
TaskManager-FullStack/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   └── ...
│
├── src/
│   ├── components/
│   ├── views/
│   └── ...
│
├── public/
├── package.json
└── README.md
```
 
*Note: The structure above is a simplified overview.*
 
## Running Locally
 
### Prerequisites
 
- Node.js and npm
- MongoDB Atlas account
- Google Cloud project with OAuth credentials
### 1. Clone the Repository
 
```bash
git clone https://github.com/USERNAME/REPOSITORY.git
cd REPOSITORY
```
 
### 2. Configure the Backend
 
Navigate to the backend directory:
 
```bash
cd backend
```
 
Install dependencies:
 
```bash
npm ci
```
 
Create a `.env` file based on the provided example:
 
```powershell
Copy-Item .env.example .env
```
 
Configure the following environment variables:
 
```env
PROTOCOL=http
PORT=1337
CORS_CLIENT_ORIGIN=http://localhost:8081
MONGODB_CONNECTION_STRING=your_mongodb_connection_string
SESSION_SECRET=your_random_session_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```
 
Configure your MongoDB Atlas connection string and Google OAuth credentials.
 
The Google OAuth callback URL for local development should be:
 
```text
http://localhost:1337/api/v1/auth/google/callback
```
 
Start the backend:
 
```bash
npm run server
```
 
The backend will run on port `1337`.
 
### 3. Configure the Frontend
 
Open a second terminal in the project's root directory.
 
Create a `.env` file containing:
 
```env
VUE_APP_API_ORIGIN=http://localhost:1337
```
 
Install dependencies:
 
```bash
npm ci
```
 
Start the frontend:
 
```bash
npm run serve
```
 
The frontend will be available at:
 
```text
http://localhost:8081
```
 
## Security Considerations
 
Security was considered throughout the development process, particularly regarding authentication and user-specific data.
 
- Google OAuth authentication for user identity verification.
- Server-side authorization for protected resources.
- User ownership validation to prevent unauthorized access to other users' tasks.
- Environment variables for sensitive configuration and credentials.
**Important:** Never commit `.env` files, database credentials, OAuth secrets, or session secrets to version control.
 
## Building for Production
 
To generate a production build of the frontend:
 
```bash
npm run build
```
 
The compiled application will be generated in the `dist/` directory.
 
## Future Improvements
 
Potential areas for future development include:
 
- Additional task filtering and organization options.
- Enhanced task scheduling and notifications.
- Further improvements to the mobile experience.
- Expanded application monitoring and deployment capabilities.
## Author
 
Developed as a full-stack software development project.
Diego Orozco (@DiegoRodc)
