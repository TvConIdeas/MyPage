// ! ------ CONFIGURACIÓN Y CONSTANTES ------ //
const CONFIG = {
    storageLang: "tvci_lang",
    rutasDatos: {
        demos: "./data/demos.json",
        stack: "./data/stack.json",
        trayectoria: "./data/trayectoria.json",
        titulos: "./data/titulos.json"
    },
    tv: {
        rutaFrames: "img/FramesTV",
        maxFrames: 20,
        intervaloMs: 3200,
        cambioFrameMs: 150,
        finSintoniaMs: 320,
        anguloPasoDial: 55
    },
    banderasSvg: {
        arg: `<svg class="lang-flag" viewBox="0 0 24 16" width="16" height="11" aria-hidden="true"><rect width="24" height="5.33" y="0" fill="#74ACDF"/><rect width="24" height="5.34" y="5.33" fill="#FFFFFF"/><rect width="24" height="5.33" y="10.67" fill="#74ACDF"/><circle cx="12" cy="8" r="2.1" fill="#F6B40E" stroke="#85340A" stroke-width="0.35"/></svg>`,
        eng: `<svg class="lang-flag" viewBox="0 0 24 16" width="16" height="11" aria-hidden="true"><rect width="24" height="16" fill="#FFFFFF"/><rect x="10" width="4" height="16" fill="#CE1124"/><rect y="6" width="24" height="4" fill="#CE1124"/></svg>`
    }
};

// ? ------ Referencias del DOM ------ //
const DOM = {
    header: document.getElementById("top-header"),
    btnLang: document.getElementById("btn-lang-toggle"),
    gridDemos: document.getElementById("grid-demos"),
    gridStack: document.getElementById("grid-stack"),
    gridTrayectoria: document.getElementById("grid-trayectoria"),
    gridTitulos: document.getElementById("grid-titulos"),
    tvElemento: document.getElementById("retro-tv"),
    tvImg: document.getElementById("tv-screen-img"),
    canalLabel: document.getElementById("tv-channel-label"),
    dialPrincipal: document.getElementById("tv-dial-main"),
    pdfModal: document.getElementById("pdf-modal"),
    pdfIframe: document.getElementById("pdf-iframe"),
    pdfTitle: document.getElementById("pdf-modal-title"),
    pdfMeta: document.getElementById("pdf-modal-meta"),
    pdfExternalLink: document.getElementById("pdf-external-link"),
    pdfCloseBtn: document.getElementById("pdf-modal-close"),
    pdfBackdrop: document.getElementById("pdf-modal-backdrop")
};

// ? ------ Estado de la aplicación ------ //
const ESTADO = {
    idioma: localStorage.getItem(CONFIG.storageLang) === "en" ? "en" : "es",
    demos: [],
    stack: [],
    trayectoria: { experiencia: [], formacion: [] },
    titulos: []
};

// ! ------ DICCIONARIO DE INTERFAZ (ES / EN) ------ //
const TRADUCCIONES = {
    es: {
        navProyectos: "Proyectos",
        navStack: "Stack",
        navTrayectoria: "Trayectoria",
        navTitulos: "Títulos",
        navRedes: "Conectemos",
        ctaWhatsapp: "Hablemos",
        toggleBtnLabel: "EN",
        heroBadge: "PORTFOLIO CREATIVO // MDP - ARG",
        heroEyebrow: "DESARROLLO WEB · IDEAS EN MOVIMIENTO",
        heroTitle1: "Ideas que toman",
        heroTitle2: "forma propia.",
        heroDesc: "Soy Ian Francano, Técnico Universitario en Programación (UTN) y estudiante de Ingeniería Informática (UNMDP). Diseño y desarrollo páginas web, sistemas de gestión y experiencias interactivas pensadas para funcionar bien y destacar.",
        btnExplorar: "Explorar proyectos",
        btnGithub: "Ver GitHub ↗",
        heroSignature: "CURIOSIDAD, CÓDIGO Y CREATIVIDAD.",
        tvChannelSuffix: "CREADOR",
        proyEyebrow: "TRABAJO SELECCIONADO",
        proyTitle1: "Proyectos en",
        proyTitle2: "escena.",
        proySub: "Cada proyecto es una idea distinta. Elegí uno para conocerlo en funcionamiento.",
        btnExplorarProyecto: "Explorar proyecto",
        stackEyebrow: "HERRAMIENTAS Y TECNOLOGÍAS",
        stackTitle1: "Stack",
        stackTitle2: "técnico.",
        stackSub: "Tecnologías, entornos y metodologías con las que construyo aplicaciones web, sistemas backend y videojuegos.",
        trayEyebrow: "RECORRIDO PROFESIONAL Y ACADÉMICO",
        trayTitle1: "Experiencia &",
        trayTitle2: "formación.",
        colExperiencia: "Experiencia",
        colFormacion: "Formación",
        badgeEnCurso: "EN CURSO",
        titEyebrow: "ACREDITACIONES Y CERTIFICADOS",
        titTitle1: "Títulos",
        titTitle2: "obtenidos.",
        titSub: "Tocá cualquiera de los títulos para visualizar su documento PDF en ventana modal.",
        verPdf: "Ver certificado PDF",
        abrirPdf: "Abrir PDF ↗",
        redEyebrow: "FUERA DE ESCENA",
        redTitle1: "Sigamos en",
        redTitle2: "contacto.",
        socLinkedin: "Profesional",
        socGithub: "Repositorios",
        socInstagram: "Personal",
        closingQuote: "HAZLO O NO LO HAGAS, PERO NO LO INTENTES — YODA",
        footerQuote: "Hazlo o no lo hagas, pero no lo intentes, Yoda"
    },
    en: {
        navProyectos: "Projects",
        navStack: "Stack",
        navTrayectoria: "Background",
        navTitulos: "Credentials",
        navRedes: "Contact",
        ctaWhatsapp: "Let's talk",
        toggleBtnLabel: "ES",
        heroBadge: "CREATIVE PORTFOLIO // MDP - ARG",
        heroEyebrow: "WEB DEVELOPMENT · IDEAS IN MOTION",
        heroTitle1: "Ideas taking",
        heroTitle2: "their own shape.",
        heroDesc: "I'm Ian Francano, University Technician in Programming (UTN) and Computer Engineering student (UNMDP). I design and build websites, management systems, and interactive experiences crafted to perform well and stand out.",
        btnExplorar: "Explore projects",
        btnGithub: "View GitHub ↗",
        heroSignature: "CURIOSITY, CODE AND CREATIVITY.",
        tvChannelSuffix: "CREATOR",
        proyEyebrow: "SELECTED WORK",
        proyTitle1: "Projects on",
        proyTitle2: "stage.",
        proySub: "Each project is a distinct idea. Pick one to explore it live.",
        btnExplorarProyecto: "Explore project",
        stackEyebrow: "TOOLS & TECHNOLOGIES",
        stackTitle1: "Tech",
        stackTitle2: "stack.",
        stackSub: "Technologies, environments, and methodologies I use to build web apps, backend systems, and games.",
        trayEyebrow: "PROFESSIONAL & ACADEMIC PATH",
        trayTitle1: "Experience &",
        trayTitle2: "education.",
        colExperiencia: "Experience",
        colFormacion: "Education",
        badgeEnCurso: "IN PROGRESS",
        titEyebrow: "CREDENTIALS & CERTIFICATES",
        titTitle1: "Earned",
        titTitle2: "credentials.",
        titSub: "Click any credential to view its PDF document inside a modal window.",
        verPdf: "View PDF certificate",
        abrirPdf: "Open PDF ↗",
        redEyebrow: "OFF STAGE",
        redTitle1: "Stay in",
        redTitle2: "touch.",
        socLinkedin: "Professional",
        socGithub: "Repositories",
        socInstagram: "Personal",
        closingQuote: "DO OR DO NOT, THERE IS NO TRY — YODA",
        footerQuote: "Do or do not, there is no try, Yoda"
    }
};

// ? ------ Utilidad de traducción ------ //
function t(campo) {
    if (campo && typeof campo === "object") {
        return campo[ESTADO.idioma] || campo.es || "";
    }
    return campo || "";
}

// ! ------ 1. CAMBIO DE IDIOMA ------ //
function aplicarIdioma(lang) {
    ESTADO.idioma = lang === "en" ? "en" : "es";
    localStorage.setItem(CONFIG.storageLang, ESTADO.idioma);
    document.documentElement.lang = ESTADO.idioma;

    const dict = TRADUCCIONES[ESTADO.idioma];

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) el.textContent = dict[key];
    });

    if (DOM.btnLang) {
        const banderaSvg = ESTADO.idioma === "es" ? CONFIG.banderasSvg.eng : CONFIG.banderasSvg.arg;
        DOM.btnLang.innerHTML = `${banderaSvg}<span>${dict.toggleBtnLabel}</span>`;
        DOM.btnLang.setAttribute(
            "aria-label",
            ESTADO.idioma === "es" ? "Switch language to English" : "Cambiar idioma a Español"
        );
    }

    if (DOM.pdfExternalLink) {
        DOM.pdfExternalLink.textContent = dict.abrirPdf;
    }

    renderProyectos();
    renderStack();
    renderTrayectoria();
    renderTitulos();
}

// ! ------ 2. SCROLL SUAVE ------ //
function inicializarScrollSuave() {
    const enlacesInternos = document.querySelectorAll('.nav-links a[href^="#"], .brand[href^="#"], .js-scroll-link[href^="#"]');

    enlacesInternos.forEach(enlace => {
        enlace.addEventListener("click", e => {
            const destinoId = enlace.getAttribute("href");
            if (!destinoId || destinoId === "#") return;

            const seccionDestino = document.querySelector(destinoId);
            if (!seccionDestino) return;

            e.preventDefault();
            const offsetHeader = DOM.header ? DOM.header.offsetHeight + 12 : 24;
            const posicionY = seccionDestino.getBoundingClientRect().top + window.scrollY - offsetHeader;

            window.scrollTo({
                top: Math.max(0, posicionY),
                behavior: "smooth"
            });
        });
    });
}

// ! ------ 3. TELEVISIÓN RETRO ------ //
function comprobarImagen(src) {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => resolve(null);
        img.src = src;
    });
}

async function descubrirFramesTv() {
    const { rutaFrames, maxFrames } = CONFIG.tv;
    const encontrados = [];

    for (let i = 1; i <= maxFrames; i++) {
        const ruta = `${rutaFrames}/FrameTv${i}.jpg`;
        const valida = await comprobarImagen(ruta);
        if (!valida) break;
        encontrados.push(valida);
    }

    return encontrados.length ? encontrados : [`${rutaFrames}/FrameTv1.jpg`];
}

async function inicializarTelevisionRetro() {
    const { tvElemento, tvImg, canalLabel, dialPrincipal } = DOM;
    if (!tvElemento || !tvImg) return;

    const framesTv = await descubrirFramesTv();
    let indiceActual = 0;

    function actualizarEtiquetaCanal() {
        if (!canalLabel) return;
        const numeroFormateado = String(indiceActual + 1).padStart(2, "0");
        canalLabel.textContent = `CH ${numeroFormateado} / ${TRADUCCIONES[ESTADO.idioma].tvChannelSuffix}`;
    }

    tvImg.src = framesTv[0];
    actualizarEtiquetaCanal();

    if (framesTv.length <= 1) return;

    function cambiarCanal(siguienteIndice) {
        indiceActual = siguienteIndice % framesTv.length;
        tvImg.classList.add("is-switching");
        tvElemento.classList.add("is-tuning");

        setTimeout(() => {
            tvImg.src = framesTv[indiceActual];
            actualizarEtiquetaCanal();
            if (dialPrincipal) {
                dialPrincipal.style.transform = `rotate(${indiceActual * CONFIG.tv.anguloPasoDial}deg)`;
            }
        }, CONFIG.tv.cambioFrameMs);

        setTimeout(() => {
            tvImg.classList.remove("is-switching");
            tvElemento.classList.remove("is-tuning");
        }, CONFIG.tv.finSintoniaMs);
    }

    let intervaloTv = setInterval(() => {
        if (!document.hidden) cambiarCanal(indiceActual + 1);
    }, CONFIG.tv.intervaloMs);

    tvElemento.addEventListener("click", () => {
        clearInterval(intervaloTv);
        cambiarCanal(indiceActual + 1);
        intervaloTv = setInterval(() => {
            if (!document.hidden) cambiarCanal(indiceActual + 1);
        }, CONFIG.tv.intervaloMs);
    });
}

// ! ------ 4. PROYECTOS DESDE data/demos.json ------ //
function renderProyectos() {
    if (!DOM.gridDemos || !Array.isArray(ESTADO.demos)) return;
    const dict = TRADUCCIONES[ESTADO.idioma];

    DOM.gridDemos.innerHTML = ESTADO.demos.map(demo => {
        const bloqueImagen = demo.imagen
            ? `<div class="project-thumb">
                   <img src="${demo.imagen}" alt="${t(demo.titulo)}" loading="lazy" onerror="this.parentElement.style.display='none'">
               </div>`
            : "";

        const bloqueTags = Array.isArray(demo.tecnologias) && demo.tecnologias.length
            ? `<div class="project-tags">${demo.tecnologias.map(tech => `<span>${tech}</span>`).join("")}</div>`
            : "";

        return `
        <div class="star-card-wrapper">
            <article class="star-card">
                <div class="star-card-top">
                    ${bloqueImagen}
                    <div class="star-card-header">
                        <span class="star-tag">${t(demo.estrella)}</span>
                        <span>${t(demo.etiqueta)}</span>
                    </div>
                    <h4>${t(demo.titulo)}</h4>
                    <p>${t(demo.descripcion)}</p>
                    ${bloqueTags}
                </div>
                <a href="${demo.linkDemo}" target="_blank" rel="noopener noreferrer" class="btn-star-link">
                    ${dict.btnExplorarProyecto}
                </a>
            </article>
        </div>`;
    }).join("");

    inicializarEfectoTarjetas();
}

async function cargarProyectos() {
    if (!DOM.gridDemos) return;
    try {
        const res = await fetch(CONFIG.rutasDatos.demos);
        if (!res.ok) throw new Error("Error cargando demos.json");
        ESTADO.demos = await res.json();
        renderProyectos();
    } catch (err) {
        console.error(err);
        DOM.gridDemos.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1; text-align: center; padding: 2rem;">No se pudieron cargar los proyectos.</p>`;
    }
}

// ! ------ 5. STACK TÉCNICO DESDE data/stack.json ------ //
function renderStack() {
    if (!DOM.gridStack || !Array.isArray(ESTADO.stack)) return;

    DOM.gridStack.innerHTML = ESTADO.stack.map(grupo => {
        const chipsHtml = Array.isArray(grupo.items)
            ? grupo.items.map(item => `<span class="tech-chip">${t(item)}</span>`).join("")
            : "";

        return `
        <article class="stack-card">
            <span class="stack-category">${t(grupo.categoria)}</span>
            <h3>${t(grupo.titulo)}</h3>
            <div class="chip-list">
                ${chipsHtml}
            </div>
        </article>`;
    }).join("");
}

async function cargarStack() {
    if (!DOM.gridStack) return;
    try {
        const res = await fetch(CONFIG.rutasDatos.stack);
        if (!res.ok) throw new Error("Error cargando stack.json");
        ESTADO.stack = await res.json();
        renderStack();
    } catch (err) {
        console.error(err);
        DOM.gridStack.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1; text-align: center; padding: 2rem;">No se pudo cargar el stack técnico.</p>`;
    }
}

// ! ------ 6. TRAYECTORIA DESDE data/trayectoria.json ------ //
function renderColumnaTrayectoria(tituloColumna, items) {
    const dict = TRADUCCIONES[ESTADO.idioma];
    const ordenados = [...items].sort((a, b) => Number(Boolean(b.enCurso)) - Number(Boolean(a.enCurso)));

    const cardsHtml = ordenados.map(item => {
        const activoClass = item.enCurso ? " is-active" : "";
        const badgeCurso = item.enCurso ? `<span class="badge-en-curso">${dict.badgeEnCurso}</span>` : "";
        const institucionTexto = t(item.institucion);
        const institucionHtml = institucionTexto ? `<div class="timeline-institution">${institucionTexto}</div>` : "";

        return `
            <article class="timeline-item${activoClass}">
                <div class="timeline-meta-row">
                    <span class="timeline-date">${t(item.periodo)}</span>
                    ${badgeCurso}
                </div>
                <h4>${t(item.titulo)}</h4>
                ${institucionHtml}
                <p>${t(item.descripcion)}</p>
            </article>`;
    }).join("");

    return `
        <div class="timeline-column">
            <h3 class="timeline-col-title">${tituloColumna}</h3>
            ${cardsHtml}
        </div>`;
}

function renderTrayectoria() {
    if (!DOM.gridTrayectoria) return;
    const dict = TRADUCCIONES[ESTADO.idioma];
    const expHtml = renderColumnaTrayectoria(dict.colExperiencia, ESTADO.trayectoria.experiencia || []);
    const formHtml = renderColumnaTrayectoria(dict.colFormacion, ESTADO.trayectoria.formacion || []);
    DOM.gridTrayectoria.innerHTML = expHtml + formHtml;
}

async function cargarTrayectoria() {
    if (!DOM.gridTrayectoria) return;
    try {
        const res = await fetch(CONFIG.rutasDatos.trayectoria);
        if (!res.ok) throw new Error("Error cargando trayectoria.json");
        ESTADO.trayectoria = await res.json();
        renderTrayectoria();
    } catch (err) {
        console.error(err);
        DOM.gridTrayectoria.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1; text-align: center; padding: 2rem;">No se pudo cargar la trayectoria.</p>`;
    }
}

// ! ------ 7. TÍTULOS + MODAL DE PDF DESDE data/titulos.json ------ //
function abrirModalPdf(index) {
    const tituloItem = ESTADO.titulos[index];
    const { pdfModal, pdfIframe, pdfTitle, pdfMeta, pdfExternalLink } = DOM;

    if (!tituloItem || !pdfModal || !pdfIframe) return;

    const pdfRuta = t(tituloItem.pdf);
    if (pdfMeta) pdfMeta.textContent = `${t(tituloItem.institucion) || "ACREDITACIÓN"} · ${tituloItem.anio || ""}`;
    if (pdfTitle) pdfTitle.textContent = t(tituloItem.titulo);
    pdfIframe.src = pdfRuta;

    if (pdfExternalLink) {
        pdfExternalLink.href = pdfRuta;
        pdfExternalLink.textContent = TRADUCCIONES[ESTADO.idioma].abrirPdf;
    }

    pdfModal.hidden = false;
    document.body.style.overflow = "hidden";
}

function cerrarModalPdf() {
    const { pdfModal, pdfIframe } = DOM;
    if (!pdfModal) return;

    pdfModal.hidden = true;
    if (pdfIframe) pdfIframe.src = "";
    document.body.style.overflow = "";
}

function inicializarModalPdf() {
    const { pdfModal, pdfCloseBtn, pdfBackdrop } = DOM;
    if (!pdfModal) return;

    pdfCloseBtn?.addEventListener("click", cerrarModalPdf);
    pdfBackdrop?.addEventListener("click", cerrarModalPdf);

    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && !pdfModal.hidden) {
            cerrarModalPdf();
        }
    });
}

function renderTitulos() {
    if (!DOM.gridTitulos || !Array.isArray(ESTADO.titulos)) return;
    const dict = TRADUCCIONES[ESTADO.idioma];

    DOM.gridTitulos.innerHTML = ESTADO.titulos.map((item, idx) => {
        const titulo = t(item.titulo);
        return `
            <button type="button" class="diploma-card" data-pdf-index="${idx}" aria-label="${dict.verPdf}: ${titulo}">
                <div>
                    <div class="diploma-top">
                        <span class="diploma-code">${t(item.codigo) || "CERT."}</span>
                        <span>${item.anio || ""}</span>
                    </div>
                    <h3 style="margin-top: 1rem;">${titulo}</h3>
                    <div class="diploma-institution">${t(item.institucion)}</div>
                    <p>${t(item.descripcion)}</p>
                </div>
                <div class="diploma-cta">
                    <span>${dict.verPdf}</span>
                    <span aria-hidden="true">⤢</span>
                </div>
            </button>`;
    }).join("");

    DOM.gridTitulos.querySelectorAll(".diploma-card").forEach(btn => {
        btn.addEventListener("click", () => {
            abrirModalPdf(Number(btn.getAttribute("data-pdf-index")));
        });
    });
}

async function cargarTitulos() {
    if (!DOM.gridTitulos) return;
    try {
        const res = await fetch(CONFIG.rutasDatos.titulos);
        if (!res.ok) throw new Error("Error cargando titulos.json");
        ESTADO.titulos = await res.json();
        renderTitulos();
    } catch (err) {
        console.error(err);
        DOM.gridTitulos.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1; text-align: center; padding: 2rem;">No se pudieron cargar los títulos.</p>`;
    }
}

// ! ------ 8. EFECTO DE LUZ EN TARJETAS (DESKTOP) ------ //
function inicializarEfectoTarjetas() {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    document.querySelectorAll(".star-card").forEach(tarjeta => {
        tarjeta.addEventListener("mousemove", e => {
            const rect = tarjeta.getBoundingClientRect();
            tarjeta.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
            tarjeta.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
        }, { passive: true });
    });
}

// ! ------ INICIALIZACIÓN ------ //
document.addEventListener("DOMContentLoaded", () => {
    inicializarScrollSuave();
    inicializarTelevisionRetro();
    inicializarModalPdf();

    DOM.btnLang?.addEventListener("click", () => {
        aplicarIdioma(ESTADO.idioma === "es" ? "en" : "es");
    });

    aplicarIdioma(ESTADO.idioma);
    cargarProyectos();
    cargarStack();
    cargarTrayectoria();
    cargarTitulos();
});