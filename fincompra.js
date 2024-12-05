// Cargar items del carrito desde localStorage
function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const itemsContainer = document.getElementById('items-checkout');
    const totalElement = document.getElementById('total-checkout');
    let total = 0;

    itemsContainer.innerHTML = '';
    
    carrito.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'item-carrito';
      itemDiv.innerHTML = `
        <span>${item.nombre}</span>
        <span>$${item.precio}</span>
      `;
      itemsContainer.appendChild(itemDiv);
      total += item.precio;
    });

    totalElement.textContent = total;
  }

  function procesarCompra(event) {
    event.preventDefault();
    
    // Aquí iría la lógica para procesar la compra
    alert('¡Compra procesada con éxito!');
    
    // Limpiar el carrito
    localStorage.removeItem('carrito');
    
    // Redirigir a la página principal
    window.location.href = 'index.html';
  }

  // Cargar el carrito al iniciar la página
  window.onload = cargarCarrito;