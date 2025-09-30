# 🍽️ Restaurant Listing Platform

A full-stack web application built with **Node.js**, **Express**, **Sequelize**, **MySQL**, and **ReactJS**.  
This project was developed as a **24-hour machine task assignment**.

---

## 🚀 Features

- **Show Restaurants**: View all restaurants with their name, address, and contact.
- **Add Restaurants**: Add new restaurants through a simple form.
- **Update Restaurants**: Edit existing restaurant details.
- **Delete Restaurants**: Remove restaurants from the system.
- **Responsive UI**: Built using Material-UI and custom components for a professional look.
- **Database Management**: Sequelize ORM with MySQL and migrations.
- **Dockerized Setup**: Includes Docker and Nginx for production deployment.

---

## 🛠️ Tech Stack

**Frontend**
- ReactJS + TypeScript
- Axios for API calls
- Material-UI and custom UI components

**Backend**
- Node.js + Express + TypeScript
- Sequelize ORM + MySQL
- Docker + Nginx for production

**Other Tools**
- Sequelize CLI (migrations)
- Nodemon (development server)
- ESLint + Prettier (code formatting)
- Git & GitHub (version control)
- Docker Compose
- Vite (frontend dev server)

---

## 📂 Project Structure

**Backend** (`backend/`) → Node.js + Express + Sequelize + Docker + Nginx  

- `src/config/` → Database and environment configuration  
- `src/controllers/` → Controller logic  
- `src/dto/` → Data Transfer Objects  
- `src/interfaces/` → Controller, Service, and Repository interfaces  
- `src/middlewares/` → Error handling middleware  
- `src/models/` → Sequelize models  
- `src/repositories/` → Database repositories  
- `src/routes/` → Express routes  
- `src/services/` → Service layer  
- `src/utils/` → Utility functions  
- `Dockerfile`, `Dockerfile.prod`, `docker-compose.yml`, `docker-compose.prod.yml` → Docker setup  
- `nginx/` → Nginx configuration and SSL certificates  

**Frontend** (`frontend/`) → React + TypeScript + Axios  

- `src/api/` → Axios API service  
- `src/components/` → UI components  
- `src/components/custom/` → Custom reusable components  
- `src/components/ui/` → UI library components  
- `src/pages/` → Page components (Home/RestaurantList)  
- `src/lib/` → Utility functions  
- `src/types/` → Type definitions  
- `src/utils/` → Utility functions for API errors  

---


## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/restaurant-listing-platform.git
cd restaurant-listing-platform
```

## 🚀 Deployment

- **Frontend**: Vercel
- **Backend**: AWS EC2
- **Database**: Neon
- **Production Docker**: Use `docker-compose.prod.yml` and Nginx with SSL

## 📝 Evaluation Checklist

- Show Restaurants
- Add Restaurants
- Update Restaurants
- Delete Restaurants
- Sequelize + Migrations
- Clean UI with Material-UI and custom components
- Git commit history maintained
- Docker + Nginx configuration included
- Completed within **24 hours**

## 👨‍💻 Author

- **Jasim Ihsan M**
- GitHub: [@JasimIhsan](https://github.com/JasimIhsan)
- Email: jasimihsan1234@gmail.com
