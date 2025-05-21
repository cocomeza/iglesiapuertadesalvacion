// Obtener el elemento <select> donde se mostrarán los libros
const libroSelect = document.getElementById('libro');
// Obtener el contenedor donde se mostrará el texto del libro seleccionado
const resultadoDiv = document.getElementById('resultado');

// Lista de libros de la Biblia organizados por categorías
const libros = [
  // Pentateuco
  "genesis",
  "exodo",
  "levitico",
  "numeros",
  "deuteronomio",

  // Libros históricos
  "josue",
  "jueces",
  "rut",
  "1_samuel",
  "2_samuel",
  "1_reyes",
  "2_reyes",
  "1_cronicas",
  "2_cronicas",
  "esdras",
  "nehemias",
  "ester",

  // Libros poéticos y sapienciales
  "job",
  "salmos",
  "proverbios",
  "ecclesiastes",
  "cantares",

  // Profetas mayores y menores
  "isaias",
  "jeremias",
  "lamentaciones",
  "ezequiel",
  "daniel",
  "oseas",
  "joel",
  "amos",
  "abdias",
  "jonas",
  "miqueas",
  "nahum",
  "habacuc",
  "sofonias",
  "hageo",
  "zacarias",
  "malaquias",

  // Nuevo Testamento
  // Evangelios
  "mateo",
  "marcos",
  "lucas",
  "juan",

  // Historia
  "hechos",

  // Cartas de Pablo
  "romanos",
  "1_corintios",
  "2_corintios",
  "galatas",
  "efesios",
  "filipenses",
  "colosenses",
  "1_tesalonicenses",
  "2_tesalonicenses",
  "1_timoteo",
  "2_timoteo",
  "tito",
  "filemon",

  // Otras cartas y Apocalipsis
  "hebreos",
  "santiago",
  "1_pedro",
  "2_pedro",
  "1_juan",
  "2_juan",
  "3_juan",
  "judas",
  "apocalipsis"
];

// Función para cargar los libros en el <select> de la página
function cargarLibros() {
  libros.forEach(libro => {
    // Crear un elemento <option> para cada libro
    const option = document.createElement('option');
    option.value = libro; // Valor que se usará para cargar el archivo de texto
    // Mostrar el nombre con la primera letra en mayúscula
    option.textContent = libro.charAt(0).toUpperCase() + libro.slice(1);
    // Agregar la opción al <select>
    libroSelect.appendChild(option);
  });
}

// Función para mostrar una animación de carga mientras se obtiene el texto
function mostrarCargando() {
  resultadoDiv.innerHTML = `
    <div class="text-center my-5">
      <div class="spinner-border text-primary" role="status"></div>
      <div>Cargando texto...</div>
    </div>
  `;
}

// Función para cargar y mostrar el contenido del libro seleccionado
function mostrarLibro() {
  const libro = libroSelect.value; // Obtener el libro seleccionado
  if (!libro) return; // Si no hay libro seleccionado, salir de la función
  const archivo = `biblia/${libro}.txt`; // Ruta del archivo de texto del libro

  mostrarCargando(); // Mostrar animación de carga

  // Usar fetch para obtener el archivo de texto
  fetch(archivo)
    .then(res => {
      if (!res.ok) throw new Error("Archivo no encontrado"); // Manejar error si no existe el archivo
      return res.text(); // Obtener el contenido como texto
    })
    .then(texto => {
      // Mostrar el título del libro en mayúsculas
      resultadoDiv.innerHTML = `<h3 class="mb-3 text-center">${libro.toUpperCase()}</h3>`;
      // Agregar el texto formateado (versículos)
      resultadoDiv.innerHTML += formatearBiblia(texto);
      actualizarFuente(); // Aplicar el tamaño de fuente actual
    })
    .catch(err => {
      // Mostrar mensaje de error si falla la carga
      resultadoDiv.innerHTML = `<div class="alert alert-danger">Error: ${err.message}</div>`;
    });
}

// Función para formatear el texto de la Biblia para mejor lectura
function formatearBiblia(texto) {
  // Se asume que cada línea es un versículo con formato "1:1 En el principio..."
  const lineas = texto.split('\n').filter(l => l.trim() !== ""); // Dividir por líneas y eliminar líneas vacías
  let html = '<div class="versiculos">'; // Contenedor principal

  lineas.forEach(linea => {
    // Buscar el número de versículo con expresión regular (ejemplo: "1:1")
    const match = linea.match(/^(\d+:\d+)\s+(.*)$/);
    if (match) {
      // Si coincide, crear un div con número y texto del versículo
      html += `<div class="versiculo" title="Capítulo y versículo: ${match[1]}">
                 <span class="versiculo-numero">${match[1]}</span> ${match[2]}
               </div>`;
    } else {
      // Si no coincide, mostrar la línea tal cual (por si hay texto adicional)
      html += `<div class="versiculo">${linea}</div>`;
    }
  });

  html += '</div>'; // Cerrar contenedor
  return html; // Devolver el HTML generado
}

// ----------- Botón para activar/desactivar modo nocturno -----------

// Obtener el botón que cambia el modo nocturno
const btnModo = document.getElementById('btnModo');

// Escuchar el clic para alternar la clase 'modo-nocturno' en el body
btnModo.addEventListener('click', () => {
  document.body.classList.toggle('modo-nocturno');
  // Cambiar el icono del botón según el modo actual
  btnModo.innerHTML = document.body.classList.contains('modo-nocturno')
    ? '<i class="fas fa-sun"></i>'  // Icono sol para modo nocturno activo
    : '<i class="fas fa-moon"></i>'; // Icono luna para modo diurno
});

// ----------- Controles para cambiar el tamaño de la fuente -----------

let tamañoFuente = 1.2; // Tamaño inicial de la fuente en rem

// Función para actualizar el tamaño de fuente del contenido mostrado
function actualizarFuente() {
  resultadoDiv.style.fontSize = `${tamañoFuente}rem`;
}

// Botón para aumentar el tamaño de la fuente
document.getElementById('aumentar-fuente').onclick = () => {
  tamañoFuente = Math.min(tamañoFuente + 0.1, 2); // Limitar tamaño máximo a 2 rem
  actualizarFuente();
};

// Botón para disminuir el tamaño de la fuente
document.getElementById('disminuir-fuente').onclick = () => {
  tamañoFuente = Math.max(tamañoFuente - 0.1, 0.8); // Limitar tamaño mínimo a 0.8 rem
  actualizarFuente();
};

// ----------- Inicialización al cargar la página -----------

// Cuando el usuario cambia la selección del libro, cargar el contenido
libroSelect.addEventListener('change', mostrarLibro);

// Cuando la página termina de cargar, cargar la lista de libros y aplicar tamaño de fuente inicial
window.onload = () => {
  cargarLibros();
  actualizarFuente();
};

