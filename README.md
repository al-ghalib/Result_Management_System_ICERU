# Result Management System (ICERU)

## Overview
The **Result Management System** is a web-based application designed to manage student results efficiently. Built using Django for the backend and Next.js for the frontend, this system provides an easy-to-use interface for students, faculty, and administrators to access and manage academic records.

## Features
- **User Authentication**: Secure login and role-based access (Admin, Faculty, Student).
- **Student Management**: Add, update, and view student details.
- **Result Entry & Management**: Faculty can input student results, while students can view their grades.
- **Automated GPA Calculation**: Calculates GPA and CGPA automatically.
- **Responsive UI**: Built with Next.js for a modern and interactive frontend experience.
- **Role-Based Dashboards**: Different interfaces for students, faculty, and admin.

## Tech Stack
- **Backend**: Django, Django Rest Framework (DRF)
- **Frontend**: Next.js, React.js
- **Database**: SQLite3 (can be replaced with PostgreSQL/MySQL)
- **Authentication**: JWT Authentication

## Installation & Setup

### Prerequisites
- Python 3.12+
- Node.js & npm
- Virtualenvwrapper-win (for Windows users)

### Backend Setup (Django)
```bash
# Clone the repository
git clone https://github.com/al-ghalib/Result_Management_System_ICERU.git
cd Result_Management_System_ICERU

# Activate virtual environment
mkvirtualenv result_mgmt_env  # (For Windows users with virtualenvwrapper-win)
source venv/bin/activate       # (For Linux/macOS users with virtualenv)

# Install dependencies
pip install -r requirements.txt

# Apply migrations
python manage.py migrate

# Create a superuser
python manage.py createsuperuser

# Run the development server
python manage.py runserver
```

### Frontend Setup (Next.js)
```bash
cd frontend
npm install
npm run dev  # Runs the frontend on localhost:3000
```

## Usage
1. Access the Django Admin Panel at `http://127.0.0.1:8000/admin/`.
2. Log in with the superuser credentials and add users (students and faculty).
3. Faculty can enter student results via the portal.
4. Students can log in and check their results.
5. Admin can manage all users and records.

## Future Enhancements
- **Result Report**: Automatic Result generation as PDF
- **Email Notifications**: Send result updates to students.
- **Graphical Analytics**: Visualize performance trends.
- **Cloud Deployment**: Host on AWS/GCP for scalability.

## Contributing
We welcome contributions! Feel free to submit issues or pull requests.

## License
This project is licensed under the MIT License.

## Contact
For any queries or collaborations, reach out to [Najib Wadud](mailto:najibwadud@example.com).

