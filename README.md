# 🧰 Python-Based Filtering Web Project

Aplikasi web sederhana berbasis Python untuk melakukan filtering konten (teks dan/atau gambar) melalui web interface. Cocok sebagai prototype edukasi atau modul micro‑service.

---

## 🔍 Overview

Aplikasi ini memungkinkan pengguna untuk meng‑upload teks atau gambar melalui web form, kemudian memprosesnya sesuai aturan filter (blocklist, allowlist, regex, dll.). Hasilnya kembali ditampilkan dengan konten yang telah ter-filter.

---

## 🧩 Tech Stack

- **Backend**: Python + Flask (alternatif: FastAPI)
- **Frontend**: HTML, CSS, JavaScript (vanilla/Bootstrap)
- **Filtering logic**: Modul Python (`filter.py`)
  - Filter teks: stopwords, keyword-based, regex
  - File-based allowlist/blocklist (`.txt`, `.yaml`)
  - Opsional: filter gambar via OpenCV / PIL
- **Dependencies**:
  - `flask`
  - `werkzeug`
  - `opencv-python`, `Pillow` (jika diperlukan)
  - `pytest` (untuk testing)

---

## 📂 Struktur Direktori

```text
python‑basedfiltering‑projectweb/
├── app.py                # Entry point aplikasi
├── filter.py             # Modul filter utama
├── templates/            # HTML Jinja2 template
│   └── index.html
├── static/               # CSS, JS, asset lainnya
├── data/                 # file allowlist/blocklist
│   ├── blocklist.txt
│   └── allowlist.txt
├── uploads/              # (opsional) direktori hasil upload
├── tests/                # unit test dengan pytest
├── requirements.txt      # dependensi pip
└── README.md
