from flask import Flask, render_template, request, flash, redirect, url_for
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder='assets', static_url_path='/assets')
app.secret_key = os.getenv('SECRET_KEY', 'your-secret-key-here')

# Email configuration (Gmail)
SENDER_EMAIL = 'kukovec.uros96@gmail.com'
SENDER_PASSWORD = os.getenv('GMAIL_APP_PASSWORD')
SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Get form data
        ime_priimek = request.form.get('ime_priimek', '').strip()
        email = request.form.get('email', '').strip()
        telefonska = request.form.get('telefonska', '').strip()
        naslov = request.form.get('naslov', '').strip()
        podrobnosti = request.form.get('podrobnosti', '').strip()
        
        # Validation
        if not ime_priimek:
            flash('Ime in priimek sta obvezna polja.', 'error')
            return redirect(url_for('index'))
        
        if not email:
            flash('Email je obvezno polje.', 'error')
            return redirect(url_for('index'))
        
        if not telefonska:
            flash('Telefonska številka je obvezno polje.', 'error')
            return redirect(url_for('index'))
        
        if not naslov:
            flash('Naslov je obvezno polje.', 'error')
            return redirect(url_for('index'))
        
        if not podrobnosti:
            flash('Podrobnosti so obvezno polje.', 'error')
            return redirect(url_for('index'))
        
        # Send email
        try:
            if not SENDER_PASSWORD:
                flash('Email konfiguracija ni nastavljena. Prosimo, kontaktirajte administratorja.', 'error')
                return redirect(url_for('index'))
            
            # Create email message
            msg = MIMEMultipart()
            msg['From'] = SENDER_EMAIL
            msg['To'] = SENDER_EMAIL
            msg['Reply-To'] = email
            msg['Subject'] = f'Nova sporočila od: {ime_priimek}'
            
            # Email body
            body = f"""
POVPRAŠEVANJE PREKO SPLATNE STRANI:

Ime in priimek: {ime_priimek}
Email: {email}
Telefonska številka: {telefonska}
Naslov: {naslov}
Podrobnosti:
{podrobnosti}
"""
            msg.attach(MIMEText(body, 'plain', 'utf-8'))
            
            # Send email
            server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
            server.starttls()
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.send_message(msg)
            server.quit()
            
            flash('Sporočilo je bilo uspešno poslano!', 'success')
            return redirect(url_for('index'))
            
        except Exception as e:
            flash(f'Napaka pri pošiljanju sporočila: {str(e)}', 'error')
            return redirect(url_for('index'))
    
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)

