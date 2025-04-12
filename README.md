🧠 Project Description
SynthHack2025 is a smart healthcare assistant that delivers personalized treatment suggestions through an interactive chatbot. It supports voice input/output, generates PDF health reports, shows live medical news, and helps users locate nearby hospitals/clinics using real-time data. Built with React, TypeScript, and Express, the app combines modern frontend design with a robust backend and AI integration using the Gemini API.

🚀 How to Run the Project
📦 1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/SynthHack2025myidea.git
cd SynthHack2025myidea
💻 2. Start the Frontend
bash
Copy
Edit
cd client
npm install
npm run dev
This runs the Vite React frontend at http://localhost:5173 by default.

🧪 3. Start the Backend
bash
Copy
Edit
cd server
npm install
node index.js
Make sure MongoDB is running locally, or set your connection string in .env.

Let me know if you’re using PM2, Docker, or MongoDB Atlas, and I can tweak this further!

🛠️ Tech Stack
🌐 Frontend
Vite – Fast build tool for frontend development

React.js + TypeScript – Component-based UI with strong typing

Tailwind CSS – Utility-first CSS framework for responsive design

Framer Motion – Smooth animations and transitions

Web Speech API – Voice input and output functionality

jsPDF – PDF generation for patient reports

React Router DOM – Page routing and navigation

🌍 Backend
Node.js + Express.js – REST API development

MongoDB – NoSQL database for storing patient health data

JWT (JSON Web Token) – Authentication and session management

Mongoose – MongoDB object modeling for Node.js

dotenv – Environment variable configuration

CORS & Body-parser – Middleware for secure and smooth API handling

🔗 APIs & External Services
Gemini API – AI model for personalized treatment suggestions

NewsAPI – Real-time health news updates

Google Maps API / OpenStreetMap Nominatim – Location-based hospital/clinic search

Web Speech API – Voice recognition and speech synthesis in-browser

