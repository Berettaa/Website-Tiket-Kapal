// Toggle mobile menu
document.getElementById('menuToggle').addEventListener('click', function() {
    document.querySelector('.nav-menu').classList.toggle('active');
    this.classList.toggle('active');
});

// Agent widget toggle
document.getElementById('agentToggle').addEventListener('click', function() {
    document.getElementById('agentWidget').classList.toggle('active');
});

// Form validation
function validateBookingForm() {
    const fullName = document.getElementById('fullName').value;
    const idNumber = document.getElementById('idNumber').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    if (!fullName || !idNumber || !phone || !email) {
        alert('Semua field harus diisi');
        return false;
    }

    return true;
}

// Update total price when adding passengers
function updateTotalPrice() {
    const basePrice = 150000; // Base ticket price
    const passengerCount = document.querySelectorAll('.passenger-item').length;
    const totalPrice = basePrice * passengerCount;
    
    document.getElementById('passengerCount').textContent = passengerCount;
    document.getElementById('totalPrice').textContent = `Rp ${totalPrice.toLocaleString()}`;
}

// Initialize price on page load
document.addEventListener('DOMContentLoaded', function() {
    updateTotalPrice();
});

// Handle schedule selection
document.querySelectorAll('.book-btn').forEach(button => {
    button.addEventListener('click', function() {
        const scheduleItem = this.closest('.schedule-item');
        const shipName = scheduleItem.querySelector('h3').textContent;
        const departureTime = scheduleItem.querySelector('.departure strong').textContent;
        const price = scheduleItem.querySelector('.price strong').textContent;
        
        // Scroll to booking form
        document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
        
        // You can add logic here to pre-fill the booking form with selected schedule details
    });
});

// Filter schedules based on search
document.querySelector('.search-btn').addEventListener('click', function(e) {
    e.preventDefault();
    const departure = document.getElementById('departure').value;
    const arrival = document.getElementById('arrival').value;
    const date = document.getElementById('departure-date').value;
    
    if (!departure || !arrival || !date) {
        alert('Mohon lengkapi semua field pencarian');
        return;
    }
    
    // Here you would typically make an API call to get matching schedules
    // For now, we'll just scroll to the schedule section
    document.getElementById('schedule').scrollIntoView({ behavior: 'smooth' });
});

// Add active state to nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // Close mobile menu when link is clicked
        if (window.innerWidth <= 992) {
            document.querySelector('.nav-menu').classList.remove('active');
            document.getElementById('menuToggle').classList.remove('active');
        }
    });
});

// Add this new code for route filtering
document.querySelectorAll('.route-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        // Remove active class from all tabs
        document.querySelectorAll('.route-tab').forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        this.classList.add('active');
        
        const route = this.dataset.route;
        const scheduleItems = document.querySelectorAll('.schedule-item');
        
        scheduleItems.forEach(item => {
            if (route === 'all' || item.dataset.route === route) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

function playNotificationSound() {
    const audio = document.getElementById('notificationSound');
    audio.play().catch(function(error) {
        console.error("Error playing notification sound:", error);
    });
}

function confirmPayment() {
    // Logika konfirmasi pembayaran di sini
    playNotificationSound(); // Memutar suara notifikasi
    alert("Pembayaran Anda telah dikonfirmasi!");
}

function playRingingNotification() {
    const audio = document.getElementById('ringingNotification');
    audio.play().catch(function(error) {
        console.error("Error playing ringing notification:", error);
    });
}

function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    if (chatbot.style.display === 'none') {
        chatbot.style.display = 'block';
        playRingingNotification(); // Memutar suara notifikasi saat chatbot dibuka
    } else {
        chatbot.style.display = 'none';
    }
}

document.getElementById('notificationSound').play();
document.getElementById('ringingNotification').play(); 