const toggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  toggle.textContent = '☀️';
}

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const darkMode = document.body.classList.contains('dark');
  toggle.textContent = darkMode ? '☀️' : '🌙';
  localStorage.setItem('theme', darkMode ? 'dark' : 'light');
});
