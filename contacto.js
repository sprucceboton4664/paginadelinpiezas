let carrito = [];

function actualizarCarrito() {
    const carritoBtn = document.getElementById('carrito-btn');
    carritoBtn.textContent = `🛒 Carrito (${carrito.length})`;
    actualizarModalCarrito();
    localStorage.setItem('carritoLimpiaMax', JSON.stringify(carrito));
}

function actualizarModalCarrito() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (carrito.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">El carrito está vacío</div>';
        cartTotal.textContent = '0.00';
        return;
    }

    let total = 0;
    cartItems.innerHTML = carrito.map(item => {
        total += parseFloat(item.price);
        return `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>${item.price} Bs</span>
                <button onclick="eliminarDelCarrito(${item.id})" class="btn">Eliminar</button>
            </div>
        `;
    }).join('');

    cartTotal.textContent = total.toFixed(2);
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    localStorage.setItem('carritoLimpiaMax', JSON.stringify(carrito));
    window.location.href = 'fincompra.html';
}

function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    alert('Mensaje enviado con éxito. Nos pondremos en contacto contigo pronto.');
    event.target.reset();
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('cart-modal');
    const carritoBtn = document.getElementById('carrito-btn');
    const closeBtn = document.querySelector('.close-modal');

    const savedCart = localStorage.getItem('carritoLimpiaMax');
    if (savedCart) {
        carrito = JSON.parse(savedCart);
        actualizarCarrito();
    }

    carritoBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        actualizarModalCarrito();
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 12 
    });
}

document.getElementById('deliveryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const toast = new bootstrap.Toast(document.createElement('div'));
    toast.show();
    alert('¡Pedido recibido! Te contactaremos pronto.');
});

window.onload = initMap;