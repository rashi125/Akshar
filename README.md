# 🧠 Akshar Mitr: Dyslexia Detection & Support Platform

**Akshar Mitr** is an accessibility-focused web application designed to **detect early signs of dyslexia** and provide **personalized support tools** for learners. The platform integrates multiple AI-driven modalities such as OCR, speech recognition, eye tracking, handwriting analysis, and interactive assessments into a unified system.

---

## 🌟 Key Features

### 🔍 Multimodal Detection

* **OCR Recognition**
  Extracts textual features from images using EasyOCR.

* **Speech Recognition**
  Converts spoken input into text using OpenAI Whisper.

* **Eye Tracking**
  Analyzes eye movement patterns using WebGazer.js and OpenCV.

* **Handwriting Analysis**
  Processes handwriting logs to detect irregularities associated with dyslexia.

---

### 🧩 Assessment & Interaction

* **Interactive Quiz**
  Cognitive and reading-based evaluations to assess learning patterns.

* **Gamified Assessment**
  Engaging activities triggered when dyslexia indicators are detected.

---

### 📖 Support System

* **Reading Assistance Tool**
  Provides personalized learning support and reading enhancements for users diagnosed with dyslexia.

---

## 📚 Research & Publication

We are proud to present our published research:

**“Akshar Mitra: A Multimodal Integrated Framework for Early Dyslexia Detection”**
Published in the SCIE-indexed journal *Digital Health*.

This research introduces a comprehensive framework combining OCR, speech analysis, eye tracking, handwriting evaluation, and gamified learning for early dyslexia detection.

**Authors:**
Rashi Sahu, Manya Sharma, Radhika Babar, Vibha Tiwari, Rebekah Geddam, Muhammad Awais, Hemant Ghayvat, Ocean Agarwal

🔗 https://www.frontiersin.org/journals/digital-health/articles/10.3389/fdgth.2025.1726307/full

---

## ⚙️ Tech Stack

### 🖥️ Frontend

* React.js (Components, Pages, Assets)

### 🔧 Backend

* Node.js / Express (Authentication & APIs)
* Python (AI/ML Processing Services)

### 🗄️ Database

* MongoDB Atlas

### 🤖 AI/ML Tools

* EasyOCR
* OpenAI Whisper
* WebGazer.js
* OpenCV

### 🚀 Deployment

* GitHub + Cloud Hosting

---

## 📂 Project Structure

```
my-app/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   ├── index.js
│   └── ...
├── package.json
├── .env
└── README.md

Backend/
├── models/
│   ├── Eye_track/
│   │   ├── logs/
│   │   │   ├── eye_logs.csv
│   │   │   ├── app.py
│   ├── Handwriting/
│   ├── reports/
│   └── speech/
│       ├── Syllable.py
│       └── __init__.py
├── main.py
├── requirements.txt
├── Procfile
└── .env

Auth_backend/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── index.js
├── package.json
└── .env
```

---

## 🖼️ Application Screens

* Home Interface
* Eye Tracking Module
* Handwriting Analysis
* Quiz Interface
* Memory Game
* Reading Support Tool
 Images:
  ![Aksahr-home](https://github.com/user-attachments/assets/d05d4308-4cb5-458e-a1e1-8c492f41e8ab)
  ![eye-screening](https://github.com/user-attachments/assets/2ce5b4e7-1645-4481-93c4-07b1f9358e98)
  ![handwriting](https://github.com/user-attachments/assets/42ee95e2-fe78-490d-a7ab-8c81dec1ebf0)
  ![Quiz](https://github.com/user-attachments/assets/8ea4a16f-f58f-4ae5-89ea-bcee54168375)
  ![![memory-game](https://github.com/user-attachments/assets/eeea3757-b4cb-445a-96d7-eee7c230b030)
 ![reading-support](https://github.com/user-attachments/assets/c16f371b-360a-4894-8e5b-4e3837bbb079)
---

## 📝 Installation & Setup

```bash
# Clone repository
git clone https://github.com/rashi125/Akshar.git
cd Akshar

# Install frontend dependencies
npm install

# Run frontend
npm run dev

# Install backend dependencies
pip install -r requirements.txt

# Run backend
python main.py
```

---

## ⚙️ Environment Configuration

Create a `.env` file and add:

```
MONGODB_URI=your_connection_string_here
PORT=3000
```

---

## 📖 Usage

1. Launch the application:

   ```
   npm run dev
   ```

2. Open in browser:

   ```
   http://localhost:3000
   ```

3. Provide inputs:

   * Text
   * Speech
   * Quiz responses

4. System behavior:

   * Runs real-time eye tracking
   * Performs multimodal analysis

5. Output:

   * If dyslexia is detected → Gamified assessment + support tools
   * If not → User marked as non-dyslexic

---

## 🤝 Contributing

Contributions are welcome!

bash
# Fork the repository
# Create a new branch
git checkout -b feature-name

# Commit changes
git commit -m "Add feature"

# Push changes
git push origin feature-name

Then open a Pull Request 🚀

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🙌 Acknowledgements

* EasyOCR for text recognition
* OpenAI Whisper for speech-to-text
* WebGazer.js & OpenCV for eye tracking
* MongoDB Atlas for database support

---

## 💡 Summary

Akshar Mitr is a **powerful, research-backed, multimodal platform** that combines AI and accessibility to **identify and support learners with dyslexia early**, making education more inclusive and effective.

---
