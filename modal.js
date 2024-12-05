document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    // Registro
    registerBtn.addEventListener('click', () => {
        container.classList.add("active");
    });

    // Inicio de sesión
    loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
    });
});
