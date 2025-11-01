const API_URL = 'http://localhost:3000'; 

 // JWT 
let authToken = null;


const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');
const registerSection = document.getElementById('registerSection');
const loginSection = document.getElementById('loginSection');
const profileSection = document.getElementById('profileSection');


function showMessage(elementId, message, isSuccess) {
  const messageEl = document.getElementById(elementId);
  messageEl.textContent = message;
  messageEl.className = `message ${isSuccess ? 'success' : 'error'}`;
  

  setTimeout(() => {
    messageEl.textContent = '';
    messageEl.className = 'message';
  }, 5000);
}

// Register user
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('regUsername').value;
  const password = document.getElementById('regPassword').value;
  
  try {
   
    const response = await fetch(`${API_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      showMessage('registerMessage', data.message, true);
      registerForm.reset();
    } else {
      showMessage('registerMessage', data.message, false);
    }
  } catch (error) {
    showMessage('registerMessage', 'Error connecting to server', false);
  }
});

// Login user
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  
  try {
   
    const response = await fetch(`${API_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Store token
      authToken = data.token;
      showMessage('loginMessage', data.message, true);
      loginForm.reset();
      
    
      setTimeout(() => {
        loadProfile();
      }, 1000);
    } else {
      showMessage('loginMessage', data.message, false);
    }
  } catch (error) {
    showMessage('loginMessage', 'Error connecting to server', false);
  }
});


async function loadProfile() {
  if (!authToken) {
    return;
  }
  
  try {
  
    const response = await fetch(`${API_URL}/api/users/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    const data = await response.json();
    
    if (response.ok) {

      registerSection.classList.add('hidden');
      loginSection.classList.add('hidden');
      
     
      profileSection.classList.remove('hidden');
      

      document.getElementById('profileData').innerHTML = `
        <p><strong>Username:</strong> ${data.user.username}</p>
        <p><strong>Token Issued:</strong> ${new Date(data.user.iat * 1000).toLocaleString()}</p>
        <p><strong>Token Expires:</strong> ${new Date(data.user.exp * 1000).toLocaleString()}</p>
        <p style="color: #28a745; margin-top: 15px;">✓ ${data.message}</p>
      `;
    } else {
      alert(data.message);
      logout();
    }
  } catch (error) {
    alert('Error loading profile');
    logout();
  }
}

logoutBtn.addEventListener('click', logout);

function logout() {
  authToken = null;

  registerSection.classList.remove('hidden');
  loginSection.classList.remove('hidden');
  

  profileSection.classList.add('hidden');
  

  registerForm.reset();
  loginForm.reset();
}