# Task Manager Application

A full-stack Task Manager web application built with React, Node.js, Express, and MySQL.

## Features

- Add new tasks with title and description
- View all tasks in a clean, responsive interface
- Mark tasks as completed
- Delete tasks
- Visual indicators for completed tasks (strikethrough)

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or newer)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MySQL](https://dev.mysql.com/downloads/) (v5.7 or newer)

## Project Structure

```
task-manager/
├── client/           # React frontend
├── server/           # Node.js backend
├── .gitignore
└── README.md
```

## Setup Instructions

### Step 1: Clone the Repository

```bash
# Clone the repository or extract the project folder
git clone <repository-url>
# Or create the project structure manually
mkdir -p task-manager/client task-manager/server
```

### Step 2: Set Up MySQL Database

1. Start MySQL service on your machine
2. Log in to MySQL:

```bash
mysql -u root -p
```

3. Create a new database:

```sql
CREATE DATABASE taskmanager;
```

4. (Optional) Create a dedicated user:

```sql
CREATE USER 'taskuser'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON taskmanager.* TO 'taskuser'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 3: Set Up Backend Server

1. Navigate to the server directory:

```bash
cd task-manager/server
```

2. Create the following files:

**package.json**
```bash
npm init -y
```

**Install required dependencies**
```bash
npm install express mysql2 cors dotenv
```

3. Create a `.env` file in the server directory:

```
PORT=5000
DB_HOST=localhost
DB_USER=root           # or your MySQL username
DB_PASSWORD=password   # your MySQL password
DB_NAME=taskmanager
```

4. Create the following directory structure and files:

```
server/
├── server.js
├── db.js
├── .env
├── controllers/
│   └── taskController.js
└── routes/
    └── tasks.js
```

5. Start the server:

```bash
node server.js
```

You should see: "Server running on port 5000" and "Database initialized successfully"

### Step 4: Set Up Frontend

1. Navigate to the client directory:

```bash
cd ../client
```

2. Create a new React app:

```bash
npx create-react-app .
```

3. Install axios for API calls:

```bash
npm install axios
```

4. Create the following components in the `src/components` directory:
   - TaskForm.js
   - TaskList.js

5. Replace the content of App.js and App.css files

6. Start the React development server:

```bash
npm start
```

The app should open automatically at http://localhost:3000

## Running the Application

### Start the Backend Server

```bash
cd task-manager/server
node server.js
```

### Start the Frontend Development Server

In a separate terminal:

```bash
cd task-manager/client
npm start
```

## API Endpoints

- `GET /tasks` - Get all tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/:id/complete` - Mark a task as completed
- `DELETE /tasks/:id` - Delete a task

## Troubleshooting

### Database Connection Issues

- Verify MySQL is running
- Check your credentials in the `.env` file
- Ensure the database exists: `SHOW DATABASES;`

### Server Won't Start

- Check if port 5000 is already in use
- Verify all dependencies are installed
- Check console for specific error messages

### Frontend Issues

- Make sure the backend server is running
- Check browser console for error messages
- Verify API URL in React components (should be http://localhost:5000/tasks)

## Database Schema

```sql
CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

## Code Explanations

### Backend

The backend uses Express.js to create a RESTful API with the following components:
- Connection pool for MySQL database
- Controllers for handling CRUD operations
- Routes for API endpoints
- Error handling and input validation

### Frontend

The React frontend consists of:
- App component as the main container
- TaskForm component for adding new tasks
- TaskList component for displaying tasks
- CSS for styling and responsive design
- Axios for API communication

## Future Enhancements

- User authentication
- Task categories
- Due dates for tasks
- Task prioritization
- Search and filter functionality