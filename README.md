# SkillScan - GitHub Profile Analyzer Platform

## Introduction 

SkillScan is a web-based recruiting tool designed to help recruiters assess developers efficiently. By analyzing a candidate's GitHub activity, It generates a score and provides a match percentage for a selected position, streamlining the hiring process.
This allows recruiters to make data-driven hiring decisions quickly, reducing manual evaluation and bias.

---

## Project Type

Fullstack (MERN Stack)

---

## 🚀 Deployed App

  **Frontend:**  [SkillScan - Try it now](https://skillscan01.netlify.app) <br>
  **Backend:**   Backend services are provided by **Firebase** <br>
  **Database:**  The application uses **Firebase Firestore** 
  
---

## 🏗️ Directory Structure

```

SkillScan/
├── src/
│   ├── components/
│   ├── contexts/
│   ├── data/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── types.ts
│   └── vite-env.d.ts
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.ts
```

---

## 🎥 Video Walkthrough of the project
Attach a very short video walkthough of all of the features.

---

## ✨  Features

- 📊 **GitHub Activity Analysis** — Analyze your GitHub stats and contributions  
- 🔢 **Match Percentage** — Calculate match scores for selected roles  
- 🔐 **Secure Authentication** — Robust login and registration with Firebase & JWT  
- 📅 **Date-Based Insights** — Generate insights using date-fns for precise date handling  
- 📈 **Interactive Charts** — Visualize data with dynamic Recharts components     
- 💼 **Hiring Support** — Facilitate smooth hiring and candidate evaluation  

---

## 📝  Decisions and Assumptions

* **Backend Choice:** Used Firebase for backend and authentication for quick setup.  
* **State Management:** Chose React Context API for simple state management.  
* **User Assumption:** Assumed users have public GitHub profiles.  
* **Skill Matching:** Focused on matching user skills to specific roles.  
* **Data Visualization:** Used Recharts for easy data visualization.   
* **Authentication:** JWT-based authentication to ensure secure user sessions.  
* **Frontend UI:** Built with React, Tailwind CSS, and Chakra UI for a modern, responsive experience.

---

## 🛠️ Installation & Getting started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/SkillScan.git
   cd SkillScan
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up environment variables**: Create a .env file with necessary configurations.
  
4. **Start the development server**:
   ```bash
   npm run dev
   ```

---

## 📸 Visual Overview

### Authentication
![Authentication Screenshot](images/Screenshot%202025-09-23%20171052.png)

### Main Dashboard
![Main Dashboard](images/Screenshot%202025-09-23%20180904.png)

###  Analyze Profile
![Analyze Profile 1](images/Screenshot%202025-09-23%20171436.png)  
![Analyze Profile 2](images/Screenshot%202025-09-23%20180520.png)

###  Candidate Section
![Candidate Section](images/Screenshot%202025-09-23%20183017.png)

###  Job Section
![Job Section](images/Screenshot%202025-09-23%20171320.png)

---

## Credentials

**Test User:**

- **Email:** admin@example.com
- **Password:** admin123

## 🛠️ Tech Stack

- 🎨 **Frontend**: React, Vite, CSS, React Router, Tailwind CSS
- 🔙 **Backend**: Firebase, JWT Authentication, bcryptjs
- 📊 **Charts & UI**: Recharts, Lucide React Icons
- 🧰 **Development Tools**: Vite, ESLint, TypeScript

---

## 📜 License

This project is licensed under the MIT License.


