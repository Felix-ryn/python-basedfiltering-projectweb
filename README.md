# 🧰 Python-Based Filtering Web Project

A lightweight and modular Python web application for content filtering. This project allows users to submit text or images through a web interface, which are then processed using customizable filtering rules such as blocklists, allowlists, or regular expressions. Designed for learning, prototyping, or microservice integration.

---

## 🔍 Overview

This application offers a user-friendly interface for submitting content and reviewing filtered results. Whether you're removing sensitive keywords from user input or pre-processing uploaded images, the project demonstrates a full-stack implementation of a filtering pipeline using Python and Flask.

The core functionality includes:
- Keyword-based text filtering (with support for blocklists and regex)
- Optional image processing using OpenCV or Pillow
- Configurable filtering rules
- Clear web UI for interacting with the system

---

## 🧩 Tech Stack

- **Backend**: Python, Flask
- **Frontend**: HTML, CSS, JavaScript
- **Content Filtering**: Python-based logic (custom filtering module)
- **Dependencies**:
  - `Flask` – Web framework
  - `Werkzeug` – Utility for request handling
  - `OpenCV` / `Pillow` – For optional image filtering
  - `Pytest` – Unit testing framework

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Felix-ryn/python-basedfiltering-projectweb.git
cd python-basedfiltering-projectweb
