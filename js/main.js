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
  setTimeout(handleScrollAnimation, 250);
  
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



//Formación 
// Funcionalidad para la sección de Formación
document.addEventListener('DOMContentLoaded', function() {
    
    // Función para animar números de estadísticas
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const targetNumber = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 segundos
            const startTime = performance.now();
            const startNumber = 0;
            
            function updateNumber(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Función de easing para suavizar la animación
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                
                const currentNumber = Math.floor(startNumber + (targetNumber - startNumber) * easeOutQuart);
                stat.textContent = currentNumber;
                
                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.textContent = targetNumber;
                }
            }
            
            requestAnimationFrame(updateNumber);
        });
    }
    
    // Observer para detectar cuando la sección es visible
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animar estadísticas cuando la sección es visible
                setTimeout(() => {
                    animateNumbers();
                }, 500);
                
                // Desconectar el observer después de la primera animación
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar la sección de formación
    const formacionSection = document.getElementById('scrollspyFormacion');
    if (formacionSection) {
        sectionObserver.observe(formacionSection);
    }
    
    // Animación de aparición para elementos de timeline
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observar elementos de timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // Efecto parallax sutil en el fondo
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const formacionSection = document.getElementById('scrollspyFormacion');
        
        if (formacionSection) {
            const rate = scrolled * -0.5;
            const bgElement = formacionSection.querySelector('::before');
            
            // Aplicar transformación al fondo

        }
    }
    
    // Throttle para optimizar el rendimiento del parallax
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(handleParallax);
            ticking = true;
            setTimeout(() => { ticking = false; }, 16); // ~60fps
        }
    }
    
    // Evento de scroll para parallax
    window.addEventListener('scroll', requestTick);
    
    // Efecto hover mejorado para elementos de timeline
    timelineItems.forEach(item => {
        const content = item.querySelector('.timeline-content');
        const dot = item.querySelector('.timeline-dot');
        
        item.addEventListener('mouseenter', () => {
            // Añadir clase para efectos adicionales
            item.classList.add('timeline-item-hovered');
            
            // Efecto de vibración sutil en el dot
            dot.style.animation = 'pulse 0.6s ease-in-out';
        });
        
        item.addEventListener('mouseleave', () => {
            item.classList.remove('timeline-item-hovered');
            dot.style.animation = '';
        });
    });
    
    // Función para reiniciar animaciones si es necesario
    function resetAnimations() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            stat.textContent = '0';
        });
        
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            item.classList.remove('aos-animate');
        });
    }
    
    // Agregar estilos de animación CSS dinámicamente
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: translateX(-50%) scale(1); }
            50% { transform: translateX(-50%) scale(1.1); }
            100% { transform: translateX(-50%) scale(1); }
        }
        
        .timeline-item-hovered .timeline-content {
            background: rgba(255, 255, 255, 0.2) !important;
        }
        
        .timeline-item-hovered .timeline-dot {
            box-shadow: 0 0 25px rgba(102, 126, 234, 0.8) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Función para actualizar datos de formación dinámicamente
    window.updateFormacionData = function(formacionData) {
        const timelineContainer = document.querySelector('.timeline-container');
        const timelineLine = timelineContainer.querySelector('.timeline-line');
        
        // Limpiar elementos existentes excepto la línea
        const existingItems = timelineContainer.querySelectorAll('.timeline-item');
        existingItems.forEach(item => item.remove());
        
        // Crear nuevos elementos
        formacionData.forEach((formacion, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            timelineItem.setAttribute('data-aos', 'fade-up');
            timelineItem.setAttribute('data-aos-delay', (index + 1) * 100);
            
            timelineItem.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-date">${formacion.fecha}</div>
                    <h3 class="course-name">${formacion.nombre}</h3>
                    <h4 class="institution">${formacion.institucion}</h4>
                    <p class="course-description">${formacion.descripcion || ''}</p>
                    ${formacion.tags ? `
                        <div class="course-tags">
                            ${formacion.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
            
            timelineContainer.appendChild(timelineItem);
        });
        
        // Reobservar nuevos elementos
        const newTimelineItems = document.querySelectorAll('.timeline-item');
        newTimelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    };
});



//footer 
// Funcionalidad para el Footer
document.addEventListener('DOMContentLoaded', function() {
    // Navegación suave para enlaces del footer
    const footerNavLinks = document.querySelectorAll('.footer-nav a[href^="#"]');
    
    footerNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80; // Ajustar según altura del header
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animación de aparición para elementos del footer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observar secciones del footer
    const footerSections = document.querySelectorAll('.footer-section');
    footerSections.forEach((section, index) => {
        section.style.animationPlayState = 'paused';
        footerObserver.observe(section);
    });
    
    // Efecto hover mejorado para enlaces sociales
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-3px) scale(1)';
        });
        
        // Efecto de click
        link.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-1px) scale(1.05)';
        });
        
        link.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
    });
    
    // Efecto parallax para las ondas (opcional, solo si no afecta rendimiento)
    let ticking = false;
    
    function updateWaves() {
        const scrolled = window.pageYOffset;
        const waves = document.querySelectorAll('.footer-waves .parallax > use');
        
        waves.forEach((wave, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            wave.style.transform = `translateX(${yPos}px)`;
        });
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateWaves);
            ticking = true;
            setTimeout(() => { ticking = false; }, 16);
        }
    }
    
    // Activar parallax solo en pantallas grandes para mejor rendimiento
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', requestTick);
    }
    
    // Funcionalidad para actualizar información del footer dinámicamente
    window.updateFooterInfo = function(info) {
        // Actualizar información de contacto
        if (info.contact) {
            const contactItems = document.querySelectorAll('.contact-item span');
            if (contactItems[0] && info.contact.location) contactItems[0].textContent = info.contact.location;
            if (contactItems[2] && info.contact.email) contactItems[2].textContent = info.contact.email;
        }
        
        // Actualizar enlaces sociales
        if (info.social) {
            const socialLinks = document.querySelectorAll('.social-link');
            Object.keys(info.social).forEach(platform => {
                const link = document.querySelector(`.social-link[aria-label="${platform}"]`);
                if (link && info.social[platform]) {
                    link.href = info.social[platform];
                }
            });
        }
        
        // Actualizar información de marca
        if (info.brand) {
            const brandTitle = document.querySelector('.brand-logo h3');
            const brandTagline = document.querySelector('.brand-tagline');
            const brandDescription = document.querySelector('.brand-description');
            
            if (brandTitle && info.brand.title) brandTitle.textContent = info.brand.title;
            if (brandTagline && info.brand.tagline) brandTagline.textContent = info.brand.tagline;
            if (brandDescription && info.brand.description) brandDescription.textContent = info.brand.description;
        }
    };
    
    
    // Función para animar contadores
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(progress * target);
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Manejo de errores para mejorar la experiencia del usuario
    window.addEventListener('error', function(e) {
        console.warn('Error en footer:', e.message);
    });
    
    // Cleanup al descargar la página
    window.addEventListener('beforeunload', function() {
        // Limpiar event listeners si es necesario
        window.removeEventListener('scroll', requestTick);
    });
    
    console.log('Footer inicializado correctamente');
});