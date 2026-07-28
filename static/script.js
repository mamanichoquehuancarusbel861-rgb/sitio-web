// Datos dinámicos para la sección de Proyectos (usado solo como respaldo local)
const proyectosData = {
    oro: {
        ubicacion: "Provincia de Carabaya, Región Puno.",
        produccion: "120,000 onzas de oro anuales.",
        estado: "En fase de operaciones y explotación activa.",
        imagen: "images/oro-andino.jpg"
    },
    cobre: {
        ubicacion: "Provincia de Lampa, Región Puno.",
        produccion: "45,000 toneladas métricas de cobre fino.",
        estado: "En fase de exploración avanzada.",
        imagen: "images/cobre-sur.jpg"
    },
    plata: {
        ubicacion: "Provincia de Chucuito, Región Puno.",
        produccion: "2,500,000 onzas de plata anuales.",
        estado: "Estudio de factibilidad ambiental.",
        imagen: "images/plata-altiplano.jpg"
    }
};

function changeProject(proyectoKey) {
    const data = proyectosData[proyectoKey];
    if (!data) return;

    const elUbica = document.getElementById('proj-ubica');
    const elProdu = document.getElementById('proj-produ');
    const elEstado = document.getElementById('proj-estado');
    const elImg = document.getElementById('proj-img-element');

    if (elUbica) elUbica.innerText = data.ubicacion;
    if (elProdu) elProdu.innerText = data.produccion;
    if (elEstado) elEstado.innerText = data.estado;
    if (elImg) elImg.src = data.imagen;

    // Actualizar clase activa
    document.querySelectorAll('.sidebar-menu li').forEach(li => li.classList.remove('active'));
    const activeLi = document.getElementById(`side-${proyectoKey}`);
    if (activeLi) activeLi.classList.add('active');
}

// Control Modal Postulación (modal genérico, si existe en la página)
function openModal() {
    const modal = document.getElementById('modalForm');
    if (modal) modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('modalForm');
    if (modal) modal.style.display = 'none';
}

function submitForm(event) {
    event.preventDefault();
    alert('¡Postulación enviada correctamente!');
    closeModal();
}

// Abrir y Cerrar Modal "NOSOTROS" (si existe en la página; index.html define su propia versión)
if (typeof window.openNosotrosModal !== 'function') {
    window.openNosotrosModal = function () {
        const modal = document.getElementById('modalNosotros');
        if (modal) modal.style.display = 'flex';
    };
}

if (typeof window.closeNosotrosModal !== 'function') {
    window.closeNosotrosModal = function () {
        const modal = document.getElementById('modalNosotros');
        if (modal) modal.style.display = 'none';
    };
}

// Cerrar modal al hacer clic fuera del contenido transparente
window.addEventListener('click', function (event) {
    const modal = document.getElementById('modalNosotros');
    if (modal && event.target === modal) {
        modal.style.display = 'none';
    }
});

/* ==========================================================================
   ANIMACIÓN DE TEXTO "DESCIFRADO" (ESTILO FUTURISTA)
   No modifica el contenido/texto de la página, solo lo anima al mostrarse.
   ========================================================================== */
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#$%&01ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.frame = 0;
        this.queue = [];
        this.frameRequest = null;
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.textContent;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => (this.resolve = resolve));

        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 20);
            const end = start + Math.floor(Math.random() * 25) + 10;
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.chars[Math.floor(Math.random() * this.chars.length)];
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.el.innerHTML = output;

        if (complete === this.queue.length) {
            this.el.parentElement.classList.remove('is-scrambling');
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
}

// Envuelve solo los nodos de texto (deja íconos y otros elementos intactos)
function wrapTextNodesForScramble(el) {
    const spans = [];
    el.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
            const span = document.createElement('span');
            span.className = 'scramble-target';
            span.textContent = node.textContent;
            el.replaceChild(span, node);
            spans.push(span);
        }
    });
    return spans;
}

function initScrambleAnimations() {
    const selectors = [
        '.web-hero h2',
        '.web-section-title',
        '.block-title',
        '.modal-nosotros-title',
        '.panel-flowchart-title',
        '.gallery-title',
        '.sidebar-title'
    ].join(', ');

    const targets = document.querySelectorAll(selectors);

    targets.forEach((el) => {
        const spans = wrapTextNodesForScramble(el);
        if (spans.length === 0) return;

        const runScramble = () => {
            el.classList.add('is-scrambling');
            spans.forEach((span) => {
                const fx = new TextScramble(span);
                fx.setText(span.textContent);
            });
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    runScramble();
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.35 });

        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', initScrambleAnimations);
