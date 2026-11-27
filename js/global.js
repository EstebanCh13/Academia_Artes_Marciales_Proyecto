// Espera a que toda la estructura HTML esté lista antes de ejecutar las funciones globales
document.addEventListener('DOMContentLoaded', () => {

    // 1. BARRA DE NAVEGACIÓN TRANSPARENTE AL INICIO Y SÓLIDA AL BAJAR
    const encabezado = document.getElementById('encabezado');

    // Agrega o quita la clase desplazado según cuánto haya bajado el usuario
    const actualizarBarraNavegacion = () => {
        if (!encabezado) return;
        if (window.scrollY > 60) {
            encabezado.classList.add('desplazado');
        } else {
            encabezado.classList.remove('desplazado');
        }
    };

    // 2. DESPLAZAMIENTO SUAVE Y MENÚ MÓVIL
    const enlacesSuaves = document.querySelectorAll('a[href^="#"]');
    const menuMovil = document.getElementById('menuMovil');
    const botonMenuMovil = document.getElementById('botonMenuMovil');

    // Recorre cada enlace interno para que baje suavemente a su sección
    enlacesSuaves.forEach((enlace) => {
        enlace.addEventListener('click', (evento) => {
            const destinoId = enlace.getAttribute('href');
            if (!destinoId || destinoId === '#') return;

            const elementoDestino = document.querySelector(destinoId);
            if (elementoDestino) {
                evento.preventDefault();
                elementoDestino.scrollIntoView({ behavior: 'smooth' });

                // Cierra el menú de celular si estaba abierto al elegir una opción
                if (menuMovil) menuMovil.classList.remove('activo');
                if (botonMenuMovil) botonMenuMovil.classList.remove('activo');
            }
        });
    });

    // Abre o cierra el menú móvil cuando se toca el botón de tres rayas
    if (botonMenuMovil) {
        botonMenuMovil.addEventListener('click', () => {
            botonMenuMovil.classList.toggle('activo');
            if (menuMovil) menuMovil.classList.toggle('activo');
        });
    }

    // 3. VENTANA MODAL DE INICIAR SESIÓN Y RECUPERAR CONTRASEÑA
    const modalLogin = document.getElementById('modalLogin');
    const vistaLogin = document.getElementById('vistaLogin');
    const vistaRecuperar = document.getElementById('vistaRecuperar');
    const botonLogin = document.getElementById('botonLogin');
    const botonLoginMovil = document.getElementById('botonLoginMovil');
    const botonCerrarModal = document.getElementById('cerrarModal');
    const enlaceRecuperar = document.getElementById('mostrarRecuperar');
    const enlaceVolverLogin = document.getElementById('mostrarLogin');

    // Abre la ventana modal mostrando siempre primero el formulario de inicio de sesión
    const abrirModalLogin = () => {
        if (!modalLogin) return;
        modalLogin.classList.add('activa');
        if (vistaLogin) vistaLogin.classList.add('activa');
        if (vistaRecuperar) vistaRecuperar.classList.remove('activa');
    };

    // Cierra la ventana modal de inicio de sesión
    const cerrarModalLogin = () => {
        if (!modalLogin) return;
        modalLogin.classList.remove('activa');
    };

    // Asigna la apertura del modal tanto al botón de escritorio como al de celular
    if (botonLogin) botonLogin.addEventListener('click', abrirModalLogin);
    if (botonLoginMovil) {
        botonLoginMovil.addEventListener('click', () => {
            if (menuMovil) menuMovil.classList.remove('activo');
            if (botonMenuMovil) botonMenuMovil.classList.remove('activo');
            abrirModalLogin();
        });
    }

    // Cierra el modal al hacer clic en la X
    if (botonCerrarModal) botonCerrarModal.addEventListener('click', cerrarModalLogin);

    // Cierra el modal si el usuario hace clic fuera del recuadro blanco
    if (modalLogin) {
        modalLogin.addEventListener('click', (evento) => {
            const tarjeta = modalLogin.querySelector('.modal-tarjeta');
            if (tarjeta && !tarjeta.contains(evento.target)) {
                cerrarModalLogin();
            }
        });
    }

    // Cambia a la vista de recuperar contraseña dentro del mismo modal
    if (enlaceRecuperar) {
        enlaceRecuperar.addEventListener('click', (evento) => {
            evento.preventDefault();
            if (vistaLogin) vistaLogin.classList.remove('activa');
            if (vistaRecuperar) vistaRecuperar.classList.add('activa');
        });
    }

    // Regresa de recuperar contraseña a iniciar sesión
    if (enlaceVolverLogin) {
        enlaceVolverLogin.addEventListener('click', () => {
            if (vistaRecuperar) vistaRecuperar.classList.remove('activa');
            if (vistaLogin) vistaLogin.classList.add('activa');
        });
    }

    // Cierra el modal cuando el usuario presiona la tecla Escape
    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape') {
            cerrarModalLogin();
        }
    });

    // 4. VALIDACIÓN DE FORMULARIOS DEL MODAL (LOGIN Y RECUPERACIÓN)
    const formularioLogin = document.getElementById('formularioLogin');
    const formularioRecuperar = document.getElementById('formularioRecuperar');

    // Revisa que todos los campos obligatorios de un formulario tengan texto
    const validarCamposObligatorios = (formulario) => {
        const campos = formulario.querySelectorAll('[required]');
        let esValido = true;

        campos.forEach((campo) => {
            if (!campo.value.trim()) {
                esValido = false;
                campo.classList.add('error');
            } else {
                campo.classList.remove('error');
            }
        });

        return esValido;
    };

    // Valida y procesa el envío del formulario de inicio de sesión
    if (formularioLogin) {
        formularioLogin.addEventListener('submit', (evento) => {
            evento.preventDefault();
            if (validarCamposObligatorios(formularioLogin)) {
                alert('¡Inicio de sesión exitoso!');
                cerrarModalLogin();
                formularioLogin.reset();
            } else {
                alert('Por favor, completa tu correo y contraseña.');
            }
        });
    }

    // Valida y procesa el envío del formulario de recuperación de contraseña
    if (formularioRecuperar) {
        formularioRecuperar.addEventListener('submit', (evento) => {
            evento.preventDefault();
            if (validarCamposObligatorios(formularioRecuperar)) {
                alert('Se ha enviado un enlace de recuperación a tu correo electrónico.');
                cerrarModalLogin();
                formularioRecuperar.reset();
            } else {
                alert('Por favor, ingresa tu correo electrónico.');
            }
        });
    }

    // 5. ANIMACIONES DE APARICIÓN AL BAJAR POR LA PÁGINA
    const elementosAnimados = document.querySelectorAll('[data-animar]');

    // Observa cuándo cada bloque entra en pantalla para mostrarlo suavemente
    if (elementosAnimados.length > 0) {
        const observadorScroll = new IntersectionObserver((entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add('animado');
                    observadorScroll.unobserve(entrada.target);
                }
            });
        }, { threshold: 0.14 });

        elementosAnimados.forEach((elemento) => observadorScroll.observe(elemento));
    }

    // 6. BOTÓN FLOTANTE PARA SUBIR AL INICIO
    const botonSubir = document.getElementById('botonSubir');

    // Muestra u oculta el botón para volver arriba según la posición del scroll
    const actualizarBotonSubir = () => {
        if (!botonSubir) return;
        if (window.scrollY > 500) {
            botonSubir.classList.add('visible');
        } else {
            botonSubir.classList.remove('visible');
        }
    };

    // Sube suavemente al inicio de la página cuando se presiona el botón
    if (botonSubir) {
        botonSubir.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Une las funciones globales de scroll en un solo evento
    window.addEventListener('scroll', () => {
        actualizarBarraNavegacion();
        actualizarBotonSubir();
    });

    // Ejecuta las comprobaciones una vez al cargar la página
    actualizarBarraNavegacion();
    actualizarBotonSubir();
});
