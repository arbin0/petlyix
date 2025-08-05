# 🐾 Petlyix

**Petlyix** 

**Petlyix** # 🐾 Petlyix is a full-stack web application designed to help pet owners manage their pets comprehensively — including tracking food intake, vet visits, logs, notes, and more. The app aims to simplify pet care by centralizing important health and nutrition information in one place.

> ⚠️ Note: This project is under active development and is not yet deployed.

---


> ⚠️ Note: This project is under active development and is not yet deployed.

---

## 🚀 Current Features (as per codebase)

### ✅ Backend (Django + DRF)
- RESTful API using Django REST Framework
- PostgreSQL database integration
- Modular Django project with multiple apps (`pets`, `users`)
- Pet model for calorie tracking
- JWT authentication using `djangorestframework-simplejwt`
- Environment-based configuration

### ⚙️ Frontend (React)
- React app bootstrapped with `create-react-app`
- Basic page routing using React Router
- Axios setup for API communication
- Components and pages scaffolded for authentication and pet management

---

## 🧱 Tech Stack

| Layer      | Technology                                    |
|------------|--------------------------------               |
| Frontend   | React, React Router                           |
| Backend    | Django, Django REST Framework                 |
| Auth       | JWT via `simplejwt`                           |
| Database   | PostgreSQL                                    |
| State/API  | Tenstack React Query, Django DRF              |
| DevTools   | Vite (optional), ESLint                       |

---

## 📁 Project Structure

petlyix/
├── backend/
│ ├── manage.py
│ ├── petly/ # Django project configuration
│ ├── pets/ # App for pet profiles & calorie tracking
│ └── users/ # App for user auth & management
├── frontend/
│ ├── public/
│ └── src/
│ ├── components/ # UI components
│ ├── pages/ # Route-based pages
│ └── services/ # API & helper functions

