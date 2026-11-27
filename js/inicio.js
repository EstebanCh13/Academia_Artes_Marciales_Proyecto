// Espera a que toda la estructura HTML esté lista antes de ejecutar el código de inicio
document.addEventListener('DOMContentLoaded', () => {


    // 1. DIAPOSITIVAS AUTOMÁTICAS DE LA PORTADA SIN BOTONES INFERIORES
    const diapositivas = document.querySelectorAll('.diapositiva');
    const portadaEtiqueta = document.getElementById('portadaEtiqueta');
    const portadaTitulo = document.getElementById('portadaTitulo');
    const portadaDescripcion = document.getElementById('portadaDescripcion');

    // Textos de cada diapositiva que rotan automáticamente cada pocos segundos
    const contenidoPortada = [
        {
            etiqueta: 'TEMPORADA 2026 · INSCRIPCIONES ABIERTAS',
            titulo: 'FORJA TU <span class="resaltado">DISCIPLINA</span>.<br>COMPITE EN BOYACÁ.',
            descripcion: 'La Liga de Artes Marciales Mixtas de Boyacá une a niños, jóvenes y adultos que entrenan con respeto, fuerza y pasión para llegar al octágono.'
        },
        {
            etiqueta: 'TRES ACADEMIAS AFILIADAS · TUNJA, DUITAMA Y SOGAMOSO',
            titulo: 'ENTRENAMIENTO <span class="resaltado">OFICIAL</span>.<br>NIVEL COMPETITIVO.',
            descripcion: 'Nuestros entrenadores certificados preparan atletas en MMA, Grappling y Striking bajo estándares deportivos avalados.'
        },
        {
            etiqueta: 'CAMINO AL OCTÁGONO · PRÓXIMO EVENTO',
            titulo: 'DEMUESTRA TU <span class="resaltado">CARÁCTER</span>.<br>REPRESENTA TU SEDE.',
            descripcion: 'Participa en las veladas oficiales, torneos departamentales y rankings de la liga más sólida de la región.'
        }
    ];

    let indiceDiapositiva = 0;

    // Cambia automáticamente el fondo y los textos de la portada cada 6 segundos
    if (diapositivas.length > 0 && portadaTitulo && portadaDescripcion && portadaEtiqueta) {
        setInterval(() => {
            diapositivas[indiceDiapositiva].classList.remove('activa');
            indiceDiapositiva = (indiceDiapositiva + 1) % diapositivas.length;
            diapositivas[indiceDiapositiva].classList.add('activa');

            // Desvanece un instante el texto antes de mostrar el siguiente mensaje
            portadaTitulo.style.opacity = '0';
            portadaDescripcion.style.opacity = '0';

            setTimeout(() => {
                const actual = contenidoPortada[indiceDiapositiva];
                portadaEtiqueta.textContent = actual.etiqueta;
                portadaTitulo.innerHTML = actual.titulo;
                portadaDescripcion.textContent = actual.descripcion;
                portadaTitulo.style.opacity = '1';
                portadaDescripcion.style.opacity = '1';
            }, 350);
        }, 6000);
    }

    // 2. TABLERO MANUAL DE CUENTA REGRESIVA AL EVENTO
    const fechaEvento = new Date('January 15, 2027 18:00:00').getTime();

    // Referencias a cada tarjeta individual de dígito del tablero
    const tarjetasDigitos = {
        diasDecena: document.getElementById('dias-decena'),
        diasUnidad: document.getElementById('dias-unidad'),
        horasDecena: document.getElementById('horas-decena'),
        horasUnidad: document.getElementById('horas-unidad'),
        minutosDecena: document.getElementById('minutos-decena'),
        minutosUnidad: document.getElementById('minutos-unidad'),
        segundosDecena: document.getElementById('segundos-decena'),
        segundosUnidad: document.getElementById('segundos-unidad')
    };

    // Ejecuta la animación de hoja que cae cuando cambia un número en el tablero
    const actualizarTarjetaFlip = (tarjeta, nuevoDigito) => {
        if (!tarjeta) return;

        const mitadSuperior = tarjeta.querySelector('.mitad-superior span');
        const mitadInferior = tarjeta.querySelector('.mitad-inferior span');
        const digitoActual = mitadSuperior ? mitadSuperior.textContent : '';

        // Si el número no ha cambiado todavía, no hace ninguna animación
        if (digitoActual === nuevoDigito) return;

        // Elimina hojas temporales anteriores si quedaron de un cambio previo
        const hojasPrevias = tarjeta.querySelectorAll('.hoja-volteo-superior, .hoja-volteo-inferior');
        hojasPrevias.forEach((hoja) => hoja.remove());

        // Crea la hoja superior que cae mostrando el número anterior
        const hojaSuperior = document.createElement('div');
        hojaSuperior.className = 'hoja-volteo-superior';
        hojaSuperior.innerHTML = `<span>${digitoActual}</span>`;

        // Crea la hoja inferior que aparece revelando el número nuevo
        const hojaInferior = document.createElement('div');
        hojaInferior.className = 'hoja-volteo-inferior';
        hojaInferior.innerHTML = `<span>${nuevoDigito}</span>`;

        // Actualiza la mitad superior fija con el nuevo dígito mientras cae la hoja
        if (mitadSuperior) mitadSuperior.textContent = nuevoDigito;

        tarjeta.appendChild(hojaSuperior);
        tarjeta.appendChild(hojaInferior);

        // Al terminar el volteo, fija el número nuevo abajo y limpia las hojas temporales
        setTimeout(() => {
            if (mitadInferior) mitadInferior.textContent = nuevoDigito;
            hojaSuperior.remove();
            hojaInferior.remove();
        }, 580);
    };

    // Calcula cuánto falta para el evento y actualiza cada tarjeta del tablero
    const actualizarCuentaRegresiva = () => {
        const ahora = new Date().getTime();
        const diferencia = fechaEvento - ahora;

        if (diferencia <= 0) {
            Object.values(tarjetasDigitos).forEach((tarjeta) => actualizarTarjetaFlip(tarjeta, '0'));
            clearInterval(intervaloCuentaRegresiva);
            return;
        }

        // Convierte los milisegundos restantes en días, horas, minutos y segundos
        const dias = Math.min(99, Math.floor(diferencia / (1000 * 60 * 60 * 24)));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        // Convierte cada valor a dos dígitos (por ejemplo, 7 pasa a "07")
        const diasTexto = String(dias).padStart(2, '0');
        const horasTexto = String(horas).padStart(2, '0');
        const minutosTexto = String(minutos).padStart(2, '0');
        const segundosTexto = String(segundos).padStart(2, '0');

        actualizarTarjetaFlip(tarjetasDigitos.diasDecena, diasTexto[0]);
        actualizarTarjetaFlip(tarjetasDigitos.diasUnidad, diasTexto[1]);
        actualizarTarjetaFlip(tarjetasDigitos.horasDecena, horasTexto[0]);
        actualizarTarjetaFlip(tarjetasDigitos.horasUnidad, horasTexto[1]);
        actualizarTarjetaFlip(tarjetasDigitos.minutosDecena, minutosTexto[0]);
        actualizarTarjetaFlip(tarjetasDigitos.minutosUnidad, minutosTexto[1]);
        actualizarTarjetaFlip(tarjetasDigitos.segundosDecena, segundosTexto[0]);
        actualizarTarjetaFlip(tarjetasDigitos.segundosUnidad, segundosTexto[1]);
    };

    // Inicia el tablero de inmediato y lo actualiza cada segundo
    actualizarCuentaRegresiva();
    const intervaloCuentaRegresiva = setInterval(actualizarCuentaRegresiva, 1000);

    // 3. MARCAR ENLACE ACTIVO DEL MENÚ AL RECORRER EL INICIO
    const secciones = document.querySelectorAll('section[id]');
    const enlacesNav = document.querySelectorAll('.enlace-nav');

    // Marca en el menú superior la sección que el usuario está viendo actualmente
    const actualizarEnlaceActivo = () => {
        const posicionActual = window.scrollY + 140;

        secciones.forEach((seccion) => {
            const inicioSeccion = seccion.offsetTop;
            const altoSeccion = seccion.offsetHeight;
            const idSeccion = seccion.getAttribute('id');

            if (posicionActual >= inicioSeccion && posicionActual < inicioSeccion + altoSeccion) {
                enlacesNav.forEach((enlace) => {
                    if (enlace.getAttribute('href').startsWith('#')) {
                        enlace.classList.remove('activo');
                        if (enlace.getAttribute('href') === `#${idSeccion}`) {
                            enlace.classList.add('activo');
                        }
                    }
                });
            }
        });
    };

    // Actualiza el enlace activo cuando el usuario se desplaza por la página de inicio
    window.addEventListener('scroll', actualizarEnlaceActivo);
    actualizarEnlaceActivo();
});
