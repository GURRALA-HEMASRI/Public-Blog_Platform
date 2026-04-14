# 📝 Public-Blog Platform (React + Django)

A full-stack blog application built using React (Frontend) and Django REST Framework (Backend). Users can create, read, update, and delete blog posts.

---

## 🚀 Features

- ✍️ Create, Edit, Delete Blog Posts
- 📖 View All Blogs
- ⚡ REST API integration
- 🎨 Responsive UI using React

---

## 🛠️ Tech Stack

### Frontend
- React.js
- HTML5, CSS3, JavaScript

### Backend
- Django
- Django REST Framework

### Database
- SQLite (default)

---

## 📂 Project Structure

BLOG/
├── backend/ # Django Backend
├── frontend/ # React Frontend
├── .gitignore
└── README.md


---

## ⚙️ Setup Instructions

1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/blog-app-react-django.git
cd blog-app-react-django

2️⃣ Backend Setup (Django)
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
3️⃣ Frontend Setup (React)
cd frontend
npm install
npm start

🌐 API Endpoints
/api/posts/ → Get all posts
/api/posts/create/ → Create post
/api/posts/<id>/ → View/Edit/Delete post

💡 Future Improvements
Add comments feature
Like/Dislike posts
Deploy on cloud (AWS/Render/Vercel)

👨‍💻 Author
Your Name
GitHub: https://github.com/GURRALA-HEMASRI
⭐ If you like this project

Give it a star ⭐ on GitHub!


---

# ✅ 4. Add README to GitHub

Run:

```bash
git add README.md
git commit -m "Added professional README"
git push
