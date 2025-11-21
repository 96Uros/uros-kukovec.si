document.addEventListener('DOMContentLoaded', function() {
    // Check if there's a success message
    const successMessage = document.querySelector('.message.success');
    
    if (successMessage) {
        // Show custom notification
        showNotification();
    }
});

function showNotification() {
    // Create notification overlay
    const overlay = document.createElement('div');
    overlay.className = 'notification-overlay';
    
    // Create notification box
    const notification = document.createElement('div');
    notification.className = 'notification-box';
    
    // Create notification content
    const content = document.createElement('div');
    content.className = 'notification-content';
    content.innerHTML = `
        <h2>HVALA ZA VAŠE POVPRAŠEVANJE</h2>
        <p>SE SLIŠIMO V NAJKRAJŠEM MOŽNEM ČASU.</p>
        <p class="signature">LP UROŠ</p>
        <button class="notification-close-btn">Zapri</button>
    `;
    
    notification.appendChild(content);
    overlay.appendChild(notification);
    document.body.appendChild(overlay);
    
    // Animate in
    setTimeout(() => {
        overlay.classList.add('show');
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close-btn');
    closeBtn.addEventListener('click', function() {
        closeNotification(overlay);
    });
    
    // Close on overlay click
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeNotification(overlay);
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('show')) {
            closeNotification(overlay);
        }
    });
}

function closeNotification(overlay) {
    overlay.classList.remove('show');
    setTimeout(() => {
        if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
        }
    }, 300);
}

