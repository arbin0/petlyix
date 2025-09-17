# 🐾 Petlyix

Petlyix is a full-stack web application that helps pet owners manage their pets comprehensively, including tracking food intake, scheduling vet appointments, recording vet visits, maintaining logs and notes, and more. The app centralizes important health and nutrition information in one place, simplifying pet care. 

The backend and frontend are decoupled: the backend is built with Python and Django REST Framework (DRF) for creating API endpoints, while the frontend uses React with TypeScript.


## Screenshots
### Landing Page
<img width="1919" height="781" alt="image" src="https://github.com/user-attachments/assets/cbe53eaf-584d-40f9-9385-22d47fd1ad28" />



### Pet Management Dashboard
<img width="1888" height="891" alt="image" src="https://github.com/user-attachments/assets/364514cf-15c9-49b8-a0dc-d030b1d434e5" />



### Overview Page
<img width="1919" height="902" alt="image" src="https://github.com/user-attachments/assets/1e66093b-0a47-4367-b7d0-2f4b0ffefa38" />



### Feeding Page
<img width="1911" height="913" alt="image" src="https://github.com/user-attachments/assets/d9a590bf-1d06-4456-9f13-27d111f4c1e9" />



### Health Records
<img width="1902" height="819" alt="image" src="https://github.com/user-attachments/assets/f16fcdf5-afe7-4506-a373-1e9b1e0632ed" />



### Vetenary Records
<img width="1919" height="854" alt="image" src="https://github.com/user-attachments/assets/5d288b2f-33cd-4529-9efb-19057d3ecdb3" />



### Vet Visit Logs
<img width="1919" height="801" alt="image" src="https://github.com/user-attachments/assets/a229e876-56f8-4b11-8d00-4d5b8b44f80f" />



### Vet Appointment Scheduling
<img width="1919" height="831" alt="image" src="https://github.com/user-attachments/assets/8956f419-1d60-4d8c-a500-b5936772b5a1" />









---

## 🚀 Current Features 
- **Smart Food & Calorie Logging** – Effortlessly track everything your pet eats and monitor calorie intake for optimal health.  
- **Interactive Nutrition Dashboard** – Visualize your pet’s dietary patterns with intuitive charts and insights.  
- **Comprehensive Health Records** – Keep all vet reports, vaccinations, and medical history organized in one place.  
- **Seamless Vet Visit Logging** – Quickly record every visit and important notes for easy reference.  
- **Dynamic Appointment Scheduler** – Plan, track, and manage upcoming and past appointments.

---

## 🧱 Tech Stack & Tools

### ✅ API Backend (Django + DRF)

- RESTful API using Django REST Framework
- PostgreSQL database integration
- Modular Django project with multiple apps (`pets`, `users`)
- JWT authentication using `djangorestframework-simplejwt`

### ⚙️ Frontend (React with Typescript)

- Page routing using React Router
- Build Custom reusable API client with automatic JWT refresh, DRF-style error handling, JSON/FormData support, and convenient HTTP methods.
- React Context API (AuthContextProvider) for global auth state
- ProtectedRoute wrapper to restrict access to authenticated users
- TanStack React query for smart caching and data refetching
- UI Components: Mantine UI Component Library, Tabler Icons, Rechart, etc.

  

---
## API Documentation

## Authentication Endpoints

| Endpoint          | Method | Description                                            | Permissions   |
| ----------------- | ------ | ------------------------------------------------------ | ------------- |
| `/register/`      | POST   | Register a new user and return access & refresh tokens | Public        |
| `/login/`         | POST   | Log in a user and return access & refresh tokens       | Public        |
| `/logout/`        | POST   | Log out a user by blacklisting their refresh token     | Authenticated |
| `/user/`          | GET    | Retrieve info about the currently logged-in user       | Authenticated |
| `/token/refresh/` | POST   | Refresh access token using refresh token               | Authenticated |

## Pet Management Endpoints

| Endpoint      | Method    | Description                         | Permissions   | Query Params |
| ------------- | --------- | ----------------------------------- | ------------- | ------------ |
| `/pets/`      | GET       | List all pets of the logged-in user | Authenticated | -            |
| `/pets/`      | POST      | Create a new pet                    | Authenticated | -            |
| `/pets/{id}/` | GET       | Retrieve a specific pet             | Authenticated | -            |
| `/pets/{id}/` | PUT/PATCH | Update a pet                        | Authenticated | -            |
| `/pets/{id}/` | DELETE    | Delete a pet                        | Authenticated | -            |


## Food Logs Endpoint

| Endpoint      | Method    | Description                         | Permissions   | Query Params |
| ------------- | --------- | ----------------------------------- | ------------- | ------------ |
| `/pets/`      | GET       | List all pets of the logged-in user | Authenticated | -            |
| `/pets/`      | POST      | Create a new pet                    | Authenticated | -            |
| `/pets/{id}/` | GET       | Retrieve a specific pet             | Authenticated | -            |
| `/pets/{id}/` | PUT/PATCH | Update a pet                        | Authenticated | -            |
| `/pets/{id}/` | DELETE    | Delete a pet                        | Authenticated | -            |

## Vet and Vet Visits endpoint

| Endpoint           | Method    | Description                                       | Permissions   | Query Params       |
| ------------------ | --------- | ------------------------------------------------- | ------------- | ------------------ |
| `/vets/`           | GET       | List all vets or filter by pet                    | Authenticated | `petId` (optional) |
| `/vets/`           | POST      | Add a vet (validate assigned pets belong to user) | Authenticated | -                  |
| `/vetvisits/`      | GET       | List all vet visits for a pet                     | Authenticated | `petId` (required) |
| `/vetvisits/`      | POST      | Add a new vet visit for a pet                     | Authenticated | -                  |
| `/vetvisits/{id}/` | PUT/PATCH | Update a vet visit                                | Authenticated | -                  |
| `/vetvisits/{id}/` | DELETE    | Delete a vet visit                                | Authenticated | -                  |

## Appointment Endpoints

| Endpoint           | Method    | Description                                       | Permissions   | Query Params       |
| ------------------ | --------- | ------------------------------------------------- | ------------- | ------------------ |
| `/vets/`           | GET       | List all vets or filter by pet                    | Authenticated | `petId` (optional) |
| `/vets/`           | POST      | Add a vet (validate assigned pets belong to user) | Authenticated | -                  |
| `/vetvisits/`      | GET       | List all vet visits for a pet                     | Authenticated | `petId` (required) |
| `/vetvisits/`      | POST      | Add a new vet visit for a pet                     | Authenticated | -                  |
| `/vetvisits/{id}/` | PUT/PATCH | Update a vet visit                                | Authenticated | -                  |
| `/vetvisits/{id}/` | DELETE    | Delete a vet visit                                | Authenticated | -                  |

## Pet Health Endpoint

| Endpoint           | Method    | Description                       | Permissions   | Query Params       |
| ------------------ | --------- | --------------------------------- | ------------- | ------------------ |
| `/pethealth/`      | GET       | List all health records for a pet | Authenticated | `petId` (required) |
| `/pethealth/`      | POST      | Add a new health record           | Authenticated | -                  |
| `/pethealth/{id}/` | PUT/PATCH | Update a health record            | Authenticated | -                  |
| `/pethealth/{id}/` | DELETE    | Delete a health record            | Authenticated | -                  |


## Notes / Features

- All endpoints (except registration and login) require authentication (JWT).
- Access is limited to the logged-in user’s pets only.
- Query parameters like petId are required for nested resources (food logs, vet visits, appointments, health).
- Responses include meaningful error messages extracted from DRF-style validation errors.

Author: arbin0
Email: arbinkhadka10@gmail.com




