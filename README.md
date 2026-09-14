# Eva - Enhanced Voice Assistant

Eva is a web-based voice assistant built with **Flask, HTML, and CSS**, packaged with **Docker**. It uses the browser's Web Speech API for voice recognition and synthesis, and integrates with Wikipedia to answer questions dynamically.

## Features

- **Voice Recognition**: Uses the browser's native Web Speech API to listen to user commands.
- **Voice Synthesis**: Responds to you audibly with a text-to-speech engine.
- **Dynamic Web Scraping**: Integrates the `wikipedia` library to fetch summaries of topics if Eva doesn't have a hardcoded response.
- **Modern UI**: A clean, dark-mode focused interface with a cool interactive audio wave animation that reacts to listening/speaking states.

## Tech Stack

- **Backend**: Python, Flask
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (Web Speech API)
- **Data Scraping**: Wikipedia Python API
- **Containerization**: Docker

## Project Structure

```text
Eva-Assistant/
├── app.py                  # Main Flask application entry point
├── command_handler.py      # Logic for parsing and responding to voice commands
├── scraper.py              # Wikipedia integration for answering questions
├── requirements.txt        # Python dependencies
├── Dockerfile              # Container image definition
├── .dockerignore           # Files excluded from the Docker build context
├── static/
│   ├── script.js           # Frontend logic (Speech Recognition & Synthesis)
│   └── style.css           # Styling and animations
└── templates/
    └── index.html          # Main application interface
```

## Getting Started

### Prerequisites

- Python 3.8+
- A modern web browser that supports the Web Speech API (Google Chrome or Microsoft Edge recommended).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/HBJ17/Oasis_Infobyte_python_internship.git
   cd Oasis_Infobyte_python_internship/Eva-Assistant
   ```

2. **Install the dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Application:**
   ```bash
   python app.py
   ```

4. **Open in Browser:**
   Navigate to `http://127.0.0.1:5000` in your web browser.

### Running with Docker

1. **Build the image:**
   ```bash
   cd Eva-Assistant
   docker build -t eva-assistant .
   ```

2. **Run the container:**
   ```bash
   docker run -p 5000:5000 eva-assistant
   ```

3. **Open in Browser:**
   Navigate to `http://127.0.0.1:5000` in your web browser.

## Usage

1. Click the microphone button to wake Eva up.
2. Ask questions like:
   - "Hello" or "Hi Eva"
   - "What time is it?"
   - "What is today's date?"
   - "Who is Albert Einstein?" (Will trigger the Wikipedia search)
3. Eva will process your command, display the result in the chat log, and speak the answer out loud.
