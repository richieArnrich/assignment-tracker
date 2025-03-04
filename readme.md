Assignment Tracking System

Overview

The Assignment Tracking System is a web application designed to help students submit their assignments by providing GitHub repository and deployment links. The system enables admins to review and manage submissions efficiently. It features a role-based authentication system with students and admins, utilizing cookies and OTP authentication for secure access.

Features

Student

Register and log in using email and OTP authentication.

Submit assignment details, including GitHub repository and deployment link.

View submitted assignments and their status.

Admin

Log in using cookie-based session management.

Access the admin dashboard to review and manage student submissions.

View student details along with their assignments.

Assignment
Submit assignments

View assignments

Tech Stack

Frontend: React.js, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB

Authentication: OTP-based login (for students), Cookie-based session management (for admin)

Deployment: TBD

Installation & Setup

Prerequisites

Ensure you have the following installed:

Node.js (v16+ recommended)

MongoDB (local or cloud-based)

Steps to Run Locally

Clone the Repository:

git clone https://github.com/richieArnrich/assignment-tracker.git
cd assignment-tracking-system

Install Dependencies:

npm install

Set Up Environment Variables:
Create a .env file in the root directory and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OTP_SERVICE_API_KEY=your_otp_service_key

Start the Backend Server:

npm run server

Start the Frontend:

npm run client

Open http://localhost:5173 in your browser.

Folder Structure

assignment-tracking-system/
│-- backend/ # Express.js server
│ ├── controllers/ # Route controllers
│ ├── models/ # Database schemas
│ ├── routes/ # API endpoints
│ ├── config/ # Configuration files
│-- frontend/ # Next.js React application
│ ├── components/ # UI Components
│ ├── pages/ # React.js pages
│ ├── styles/ # Tailwind CSS styles
│-- .env # Environment variables
│-- package.json # Project dependencies
│-- README.md # Project documentation

Future Enhancements

Email Notifications for assignment submission status.

File Upload Support for direct document submissions.

Automated Code Evaluation for programming assignments.

Contributors

Richie (Developer & Maintainer)
