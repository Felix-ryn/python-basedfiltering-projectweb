# 🧰 Python-Based Filtering Web Project

A lightweight and modular Python web application for content filtering. This project allows users to submit text or images through a web interface, which are then processed using customizable filtering rules such as blocklists, allowlists, or regular expressions. Designed for learning, prototyping, or microservice integration.

---

## 🔍 Overview

This application provides a user-friendly interface for submitting content and reviewing filtered results. Whether you're removing sensitive keywords from user input or pre-processing uploaded images, the project demonstrates a full-stack implementation of a filtering pipeline using Python and Flask.

### Core Features:
- ✂️ Text filtering using blocklists or regular expressions
- 🖼️ Optional image filtering (e.g., blur, detect)
- 🧠 Configurable and extendable filtering rules
- 🌐 Web-based submission and review interface

---

## 🧩 Tech Stack

| Component           | Technology            |
|---------------------|------------------------|
| Backend             | Python 3, Flask        |
| Frontend            | HTML, CSS, JavaScript |
| Filtering Logic     | Custom Python module   |
| Image Processing    | Pillow or OpenCV       |
| Testing             | Pytest                 |

---

## 📁 Project Structure

```
python-basedfiltering-projectweb/
├── app.py               # Main Flask application
├── filter_utils.py      # Text/image filtering functions
├── static/              # CSS, JS assets
├── templates/           # HTML templates
├── uploads/             # Uploaded files (temp)
├── requirements.txt     # Dependencies list
├── tests/               # Unit tests
├── README.md            # Project documentation
└── LICENSE              # MIT License
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Felix-ryn/python-basedfiltering-projectweb.git
cd python-basedfiltering-projectweb
```

### 2. Install Dependencies

Create a virtual environment and install packages:

```bash
python3 -m venv venv
source venv/bin/activate          # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Run the Application

```bash
python app.py
```

Then open your browser at: [http://localhost:5000](http://localhost:5000)

---

## 💡 Configuration

You can adjust the filtering rules in `filter_utils.py`. For example:
- Update `blocklist = [...]` to define filtered keywords
- Modify regex patterns or add new rules
- Enable/disable image filtering (e.g., blur, size limit)

---

## 🧪 Running Tests

To run unit tests:

```bash
pytest
```

---

## 🔭 Future Enhancements

- 🔒 Admin panel to manage filter rules
- 🧠 AI-based content moderation
- 🖼️ Advanced image processing (face detection, NSFW filter)
- 📂 Batch processing of uploaded files
- 🌐 REST API integration

---

## 🤝 Contribution Guide

We welcome your contributions!

1. Fork the repository  
2. Create a new branch (e.g., `feat/new-filter`)  
3. Commit your changes with meaningful messages  
4. Submit a pull request  
5. Wait for review and merge 🎉

---

## 📜 License

MIT License  
Copyright (c) 2025 Felix Ryan

Permission is hereby granted, free of charge, to any person obtaining a copy  
of this software and associated documentation files (the "Software"), to deal  
in the Software without restriction, including without limitation the rights  
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in  
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN  
THE SOFTWARE.

---

## 👨‍💻 Author

**Felix Ryan Agusta**  
GitHub: [@Felix-ryn](https://github.com/Felix-ryn)

> “Filter wisely. Empower responsibly.” 🔒✨
