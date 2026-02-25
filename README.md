# 🎓 Student Internship Tracking System

A full-stack web platform built to streamline internship management for students, companies, and supervisors.  
The system enables students to register, apply for internships, and manage applications; companies to post and review internships; and supervisors to monitor assigned students and company data.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React, React Bootstrap |
| **Backend** | Java, Spring Boot 3.2.5 |
| **Database** | MySQL |
| **Authentication** | JWT (JSON Web Token) |
| **Security** | Spring Security |
| **ORM** | Spring Data JPA |
| **Language** | Java 21 |

---

## 📁 Folder Structure

```bash
Internify-Portal/
│
├── Database/                                               # Contains MySQL SQL files
│
├── Student-internship-tracking-System-client/              # React app (Vite)
│   ├── src/
│   ├── package.json
│   └── ...
│
├── Internify-Spring Backend/                               # Spring Boot API
│   ├── src/
│   │   └── main/
│   │       ├── java/com/internship/portal/
│   │       │   ├── config/
│   │       │   ├── constants/
│   │       │   ├── controller/
│   │       │   ├── dto/
│   │       │   ├── entity/
│   │       │   ├── exception/
│   │       │   ├── repository/
│   │       │   ├── security/
│   │       │   └── service/
│   │       └── resources/
│   │           └── application.properties
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
│
└── README.md
```

GitHub Repository: https://github.com/vaishakhmalode98/Internify-Portal

---

## ⚙️ Setup Instructions

```bash
Frontend Setup:
cd Student-internship-tracking-System-client
npm i
npm run dev

Backend Setup:
cd "Internify-Spring Backend"
./mvnw clean install
./mvnw spring-boot:run

Java Version: 21
Spring Boot Version: 3.2.5
```

---

## 🔑 Core Features

### 👨‍🎓 Student
- Register and log in using JWT authentication
- View available internships
- Apply for internships
- Track and manage submitted applications

### 🏢 Company
- Register and log in
- Post new internships and manage listings
- View and update internship application statuses

### 🧑‍🏫 Supervisor
- Access dashboard showing all companies
- View students assigned under their supervision
- Edit or delete student details
- Dashboard displays meta details of the logged-in user

### 🛡️ Authentication & Authorization
- JWT-based authentication for all user roles
- Role-based authorization for protected routes
- Spring Security integration
- BCrypt password hashing

---

## 👨‍💻 Developers

### 🧩 Harshal
- Implemented Student APIs and components for managing student data
- Created Application-related APIs and display components
- Developed Sign-in and Sign-up components and APIs
- Integrated JWT tokenization and authorization

### 🧩 Vaishakh
- Worked on Company-related modules
- Developed APIs and components for fetching and displaying company and internship data
- Created internship application and listing APIs/components
- Designed the About Us page

### 🧩 Rachana
- Developed Supervisor APIs (GET, POST, DELETE)
- Built components to list and manage supervisors
- Designed the dashboard displaying logged-in user details

---

## 🧭 Future Enhancements
- Email notifications for application status changes
- Enhanced analytics dashboard for supervisors and companies
- Internship completion reports and feedback system

---

## 🪪 License

This project is open-source and available under the MIT License.

---

 **💫 Developed with collaboration and dedication by:Harshal, Rachana, and Vaishakh**
