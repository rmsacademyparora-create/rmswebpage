const form = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const message = document.getElementById('message');
const dashboard = document.getElementById('dashboard');
const loggedInUser = document.getElementById('loggedInUser');
const logoutBtn = document.getElementById('logoutBtn');
const togglePassword = document.getElementById('togglePassword');

const DEMO_USERNAME = 'admin';
const DEMO_PASSWORD = 'admin123';

form.addEventListener('submit', (event) => {
  event.preventDefault();
  message.textContent = '';

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (!username || !password) {
    message.textContent = 'Please enter username and password.';
    return;
  }

  if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
    loggedInUser.textContent = username;
    form.classList.add('hidden');
    dashboard.classList.remove('hidden');
    localStorage.setItem('loginUser', username);
  } else {
    message.textContent = 'Invalid username or password.';
  }
});

togglePassword.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  togglePassword.textContent = isPassword ? 'Hide' : 'Show';
  togglePassword.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
});

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('loginUser');
  dashboard.classList.add('hidden');
  form.classList.remove('hidden');
  form.reset();
  message.textContent = '';
});

const savedUser = localStorage.getItem('loginUser');
if (savedUser) {
  loggedInUser.textContent = savedUser;
  form.classList.add('hidden');
  dashboard.classList.remove('hidden');
}
