const API_BASE_URL = window.API_BASE_URL || '';
const form = document.getElementById('loginForm');
const statusBox = document.getElementById('status');
const dashboard = document.getElementById('dashboard');
const userName = document.getElementById('userName');
const userRole = document.getElementById('userRole');
const apiStatus = document.getElementById('apiStatus');
const logout = document.getElementById('logout');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  statusBox.textContent = '';
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');

    localStorage.setItem('rmsToken', data.token);
    userName.textContent = data.user.name;
    userRole.textContent = data.user.role;
    apiStatus.textContent = 'Connected';
    form.classList.add('hidden');
    dashboard.classList.remove('hidden');
  } catch (error) {
    apiStatus.textContent = 'Offline';
    statusBox.textContent = error.message || 'Backend is not running.';
  }
});

logout.addEventListener('click', () => {
  localStorage.removeItem('rmsToken');
  dashboard.classList.add('hidden');
  form.classList.remove('hidden');
  form.reset();
  statusBox.textContent = '';
});
