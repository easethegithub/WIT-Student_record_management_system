# link to project demo execution ==> https://drive.google.com/file/d/1Jpm0ZRfyeP0r0xy_K6dVduInyZlMOOIF/view?usp=sharing
📘 WIT SRMS - Student Record Management System
WIT SRMS is a web-based Student Record Management System that allows Admins and Faculty to manage student academic data efficiently — including subject grades, attendance, and analytics via a dashboard.

🚀 Features
🔐 Authentication (Login/Register) with Role-based Access (Admin & Faculty)

📋 Student CRUD: Add, Edit, View, Delete Students

🧮 Grade & Subject Entry for each student

📊 Dashboard Overview: Total students, average attendance  //not working

🧾 PDF Report Generation for individual student details

🔎 Search and Filter by name, roll, department, and year

📱 Ionic Frontend for responsive web/mobile interface

🧰 Tech Stack

Layer	Technology
Frontend	Angular + Ionic
Backend	Node.js + Express
Database	MySQL / SQLite (via Model Layer)
PDF Gen	PDFKit
Auth	JWT

folder structer
├── frontend/           # Ionic Angular App
│   └── src/app/
│       ├── auth/
│       ├── students/
│       ├── shared/
│       └── dashboard/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── pdfs/
│   └── app.js


⚙️ Setup Instructions
📦 Backend Setup
Clone the repo:

git clone https://github.com/your-repo/wit-srms.git
cd wit-srms/backend
Install dependencies:


npm install
Configure your database in models/db.js or .env.

Start the backend server:

node app.js
Ensure PDF folder is accessible:


mkdir pdfs
💻 Frontend (Ionic + Angular) Setup
Navigate to the frontend folder:

cd ../frontend
Install dependencies:


npm install
Run the app:


ionic serve
🔑 Default Roles & Access

Role	Capabilities
Admin	Full CRUD, Dashboard access, PDF, Manage users
Faculty	View/update grades & attendance only
📥 API Endpoints (Backend)

Method	Endpoint	Description
GET	/api/students	List all students
GET	/api/students/:id	Get single student
POST	/api/students/add	Add new student
PUT	/api/students/:id	Update student info
DELETE	/api/students/:id	Delete student (admin only)
GET	/api/students/pdf/:id	Generate & return PDF link
GET	/api/students/stats	Dashboard stats (total, avg)
