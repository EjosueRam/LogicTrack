LogicTrack
This web application focuses on the logic of tracking and managing Handling Units (HU), allowing the creation of charts and data management tools through an easy-to-use interface.
- Handling Unit Tracking
- Creation and visualization of charts
- Data management
- Intuitive user interface
- Database implementation

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
    source env/bin/activate  # En Windows usa `env\Scripts\activate`
    ```

3. Install the dependencies:
    ```bash
    pip install -r requirements.txt
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

# License
This project is licensed under the MIT License. Check the `LICENSE` file for more details.
Let me know if you need further refinement!
