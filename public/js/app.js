// Esperar a que el documento HTML esté completamente cargado y listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll) para animaciones al hacer scroll
    AOS.init({
        duration: 800,    // Duración de la animación en milisegundos
        easing: 'ease',   // Tipo de transición suave
        once: true       // La animación ocurre solo una vez al hacer scroll
    });

    // Seleccionar la barra de navegación (navbar) del documento
    const navbar = document.querySelector('.navbar');
    
    // Escuchar el evento 'scroll' para detectar cuando el usuario se desplaza hacia abajo
    window.addEventListener('scroll', function() {
        // Si el scroll vertical es mayor a 50 píxeles
        if (window.scrollY > 50) {
            // Agregar la clase 'scrolled' para cambiar el estilo del navbar (ejemplo: fondo, sombra)
            navbar.classList.add('scrolled');
        } else {
            // Si el scroll es menor o igual a 50, quitar la clase 'scrolled'
            navbar.classList.remove('scrolled');
        }
    }); // Fin del event listener para scroll

}); // Fin del event listener DOMContentLoaded para inicialización general


// ----------------- Script específico para la página de contacto -----------------

// Esperar a que el documento esté listo para manipular el formulario de contacto
document.addEventListener('DOMContentLoaded', function () {
    // Obtener el formulario de contacto por su ID
    const contactForm = document.getElementById('contact-form');

    // Verificar que el formulario exista en la página (por si se usa el script en otras páginas)
    if (contactForm) {
        // Escuchar el evento 'submit' cuando el usuario envíe el formulario
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Evitar que el formulario se envíe y recargue la página automáticamente

            // Obtener los valores ingresados en cada campo del formulario
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Aquí podrías agregar código para enviar estos datos a un servidor (API, backend, etc.)
            // Por ahora, solo mostraremos un mensaje de confirmación en la página

            // Crear un nuevo div para mostrar la alerta de éxito
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert alert-success alert-dismissible fade show mt-3'; // Clases de Bootstrap para estilos y animación
            alertDiv.role = 'alert'; // Atributo para accesibilidad

            // Insertar el mensaje personalizado dentro del div alerta
            alertDiv.innerHTML = `
                <strong>¡Gracias ${name}!</strong> Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo pronto.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;

            // Insertar la alerta justo antes del formulario en el DOM
            contactForm.parentNode.insertBefore(alertDiv, contactForm);

            // Reiniciar el formulario para limpiar los campos después de enviar
            contactForm.reset();

            // Programar que la alerta desaparezca automáticamente después de 5 segundos (5000 ms)
            setTimeout(function () {
                alertDiv.remove();
            }, 5000);
        }); // Fin del event listener submit
    } // Fin del if que verifica existencia del formulario
}); // Fin del event listener DOMContentLoaded para formulario de contacto
