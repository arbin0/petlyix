# 🐾 Petlyix

**Petlyix** 

**Petlyix** # 🐾 Petlyix is a full-stack web application designed to help pet owners manage their pets comprehensively — including tracking food intake, Vet Appointment scheduling, vet visits, logs, notes, and more. The app aims to simplify pet care by centralizing important health and nutrition information in one place.


**Screenshots**
<img width="1919" height="781" alt="image" src="https://github.com/user-attachments/assets/cbe53eaf-584d-40f9-9385-22d47fd1ad28" />
<img width="1888" height="891" alt="image" src="https://github.com/user-attachments/assets/364514cf-15c9-49b8-a0dc-d030b1d434e5" />
<img width="1919" height="902" alt="image" src="https://github.com/user-attachments/assets/1e66093b-0a47-4367-b7d0-2f4b0ffefa38" />
<img width="1911" height="913" alt="image" src="https://github.com/user-attachments/assets/d9a590bf-1d06-4456-9f13-27d111f4c1e9" />
<img width="1902" height="819" alt="image" src="https://github.com/user-attachments/assets/f16fcdf5-afe7-4506-a373-1e9b1e0632ed" />
<img width="1919" height="854" alt="image" src="https://github.com/user-attachments/assets/5d288b2f-33cd-4529-9efb-19057d3ecdb3" />
<img width="1919" height="801" alt="image" src="https://github.com/user-attachments/assets/a229e876-56f8-4b11-8d00-4d5b8b44f80f" />
<img width="1919" height="831" alt="image" src="https://github.com/user-attachments/assets/8956f419-1d60-4d8c-a500-b5936772b5a1" />









---

## 🚀 Current Features 
- **Smart Food & Calorie Logging** – Effortlessly track everything your pet eats and monitor calorie intake for optimal health.  
- **Interactive Nutrition Dashboard** – Visualize your pet’s dietary patterns with intuitive charts and insights.  
- **Comprehensive Health Records** – Keep all vet reports, vaccinations, and medical history organized in one place.  
- **Seamless Vet Visit Logging** – Quickly record every visit and important notes for easy reference.  
- **Dynamic Appointment Scheduler** – Plan, track, and manage upcoming and past appointments.


## 🧱 Tech Stack & Tools

### ✅ Backend (Django + DRF)
- RESTful API using Django REST Framework
- PostgreSQL database integration
- Modular Django project with multiple apps (`pets`, `users`)
- JWT authentication using `djangorestframework-simplejwt`

### ⚙️ Frontend (React with Typescript)
- Mantine UI for UI components
- Page routing using React Router
- Custom built API client for managing all API calls
- Custom Build Global Authentication State managemtn
- TanStack React query for smart caching and data refetching  



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

