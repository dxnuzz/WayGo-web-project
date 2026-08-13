# WayGo Web Project

Welcome to the WayGo web project! This is a simple vehicle rental web application with a PHP backend and a React/Vite frontend.

## How to run the project

Follow these simple steps to get the project running on your local machine:

1. **Start XAMPP**
   - Open your XAMPP Control Panel.
   - Start the **Apache** and **MySQL** modules.

2. **Database Setup**
   - Open your browser and go to `http://localhost/phpmyadmin/`.
   - Create a new database named `waygo_db`.
   - Import the database using the `backend/database/database.sql` file into `waygo_db`.

3. **Backend Setup**
   - Make sure this whole project folder (`WayGo-web-project`) is inside your `C:\xampp\htdocs\` directory.
   - The backend API will be available at `http://localhost/WayGo-web-project/backend/api`.

4. **Frontend Setup**
   - Open a terminal and navigate to the `frontend` folder:
     ```bash
     cd frontend
     ```
   - Install the dependencies (you only need to do this once):
     ```bash
     npm install
     ```
   - Copy the `.env.example` file and rename it to `.env` (or just create a `.env` file) and make sure it has the correct API URL.
   - Start the frontend server:
     ```bash
     npm run dev
     ```
   - Click the local link shown in the terminal (usually `http://localhost:5173`) to view the website.

## Test Accounts

You can use the following credentials to test the system:

**Admin Account**
- **Email:** admin@waygo.com
- **Password:** admin123

**Customer Account**
- **Email:** customer@waygo.com
- **Password:** customer123
