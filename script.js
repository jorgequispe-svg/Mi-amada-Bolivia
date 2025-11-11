document.addEventListener('DOMContentLoaded', function () {
  // ▼▼▼ Botón de comentario ▼▼▼
  const btnComentario = document.getElementById('btnComentario');
  if (btnComentario) {
    btnComentario.addEventListener('click', function () {
      alert('¡Deja un comentario sobre la página!');
    });
  }

  // ▼▼▼ Menú hamburguesa ▼▼▼
  const hamburger = document.querySelector('.hamburger');
  const deptoNav = document.querySelector('nav.grid-deptos');
  const overlay = document.getElementById('overlay');

  // Si algún elemento no existe, salimos
  if (!hamburger || !deptoNav || !overlay) return;

  // Abrir/cerrar menú
  hamburger.addEventListener('click', function () {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    
    deptoNav.classList.toggle('show');
    overlay.classList.toggle('show');

    // Animación: hamburguesa → ×
    const spans = this.querySelectorAll('span');
    if (!isExpanded) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'rotate(0) translate(0, 0)';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'rotate(0) translate(0, 0)';
    }
  });

  // Cerrar menú al hacer clic en overlay
  overlay.addEventListener('click', function () {
    closeMenu();
  });

  // Cerrar menú al hacer clic en cualquier enlace del menú
  document.querySelectorAll('nav.grid-deptos a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Función para cerrar menú
  function closeMenu() {
    deptoNav.classList.remove('show');
    overlay.classList.remove('show');
    hamburger.setAttribute('aria-expanded', 'false');
    
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = 'rotate(0) translate(0, 0)';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'rotate(0) translate(0, 0)';
  }
});