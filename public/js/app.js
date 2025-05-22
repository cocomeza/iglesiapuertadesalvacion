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


