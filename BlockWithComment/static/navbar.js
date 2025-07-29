// Show/hide mobile menu
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("toggleBtn");
  const navbarMenu = document.getElementById("navbarMenu");

  if (toggleBtn && navbarMenu) {
    toggleBtn.addEventListener("click", function () {
      navbarMenu.classList.toggle("show");
    });
  }

  // Dropdown toggle
  document.querySelectorAll(".dropdown-toggle").forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      const menu = this.nextElementSibling;
      menu.classList.toggle("show");
    });
  });
});

document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.classList.toggle('liked');
        const countEl = this.querySelector('.tweet-action-count');
        if (this.classList.contains('liked')) {
            countEl.textContent = parseInt(countEl.textContent) + 1;
        } else {
            countEl.textContent = parseInt(countEl.textContent) - 1;
        }
    });
});