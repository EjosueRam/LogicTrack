LogicTrack is a web application designed to manage and track Handling Units (HUs). The application allows for the creation and visualization of charts, as well as data management through an intuitive interface. Its main features include:
- Tracking of Handling Units
- Creation and visualization of charts
- Data management tools
- Intuitive user interface
- Database implementation
  ## Table of Contents
1. Description
2. Project Objective
3. Problem Solved
4. Project Architecture
   - Main Components
   - Data Flow
5. Scalability
6. Deliverables
7. Installation Guide
   - Backend
   - Frontend
8. Usage
9. Contributing
10. Layout
11. License
12. Contact

## Description
LogicTrack is a web application designed to manage and track Handling Units (HUs). The application allows for the creation and visualization of charts, as well as data management through an intuitive interface.

## Project Objective
Provide a platform to manage sales and generated Handling Units (HUs).

## Problem Solved
Facilitates the management and tracking of sales and generated HUs, improving operational efficiency.

### Main Components

#### Frontend (React with Vite)
- **Components:**
  - EditableTable.jsx
  - Footer.jsx
  - HuGeneratedCard.jsx
  - HuGeneratedList.jsx
  - HuTable.jsx
  - LoginForm.jsx
  - Navbar.jsx
  - Navigation.jsx
  - ProtectedRoute.jsx
  - SalesCards.jsx
  - SalesList.jsx
  - ScanCard.jsx
  - ScanChart.jsx
  - ScanList.jsx
  - UserDroptown.jsx
  - Userinfo.jsx
- **Pages:**
  - FileUploadPage.jsx
  - HuGeneratedForm.jsx
  - HuGeneratedPage.jsx
  - LoginPage.jsx
  - SalesFormPage.jsx
  - SalesPage.jsx
  - ScannerFormPage.jsx
  - ScannerPage.jsx
- **Context:**
  - AuthContext.jsx
- **API:**
  - FileUpload.api.js
  - Hu_generated.api.js
  - Sales.api.js
  - Scan.api.js

#### Backend (Django Rest Framework)
- **Applications:**
  - uploadfile
  - hu_generated
  - sales
  - scanner
- **Endpoints:**
  - /api/sales
  - /api/hu_generated
  - /api/file_upload
  - /api/scanner

#### Database (SQLite)
- **Tables:**
  - sales
  - hu_generated
  - file_upload
  - scanner

### Data Flow
- **Frontend to Backend:**
  The frontend uses axios to send HTTP requests to the backend. These requests include form data and other necessary data for CRUD operations.
- **Backend to Database:**
  The backend processes the requests, validates the data, and saves it to the database.
- **Database to Backend:**
  The backend retrieves data from the database as needed and sends it back to the frontend.
- **Backend to Frontend:**
  The backend sends JSON responses to the frontend, which then updates the user interface.

  ## Scalability
**Scalability Strategies:**
- **Horizontal Scalability:** Add more instances of the Django and React services.
- **Vertical Scalability:** Increase the resources of existing instances.
- **Load Balancing:** Use Nginx to balance the load between multiple backend instances.
- **Caching:** Implement Redis to improve performance.
- **Containerization:** Use Docker to containerize the application for easier deployment and scaling.

  ## Deliverables
- **Source Code:** GitHub repository
- **Documentation:** Technical and user documentation
- **Tests:** Description of tests performed and how to run them
- **Deployment:** Instructions for deploying the project on a private server

## Installation Guide

### Prerequisites
- Node.js
- Python
- Django
- Vite

# Installation
Follow these steps to install and configure the project:
# Backend
1. Clone the repository:
    ```bash
    git clone https://github.com/EjosueRam/LogicTrack.git
    ```

2. Create and activate a virtual environment:
    ```bash
    python -m venv env
    source env/bin/activate  # On Windows `env\Scripts\activate`
    ```

3. Install the dependencies:
    ```bash
    pip install -r Requirements.txt
    ```

4.  Apply the migrations and run the server:
    ```bash
    python manage.py migrate
    python manage.py runserver
    ```

# Frontend
1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```

3. Start the application:
    ```bash
    npm start
    ```

# Usage
Once the backend server and the frontend application are running, you can access the application in your browser at [http://localhost:5173]().
# Contributing
If you want to contribute to the project, follow these steps:
1. Fork the project.
2. Create a new branch: (`git checkout -b feature/nueva-caracteristica`)
3. Make your changes and commit them:(`git commit -m 'Add new feature'`)
4. Push your changes(`git push origin feature/new-feature`)
1. Open a Pull Request.
# Layout
Login
![Captura de pantalla (10)](https://github.com/user-attachments/assets/b95f30e9-c889-44e1-943e-ac5f7b4c735f)
Sidebar
![Captura de pantalla (11)](https://github.com/user-attachments/assets/8bebe214-3711-4173-8f57-63e84cdb1745)
Home
![Captura de pantalla (1)](https://github.com/user-attachments/assets/3ece2467-28ce-4d14-8080-7ad695256b57)
Sales Option
![Captura de pantalla (2)](https://github.com/user-attachments/assets/9e39c19f-062a-492b-ae8f-17c8affbadf6)
History sales
![Captura de pantalla (3)](https://github.com/user-attachments/assets/5f83a05d-ec83-4c78-836a-50ec65b0a64a)
Entry list
![Captura de pantalla (4)](https://github.com/user-attachments/assets/8d0f89be-2567-4b36-a020-9841ba1f3c4a)
List Chart
![Captura de pantalla (5)](https://github.com/user-attachments/assets/aa64db07-1d3e-4c08-8973-59453b07a40e)
Data tabulation
![Captura de pantalla (6)](https://github.com/user-attachments/assets/653cf98d-17bb-4de6-bedf-664f6ee075cc)
Defect of package table 
![Captura de pantalla (7)](https://github.com/user-attachments/assets/522a37eb-3eba-4d5f-82e8-caf3e0e5d07e)
Generated Hu log
![Captura de pantalla (8)](https://github.com/user-attachments/assets/86306220-f2f7-4cac-b761-6b256c713ac4)
ExtractData of excel file
![Captura de pantalla (9)](https://github.com/user-attachments/assets/29deebab-2f72-419a-b509-44def024bfd4)

# License
This project is licensed under the Apache License. Check the `LICENSE` file for more details.
## Contact
If you have questions or suggestions, you can contact me at eberelcrac@gmail.com.
Let me know if you need further refinement!
