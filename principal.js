document.addEventListener("DOMContentLoaded", () => {
    const menuLinks = document.querySelectorAll(".menu a");
    const currentPath = window.location.pathname;

    // Marcar el enlace activo
    menuLinks.forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
        }
    });

    const cart = [];
    const addToCartButtons = document.querySelectorAll(".btn");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            // Si el botón pertenece a un producto, manejar el carrito
            const productCard = button.closest(".product-card");
            if (productCard) {
                e.preventDefault(); // Prevenir comportamiento por defecto solo si es un producto

                const productName = productCard.querySelector("h3").innerText;
                const productPrice = productCard.querySelector(".price").innerText;

                cart.push({ name: productName, price: productPrice });

                updateCartIndicator();
                alert(`${productName} añadido al carrito.`);
            }
        });
    });

    const updateCartIndicator = () => {
        const cartIndicator = document.querySelector(".menu a[href='carrito.html']");
        if (!cartIndicator) return;

        cartIndicator.textContent = `🛒 Carrito (${cart.length})`;
    };

    const myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
        backdrop: 'static',
        keyboard: false
    });
    myModal.show();

    // Carrusel
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    let currentSlide = 0;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlide = (n + slides.length) % slides.length;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Event listeners for carousel
    next.addEventListener('click', nextSlide);
    prev.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Auto advance slides
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause auto-advance on hover
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
        carousel.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
});
let carritoOfertas = [];

function agregarOfertaAlCarrito(id, nombre, precio) {
  const oferta = { id, nombre, precio };
  carritoOfertas.push(oferta);
  alert(`${nombre} ha sido añadido al carrito por $${precio}.`);
}
function iniciarContador(idContador, idBoton, duracionHoras) {
    const finOferta = new Date().getTime() + duracionHoras * 60 * 60 * 1000;
  
    function actualizarContador() {
      const ahora = new Date().getTime();
      const diferencia = finOferta - ahora;
  
      if (diferencia <= 0) {
        document.getElementById(idContador).innerText = "Oferta Expirada";
        document.getElementById(idBoton).disabled = true;
        return;
      }
  
      const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
  
      document.getElementById(idContador).innerText = `Tiempo restante: ${horas}h ${minutos}m ${segundos}s`;
    }
  
    actualizarContador();
    setInterval(actualizarContador, 1000);
  }
  
  // Inicializar el contador para la primera oferta (24 horas)
  iniciarContador("contador-oferta-1", "boton-oferta-1", 24);
  
  // Seleccionar el botón y el mensaje
  const loginButton = document.getElementById('loginButton');
  const message = document.getElementById('message');

  // Agregar evento de clic al botón
  loginButton.addEventListener('click', () => {
      // Mostrar el mensaje
      message.style.display = 'block';
  });