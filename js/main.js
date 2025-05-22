const typed = new Typed('.typed', {
	strings: [
		'<i class="mascota">Consultor Junior</i>',
		'<i class="mascota">Estudiante Analista de Sistemas</i>',
	],

	//stringsElement: '#cadenas-texto', // ID del elemento que contiene cadenas de texto a mostrar.
	typeSpeed: 75, // Velocidad en mlisegundos para poner una letra,
	startDelay: 300, // Tiempo de retraso en iniciar la animacion. Aplica tambien cuando termina y vuelve a iniciar,
	backSpeed: 75, // Velocidad en milisegundos para borrrar una letra,
	smartBackspace: true, // Eliminar solamente las palabras que sean nuevas en una cadena de texto.
	shuffle: false, // Alterar el orden en el que escribe las palabras.
	backDelay: 1500, // Tiempo de espera despues de que termina de escribir una palabra.
	loop: true, // Repetir el array de strings
	loopCount: false, // Cantidad de veces a repetir el array.  false = infinite
	showCursor: true, // Mostrar cursor palpitanto
	cursorChar: '|', // Caracter para el cursor
	contentType: 'html', // 'html' o 'null' para texto sin formato
});

//parallax 
window.addEventListener('scroll', () => {
	const seccion = document.querySelector('.seccion-inicio');
	const fondo = document.querySelector('.fondo-parallax');
  
	if (!seccion || !fondo) return;
  
	const offset = window.scrollY;
	const seccionTop = seccion.offsetTop;
	const seccionHeight = seccion.offsetHeight;
  
	if (offset >= seccionTop - window.innerHeight && offset <= seccionTop + seccionHeight) {
	  const velocidad = 0.5; // menor = más lento
	  const desplazamiento = (offset - seccionTop) * velocidad;
	  fondo.style.transform = `translateY(${desplazamiento}px)`;
	}
});

// JavaScript para la sección de experiencia
document.addEventListener('DOMContentLoaded', function() {
  // Configuración de animaciones al hacer scroll para las tarjetas de experiencia
  const experienceCards = document.querySelectorAll('.exp-card');
  
  // Función para verificar si un elemento está visible en el viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Función para manejar la animación de aparición
  function handleScrollAnimation() {
    experienceCards.forEach((card, index) => {
      if (isElementInViewport(card)) {
        // Agregamos un pequeño retraso para que aparezcan secuencialmente
        setTimeout(() => {
          card.classList.add('animate-fade-in');
        }, index * 150);
      }
    });
  }
  
  // Inicializar animación al cargar
  setTimeout(handleScrollAnimation, 300);
  
  // Evento scroll para activar animaciones
  window.addEventListener('scroll', handleScrollAnimation);
  
  // Manejo de comportamiento táctil para dispositivos móviles
  if ('ontouchstart' in window) {
    experienceCards.forEach(card => {
      card.addEventListener('touchstart', function() {
        // En dispositivos táctiles, alternamos la clase para girar la tarjeta
        this.querySelector('.exp-card-inner').classList.toggle('touch-flip');
      });
    });
  }
});


