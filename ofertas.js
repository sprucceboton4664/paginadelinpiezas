let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        
function actualizarContadorCarrito() {
    const contador = document.getElementById('carrito-contador');
    const totalItems = carrito.reduce((total, item) => total + (item.cantidad || 1), 0);
    contador.textContent = totalItems;
}

function actualizarCarritoModal() {
    const carritoItems = document.getElementById('carrito-items');
    const carritoTotal = document.getElementById('carrito-total');
    
    carritoItems.innerHTML = '';
    let total = 0;

    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.gap = '10px';
        li.style.marginBottom = '10px';
        
        // Item name and price
        const itemInfo = document.createElement('span');
        itemInfo.textContent = `${item.nombre} - $${item.precio}`;
        li.appendChild(itemInfo);

        // Quantity controls container
        const quantityControls = document.createElement('div');
        quantityControls.style.display = 'flex';
        quantityControls.style.alignItems = 'center';
        quantityControls.style.gap = '5px';

        // Minus button
        const btnMinus = document.createElement('button');
        btnMinus.textContent = '-';
        btnMinus.style.padding = '2px 8px';
        btnMinus.onclick = () => actualizarCantidad(index, -1);
        
        // Quantity display
        const quantity = document.createElement('span');
        quantity.textContent = item.cantidad;
        quantity.style.margin = '0 5px';
        
        // Plus button
        const btnPlus = document.createElement('button');
        btnPlus.textContent = '+';
        btnPlus.style.padding = '2px 8px';
        btnPlus.onclick = () => actualizarCantidad(index, 1);
        
        // Delete button
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.onclick = () => eliminarDelCarrito(index);

        // Add all controls
        quantityControls.appendChild(btnMinus);
        quantityControls.appendChild(quantity);
        quantityControls.appendChild(btnPlus);
        quantityControls.appendChild(btnEliminar);
        
        li.appendChild(quantityControls);
        carritoItems.appendChild(li);
        
        total += item.precio * item.cantidad;
    });

    carritoTotal.textContent = total.toFixed(2);
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function actualizarCantidad(index, change) {
    if (!carrito[index].cantidad) {
        carrito[index].cantidad = 1;
    }
    
    carrito[index].cantidad += change;
    
    if (carrito[index].cantidad < 1) {
        carrito[index].cantidad = 1;
    }
    
    actualizarCarritoModal();
}

function agregarAlCarrito(id, nombre, precio) {
    // Check if product already exists in cart
    const existingItemIndex = carrito.findIndex(item => item.id === id);
    
    if (existingItemIndex !== -1) {
        // If product exists, increment quantity
        carrito[existingItemIndex].cantidad++;
    } else {
        // If product doesn't exist, add it with quantity 1
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }
    
    actualizarContadorCarrito();
    actualizarCarritoModal();
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarContadorCarrito();
    actualizarCarritoModal();
}

function mostrarCarrito() {
    const modal = document.getElementById('carritoModal');
    modal.style.display = 'block';
    actualizarCarritoModal();
}

function cerrarCarrito() {
    const modal = document.getElementById('carritoModal');
    modal.style.display = 'none';
}

function irACheckout() {
    window.location.href = 'checkout.html';
}

document.querySelectorAll('.filter-buttons button').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        document.querySelectorAll('.filter-buttons button').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        document.querySelectorAll('.producto').forEach(producto => {
            if (filter === 'all' || producto.getAttribute('data-category') === filter) {
                producto.style.display = 'block';
            } else {
                producto.style.display = 'none';
            }
        });
    });
});

function iniciarContadores() {
    const productos = document.querySelectorAll('.producto');
    productos.forEach(producto => {
        let horasTotal = 8;
        const category = producto.getAttribute('data-category');
        
        switch(category) {
            case 'liquidacion':
                horasTotal = 8;
                break;
            case 'descuento':
                horasTotal = 16;
                break;
            case '2x1':
                horasTotal = 4;
                break;
            default:
                horasTotal = 12;
        }

        // Create countdown element after the price
        if (!producto.querySelector('.countdown')) {
            const countdownDiv = document.createElement('div');
            countdownDiv.className = 'countdown';
            
            // Insert countdown after the price in both front and back
            const frontPrice = producto.querySelector('.producto-front .precio').parentElement;
            const backPrice = producto.querySelector('.producto-back .precio').parentElement;
            
            frontPrice.insertAdjacentElement('afterend', countdownDiv.cloneNode(true));
            backPrice.insertAdjacentElement('afterend', countdownDiv);
        }

        // Set end time
        const endTime = new Date();
        endTime.setHours(endTime.getHours() + horasTotal);

        // Update countdown
        const countdownElement = producto.querySelector('.countdown');

        function actualizarContador() {
            const ahora = new Date();
            const diferencia = endTime - ahora;

            if (diferencia <= 0) {
                countdownElement.innerHTML = "¡Oferta terminada!";
                return;
            }

            const horas = Math.floor(diferencia / (1000 * 60 * 60));
            const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `${horas}h ${minutos}m ${segundos}s`;
        }

        actualizarContador();
        setInterval(actualizarContador, 1000);
    });
}

// Initialize counters when page loads
document.addEventListener('DOMContentLoaded', iniciarContadores);

actualizarContadorCarrito();