# 🆘 Sajilo Sahayata – Real-Time Disaster Management & Coordination System

**Sajilo Sahayata** is a multilingual, real-time disaster management and citizen coordination platform designed to help citizens report emergencies, and enable government or response teams to manage, visualize, and act swiftly using location-based intelligence.

> Project submitted for the **bmcInnovateX Hackathon**  
> _Work in progress, we are using separate branch for code pushing as we are working in both frontend and backend , we will use main branch once we hace completed testing. 
> _Frontend & Backend are being developed in parallel on separate branches/directories_  

---

## Repository Structure
sajilo-sahayata-frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/               # Static assets (images, icons, etc.)
│   ├── components/           # Reusable UI components (buttons, cards, etc.)
│   ├── layouts/              # Page layouts (Navbar, Sidebar, Wrapper, etc.)
│   ├── pages/
│   │   ├── Admin/            # Admin-only views
│   │   │   └── Dashboard.jsx
│   │   ├── Auth/             # Login, Register, OTP, etc.
│   │   │   └── Login.jsx
│   │   ├── Dashboard/        # User dashboard pages
│   │   │   └── Alert.jsx
│   │   │   └── Home.jsx
│   │   │   └── MapPage.jsx
│   │   │   └── Profile.jsx
│   │   │   └── Reports.jsx
│   │   ├── Reports/          # Report submission and viewing
│   │   │   └── ReportForm.jsx
│   │   ├── Alerts/           # Alert UI and history
│   │   │   └── AlertsFeed.jsx
│   ├── routes/               # React Router config and guards
│   │   └── AppRoutes.jsx
│   ├── services/             # Firebase, API, Prisma client, etc.
│   │   ├── firebase.js
│   │   └── api.js
│   ├── stores/               # Global state management (optional: Zustand, Redux, etc.)
│   ├── utils/                # Helper functions and constants
│   ├── locales/              # languages
│   │   ├── en/
│   │   │   └── translation.json
│   │   ├── ne/
│   │   │   └── translation.json
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Vite entry file
│   └── index.css             # Tailwind and global styles
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md

## 🚀 Features

- **Multilingual UI** (English, Nepali)
- **OTP-based login** via phone number
- **Live map** with disaster reports (fire, flood, landslide, etc.)
- **Incident reporting** with real-time location, photo/video capture
- **Admin dashboard** for viewing, filtering, and managing reports
- **Notification system** (real-time alerting in progress)
- **Profile drawer** with user settings (theme, font, language)
- Modular and scalable frontend with Zustand-based state management

---
