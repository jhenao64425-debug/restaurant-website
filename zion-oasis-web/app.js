// Zion Oasis - Restaurant Website
// Backend API Integration

const BACKEND_URL = 'https://restaurant-backend-mngd.onrender.com';

// Handle reservation form submission
async function handleReservationSubmit(event) {
  event.preventDefault();

  // Get form values
  const name = document.getElementById('name')?.value.trim();
  const phone = document.getElementById('phone')?.value.trim();
  const date = document.getElementById('date')?.value;
  const time = document.getElementById('time')?.value;
  const guests = document.getElementById('guests')?.value;
  const seating = document.getElementById('seating')?.value || '';
  const occasion = document.getElementById('occasion')?.value || '';
  const message = document.getElementById('message')?.value.trim();

  // Validate
  if (!name || !phone || !date || !time || !guests) {
    alert('Please fill in all required fields');
    return;
  }

  // Show loading state
  const submitBtn = document.querySelector('[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  try {
    // Send to backend API
    const response = await fetch(`${BACKEND_URL}/api/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: name,
        email: '',
        telefono: phone,
        fecha: date,
        hora: time,
        huespedes: parseInt(guests),
        notas: `Seating: ${seating}, Occasion: ${occasion}${message ? ', ' + message : ''}`
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();
    console.log('Reservation created:', result);

    // Show success modal
    showSuccessModal();

    // Reset form
    document.getElementById('reserveForm').reset();
  } catch (error) {
    console.error('Error creating reservation:', error);
    alert(`Error: ${error.message}. Please try again or call +356 2163 3397`);
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
}

// Show success modal
function showSuccessModal() {
  const modal = document.getElementById('reserve-success');
  if (modal) {
    modal.classList.add('active');
    setTimeout(() => {
      modal.classList.remove('active');
    }, 4000);
  }
}

// Navigation and animations
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      mobileMenu?.classList.toggle('active');
    });
  }

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu?.classList.remove('active');
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Hide preloader
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.pointerEvents = 'none';
      }, 500);
    }
  });
});

console.log('Zion Oasis app loaded - Backend:', BACKEND_URL);
