# SpaceX Info Full-Stack Web Application

## Overview
SpaceX Info is a modern, recruiter-friendly full-stack web application that provides dynamic information about SpaceX launches and fleet. It features user authentication, a cloud-hosted database, and a responsive, visually appealing UI. The project is designed to showcase full-stack development skills, cloud integration, and best practices for employers.

## Features
- **Responsive Frontend:** Built with HTML, CSS, and JavaScript, styled for all screen sizes (from iPhone SE to ultrawide monitors).
- **Dynamic Launch Data:** Fetches and displays real-time SpaceX launch information using the SpaceX API.
- **Fleet Section:** Highlights SpaceX's fleet with rich details and images.
- **User Authentication:** Users can register and log in securely (passwords hashed with bcrypt, JWT for sessions).
- **Cloud Database:** User data is stored in MongoDB Atlas (hosted on AWS cloud).
- **Full-Stack Integration:** Frontend (GitHub Pages) communicates with a Node.js/Express backend (deployed on Render) via REST API.
- **Protected Routes:** Only authenticated users can access certain features (e.g., personalized navbar).
- **Modern UI:** Clean, recruiter-friendly design with modals, forms, and interactive elements.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (cloud, AWS)
- **Authentication:** bcryptjs (password hashing), jsonwebtoken (JWT)
- **API:** SpaceX REST API
- **Deployment:**
  - Frontend: GitHub Pages
  - Backend: Render.com (free cloud hosting)

## How It Works
1. **Frontend:**
   - Hosted on GitHub Pages for public access.
   - Responsive design adapts to all devices.
   - Users can view launches, fleet, and sign in/sign up via a modal.
2. **Backend:**
   - Node.js/Express server deployed on Render.
   - Handles API requests for authentication and launch data.
   - Connects to MongoDB Atlas for user data storage.
3. **Database:**
   - MongoDB Atlas cluster stores user accounts securely.
   - Passwords are hashed before storage.
4. **Authentication:**
   - Registration and login via modal forms.
   - JWT tokens are issued on login and stored in localStorage.
   - Navbar updates to show "Welcome, {username}" when logged in.

## Cloud & Full-Stack Skills Demonstrated
- Cloud database setup and integration (MongoDB Atlas on AWS)
- Public backend deployment (Render)
- Secure user authentication (bcrypt, JWT)
- RESTful API design and consumption
- Responsive, modern frontend
- Separation of concerns (frontend/backend/database)

## How to Run/Use
- Visit the [GitHub Pages site](YOUR_GITHUB_PAGES_URL) for the frontend.
- Backend is live at [Render](https://spacexinfo.onrender.com) (API only).
- Register or log in to demo authentication and cloud database features.

## For Employers
This project demonstrates:
- End-to-end full-stack development
- Cloud integration and deployment
- Secure authentication and user management
- Modern, responsive UI/UX
- Real-world API consumption

## Repository Structure
- `index.html` — Main frontend file
- `style.css`, `mediaqueries.css` — Styling and responsive design
- `main.js` — Frontend logic and API calls
- `server.js` — Node.js/Express backend
- `images/` — Fleet and UI images

## Credits
- SpaceX API for launch data
- MongoDB Atlas for cloud database
- Render.com for backend hosting

---
**Impress recruiters with a real, cloud-powered full-stack app!**
