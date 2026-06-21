# GetPost Jobs - Frontend

A modern, responsive job portal application built with React, where students can browse and apply to jobs, and recruiters can post jobs and manage applicants.

## 🚀 Live Demo

Live Site: https://getpost-jobs-frontend.vercel.app

Backend Repo: https://github.com/abhijeetsingh860/getpost-jobs-backend

## 🛠️ Tech Stack

- **Library:** React 19
- **Build Tool:** Vite
- **State Management:** Redux Toolkit, Redux Persist
- **Styling:** Tailwind CSS, shadcn/ui (Radix UI)
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Animations:** Framer Motion
- **Notifications:** Sonner

## ✨ Features

- Role-based authentication (Student / Recruiter)
- Job search and filtering by location, industry, and salary
- Job application with real-time status tracking
- Recruiter dashboard to manage companies and job postings
- Applicant management with accept/reject functionality
- Profile management with resume upload
- Responsive UI with reusable shadcn/ui components
- Persistent login state using Redux Persist

## 📁 Project Structure

frontend/
├── src/
│   ├── components/
│   │   ├── admin/        # Recruiter dashboard components
│   │   ├── auth/          # Login & Signup
│   │   ├── shared/        # Navbar, Footer
│   │   └── ui/             # shadcn/ui components
│   ├── hooks/             # Custom React hooks
│   ├── redux/             # Redux slices & store
│   └── utils/              # Constants & helpers

## 🚀 Getting Started

git clone https://github.com/abhijeetsingh860/getpost-jobs-frontend.git
cd getpost-jobs-frontend
npm install
npm run dev

## 🔗 Related

This is the frontend for GetPost Jobs. Check out the [backend repository](https://github.com/abhijeetsingh860/getpost-jobs-backend) for the API.

## 👤 Author

**Abhijeet Singh**

- GitHub: [@abhijeetsingh860](https://github.com/abhijeetsingh860)