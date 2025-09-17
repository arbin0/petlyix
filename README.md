# 🐾 Petlyix

**Petlyix** 

**Petlyix** # 🐾 Petlyix is a full-stack web application designed to help pet owners manage their pets comprehensively — including tracking food intake, Vet Appointment scheduling, vet visits, logs, notes, and more. The app aims to simplify pet care by centralizing important health and nutrition information in one place.


---

## 🚀 Current Features 
- **Smart Food & Calorie Logging** – Effortlessly track everything your pet eats and monitor calorie intake for optimal health.  
- **Interactive Nutrition Dashboard** – Visualize your pet’s dietary patterns with intuitive charts and insights.  
- **Comprehensive Health Records** – Keep all vet reports, vaccinations, and medical history organized in one place.  
- **Seamless Vet Visit Logging** – Quickly record every visit and important notes for easy reference.  
- **Dynamic Appointment Scheduler** – Plan, track, and manage upcoming and past appointments.
 - 

## 🧱 Tech Stack & Tools

### ✅ Backend (Django + DRF)
- RESTful API using Django REST Framework
- PostgreSQL database integration
- Modular Django project with multiple apps (`pets`, `users`)
- JWT authentication using `djangorestframework-simplejwt`

### ⚙️ Frontend (React with Typescript)
- Mantine UI for UI components
- Basic page routing using React Router
- Central API client for managing all API calls
- Tenstack React query for smark caching and data  
- Components and pages scaffolded for authentication and pet management



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

