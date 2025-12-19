# task_manager

# Task Manager Application

A full-stack **Task Manager Application** built with **React, Node.js, Socket.io, MongoDB, and TypeScript**.  
The app supports **real-time collaboration**, **authentication**, **task filtering**, and **secure data validation**.

---

## Features

### Authentication
- User login with JWT-based authentication
- Secure password handling
- Role-based access (if applicable)

### Task Management
- Create, update, delete tasks
- Assign tasks to users
- Set task status (To Do, In Progress, Done)
- Set priority and due date

### Real-Time Collaboration
- Live task updates using **Socket.io**
- Instant task status and assignment updates
- Real-time notifications on task assignment

### Filtering & Sorting
- Filter tasks by **Status** and **Priority**
- Sort tasks by **Due Date**

### Testing & Validation
- Backend unit and integration tests using **Jest**
- Schema validation using **Zod**

---

## Tech Stack

### Frontend
- React
- Tailwind CSS
- TypeScript

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- JWT Authentication
- Socket.io
- Jest
- Zod (Schema Validation)

---

## Project Structure

```txt
task-manager/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── models/
│   │   ├── validations/
│   │   ├── socket/
│   │   └── server.ts
│   ├── tests/
│   ├── .env.example
│   └── package.json
│
└── README.md
