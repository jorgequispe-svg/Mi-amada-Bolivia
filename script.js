document.addEventListener('DOMContentLoaded', function () {

  // ▼▼▼ Menú hamburguesa ▼▼▼
  const hamburger = document.querySelector('.hamburger');
  const deptoNav = document.querySelector('nav.grid-deptos');
  const overlay = document.getElementById('overlay');

  if (hamburger && deptoNav && overlay) {
    hamburger.addEventListener('click', function () {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      
      deptoNav.classList.toggle('show');
      overlay.classList.toggle('show');

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

    overlay.addEventListener('click', function () {
      closeMenu();
    });

    document.querySelectorAll('nav.grid-deptos a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    function closeMenu() {
      deptoNav.classList.remove('show');
      overlay.classList.remove('show');
      hamburger.setAttribute('aria-expanded', 'false');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = 'rotate(0) translate(0, 0)';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'rotate(0) translate(0, 0)';
    }
  }

  // ▼▼▼ Modal de comentario ▼▼▼
  const btnAbrirComentario = document.getElementById('btnAbrirComentario');
  const modal = document.getElementById('modalComentario');
  const closeModal = document.querySelector('.close');
  const formularioComentario = document.getElementById('formularioComentario');
  const listaComentarios = document.getElementById('listaComentarios');

  if (btnAbrirComentario && modal && closeModal && formularioComentario && listaComentarios) {

    // Abrir modal
    btnAbrirComentario.addEventListener('click', function () {
      modal.style.display = 'flex';
    });

    // Cerrar modal
    closeModal.addEventListener('click', function () {
      modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });

    // Enviar comentario
    formularioComentario.addEventListener('submit', function (e) {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value.trim();
      const opinion = document.getElementById('opinion').value.trim();

      if (!nombre || !opinion) {
        alert('Por favor, completa todos los campos.');
        return;
      }

      const fecha = new Date().toLocaleString();
      const nuevoComentario = {
        nombre,
        opinion,
        fecha
      };

      // Guardar en localStorage
      let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
      comentarios.push(nuevoComentario);
      localStorage.setItem('comentarios', JSON.stringify(comentarios));

      // Limpiar formulario
      document.getElementById('nombre').value = '';
      document.getElementById('opinion').value = '';

      // Cerrar modal
      modal.style.display = 'none';

      // Actualizar lista
      mostrarComentarios();
    });
  }

  // ▼▼▼ Mostrar comentarios almacenados ▼▼▼
  function mostrarComentarios() {
    const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];

    if (comentarios.length === 0) {
      listaComentarios.innerHTML = '<p class="sin-comentarios">¡Sé el primero en dejar un comentario!</p>';
      return;
    }

    listaComentarios.innerHTML = '';

    comentarios.forEach(comentario => {
      const div = document.createElement('div');
      div.className = 'comentario-item';
      div.innerHTML = `
        <div class="nombre">${comentario.nombre}</div>
        <div class="fecha">${comentario.fecha}</div>
        <div class="texto">${comentario.opinion}</div>
      `;
      listaComentarios.appendChild(div);
    });
  }

  // Cargar comentarios al iniciar
  mostrarComentarios();

  // ▼▼▼ Scroll suave al hacer clic en enlaces internos ▼▼▼
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });

});