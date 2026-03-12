A Dyslexia Detection & Support Platform

Akshar Mitr is an accessibility-focused web application designed to detect early signs of dyslexia and provide supportive tools for learners. It integrates OCR, speech recognition, eye tracking, handwriting analysis, and quizzes into a unified system, with gamified assessments and reading support for detected cases.

🌟 Features
OCR Recognition: Extracts text features using EasyOCR.

Speech Recognition: Converts spoken input into text using OpenAI Whisper.

Eye Tracking: Monitors eye movement patterns with WebGazer.js and OpenCV.

Handwriting Analysis: Processes handwriting logs for deeper detection.

Interactive Quiz: Provides cognitive and reading-based assessments.

Gamified Assessment: Engages learners with interactive tasks if dyslexia is detected.

Reading Support Tool: Offers personalized assistance for learners with dyslexia.

📚 Research & Publications
We are proud to share that Akshar Mitra: A Multimodal Integrated Framework for Early Dyslexia Detection has been published in the SCIE journal Digital Health.

This work presents Akshar Mitra, an integrated multimodal framework aimed at enabling early detection of dyslexia through OCR, speech recognition, eye tracking, handwriting analysis, and gamified assessments.

Authors: Rashi Sahu, Manya Sharma, Radhika Babar, Vibha Tiwari, Rebekah Geddam, Muhammad Awais, Hemant Ghayvat,Ocean Agarwal

🔗https://lnkd.in/eDMfgyYP

⚙️Tech Stack
Frontend: React.js (components, pages, assets)

Backend: Node.js / Express (Auth, APIs) + Python services

Database: MongoDB Atlas

AI/ML Tools: EasyOCR, OpenAI Whisper, WebGazer.js, OpenCV

Deployment: GitHub + Cloud Hosting

📂Project Structure
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
 Backend
 Backend/
 ├── models/
 │   ├── Eye_track/
 │   │   ├── logs/
 │   │   │   ├── eye_logs.csv
 │   │   │   ├── app.py
 │   │   │   └── ...
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
 Images:
  ![Aksahr-home](https://github.com/user-attachments/assets/d05d4308-4cb5-458e-a1e1-8c492f41e8ab)
  ![eye-screening](https://github.com/user-attachments/assets/2ce5b4e7-1645-4481-93c4-07b1f9358e98)
  ![handwriting](https://github.com/user-attachments/assets/42ee95e2-fe78-490d-a7ab-8c81dec1ebf0)
  ![Quiz](https://github.com/user-attachments/assets/8ea4a16f-f58f-4ae5-89ea-bcee54168375)
  ![![memory-game](https://github.com/user-attachments/assets/eeea3757-b4cb-445a-96d7-eee7c230b030)
 ![reading-support](https://github.com/user-attachments/assets/c16f371b-360a-4894-8e5b-4e3837bbb079)


📝Installation
git clone https://github.com/rashi125/Akshar.git
cd Akshar
Install dependencies:
npm install
Run the development server:
npm run dev
pip install -r requirements.txt
python main.py
⚙️ Configuration
MONGODB_URI=your_connection_string_here
PORT=3000

📖 Usage
Launch the app locally with npm run dev.

Access at http://localhost:3000.

Input text, speech, or take quizzes.

Eye-tracking runs in real-time for deeper analysis.

If dyslexia is detected → Gamified assessment + reading support tools.

If not detected → User is marked free from dyslexia.

🤝 Contributing
Contributions are welcome!

Fork the repo

Create a branch (git checkout -b feature-name)

Commit changes (git commit -m "Add feature")

Push (git push origin feature-name)

Open a Pull Request

📜 License
This project is licensed under the MIT License.

🙌 Acknowledgements
EasyOCR for text recognition

OpenAI Whisper for speech-to-text

WebGazer.js & OpenCV for eye-tracking integration

MongoDB Atlas for cloud database support




