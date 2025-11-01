// Register
document.addEventListener('DOMContentLoaded', function () {
  // REGISTER HANDLER
  const regForm = document.getElementById('registerForm');
  if (regForm) {
    regForm.addEventListener('submit', async function(e){
      e.preventDefault();
      const email = document.getElementById('regEmail').value;
      const password = document.getElementById('regPassword').value;
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      document.getElementById('registerMsg').textContent = data.message || data.error;
      if (data.message) { setTimeout(() => { window.location = 'index.html'; }, 1200); }
    });
  }

  // LOGIN HANDLER
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async function(e){
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        window.location = 'dashboard.html';
      } else {
        document.getElementById('loginMsg').textContent = data.error;
      }
    });
  }

  // DASHBOARD HANDLER
  if (window.location.pathname.endsWith('dashboard.html')) {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location = 'index.html';
      return;
    }
    fetch('/api/users/dashboard', {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    }).then(res => res.json()).then(data => {
      if (data.message) {
        document.getElementById('dashboardMsg').textContent = data.message;
      } else {
        document.getElementById('dashboardMsg').textContent = 'Please login again';
        localStorage.removeItem('token');
        setTimeout(() => { window.location = 'index.html'; }, 1200);
      }
    });
  }
});

function logout() {
  localStorage.removeItem('token');
  window.location = 'index.html';
}
