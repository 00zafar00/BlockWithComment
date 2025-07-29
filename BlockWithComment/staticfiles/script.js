/* ---- dropdown toggle ---- */
document.getElementById('dd-toggle').addEventListener('click', () => {
  document.querySelector('.dropdown').classList.toggle('open');
});

/* ---- scroll-spy ---- */
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
const sections = document.querySelectorAll('[id^="s"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 60) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});