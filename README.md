![System Diagram](docs/architecture.png)

## 📄 Google Apps Script Integration

This project connects a Google Form or Sheet to your local Flask app.

When a user submits a form:
- `Code.gs` captures the form data to google sheet and adjusts font size, and sends new clients to email provided.
- `sendFormtoPrinter.gs` It sends a POST request to your Flask app running on your local machine

### 🌐 Connecting Google Script to Flask

Because Google Apps Script is cloud-based, it **cannot access your local network IP** like `http://192.168.x.x`.

You **must use [ngrok](https://ngrok.com/)** to expose your Flask server to the internet.

#### 🛠️ How to Use ngrok:

1. Start Flask with:
   ```bash
   python app/app.py --host=0.0.0.0
