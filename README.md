# UserSphere

UserSphere is a web application built with Node.js and MySQL. It provides a simple interface for managing user information. The home page features two buttons: one that displays a table of all user details and another that opens a form to add a new user.

## Features

- View all users and their details
- Add a new user
- Edit existing user information
- Delete a user

## Technologies Used

- Node.js
- Express.js
- MySQL
- EJS (Embedded JavaScript templates)
- Faker.js (for generating random user data)
- Bootstrap (for styling)
- Method-Override (for supporting PUT and DELETE methods in forms)

## Installation

1. **Clone the repository:**

   git clone https://github.com/yourusername/usersphere.git
   cd usersphere

2. **Install dependencies:**

  npm install
  Set up the MySQL database:

3. **Create a new MySQL database named delta_app.**

4. **Create a user table with the following structure:**

  CREATE TABLE user (
    id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  );

5. **Update database connection settings:**

  Open index.js and update the MySQL connection settings with your database credentials:
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "delta_app",
      password: "your_database_password",
    });

6. **Run the application:**

  node index.js
  Open the application in your browser:
  -- Navigate to http://localhost:8500 to view the application.

## Usage

- Home Page: View the total number of users.
- View Users: Click the "View Users" button to see a table of all user details.
- Add User: Click the "Add User" button to open a form for adding a new user.
- Edit User: Click the "Edit" button next to a user to update their information.
- Delete User: Click the "Delete" button next to a user to remove them from the database.

## File Structure

usersphere/
├── views/
│   ├── home.ejs
│   ├── user.ejs
│   ├── edit.ejs
│   ├── del.ejs
│   └── new.ejs
├── index.js
└── README.md

- views/ contains the EJS templates for rendering the pages.
- index.js contains the main application code.
