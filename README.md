# uros-kukovec.si

Flask web app for a contact form that sends inquiry emails through Gmail SMTP.

## Features

- Serves the main page with `Flask`
- Accepts contact form submissions
- Validates required fields
- Sends inquiry emails to the site owner via Gmail SMTP
- Uses flash messages for success and error feedback

## Requirements

- Python 3.9+
- A Gmail account with an App Password enabled

## Setup

1. Create and activate a virtual environment:

   - Windows (PowerShell):
     - `python -m venv .venv`
     - `.venv\Scripts\Activate.ps1`

2. Install dependencies:

   - `pip install flask python-dotenv`

3. Create a `.env` file in the project root:

   - `SECRET_KEY=replace-with-a-random-secret`
   - `GMAIL_APP_PASSWORD=your-gmail-app-password`

## Run locally

- Start the app:
  - `python main.py`
- Open:
  - [http://127.0.0.1:5000](http://127.0.0.1:5000)

## Configuration notes

- The sender email is currently hardcoded in `main.py` as `kukovec.uros96@gmail.com`.
- `GMAIL_APP_PASSWORD` must be set, or email sending will fail with a user-facing error message.
- `SECRET_KEY` should be changed from the default in production.

## Production notes

- Disable debug mode before production deployment.
- Use environment variables for all sensitive values.
