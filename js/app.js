// ------ RUTAS DE DATOS JSON ------ //
const RUTAS_DATOS = {
    demos: "./data/demos.json",
    trayectoria: "./data/trayectoria.json",
    titulos: "./data/titulos.json"
};

const RUTA_FRAMES_TV = "img/FramesTV";
const MAX_FRAMES_TV = 20;

const gridDemos = document.getElementById("grid-demos");
const gridTrayectoria = document.getElementById("grid-trayectoria");
const gridTitulos = document.getElementById("grid-titulos");

let demosData = [];
let trayectoriaData = { experiencia: [], formacion: [] };
let titulosData = [];
let idiomaActual = localStorage.getItem("tvci_lang") === "en" ? "en" : "es";

// ------ DICCIONARIO DE INTERFAZ (ES / EN) ------ //
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
        stackCat1: "01 // DESARROLLO",
        stackCard1: "Lenguajes & Frameworks",
        stackCat2: "02 // DATOS & ENTORNO",
        stackCard2: "Bases de Datos & Tools",
        stackCat3: "03 // FLUJO DE TRABAJO",
        stackCard3: "Metodologías & Perfil",
        chipMvc: "Arquitectura MVC",
        chipResp: "Diseño Responsivo",
        chipEng: "Inglés Intermedio",
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
        stackCat1: "01 // DEVELOPMENT",
        stackCard1: "Languages & Frameworks",
        stackCat2: "02 // DATA & ENVIRONMENT",
        stackCard2: "Databases & Tools",
        stackCat3: "03 // WORKFLOW",
        stackCard3: "Methodologies & Profile",
        chipMvc: "MVC Architecture",
        chipResp: "Responsive Design",
        chipEng: "Intermediate English",
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

function t(campo) {
    if (campo && typeof campo === "object") {
        return campo[idiomaActual] || campo.es || "";
    }
    return campo || "";
}

// ------ 1. CAMBIO DE IDIOMA ------ //
function aplicarIdioma(lang) {
    idiomaActual = lang === "en" ? "en" : "es";
    localStorage.setItem("tvci_lang", idiomaActual);
    document.documentElement.lang = idiomaActual;

    const dict = TRADUCCIONES[idiomaActual];

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) el.textContent = dict[key];
    });

    const btnToggle = document.getElementById("btn-lang-toggle");
    if (btnToggle) {
        btnToggle.textContent = dict.toggleBtnLabel;
        btnToggle.setAttribute("aria-label", idiomaActual === "es" ? "Switch language to English" : "Cambiar idioma a Español");
    }

    const openLink = document.getElementById("pdf-external-link");
    if (openLink) openLink.textContent = dict.abrirPdf;

    renderProyectos();
    renderTrayectoria();
    renderTitulos();
}

// ------ 2. SCROLL SUAVE ------ //
function inicializarScrollSuave() {
    const enlacesInternos = document.querySelectorAll('.nav-links a[href^="#"], .brand[href^="#"], .js-scroll-link[href^="#"]');
    const header = document.getElementById("top-header");

    enlacesInternos.forEach(enlace => {
        enlace.addEventListener("click", e => {
            const destinoId = enlace.getAttribute("href");
            if (!destinoId || destinoId === "#") return;

            const seccionDestino = document.querySelector(destinoId);
            if (!seccionDestino) return;

            e.preventDefault();
            const offsetHeader = header ? header.offsetHeight + 12 : 24;
            const posicionY = seccionDestino.getBoundingClientRect().top + window.scrollY - offsetHeader;

            window.scrollTo({
                top: Math.max(0, posicionY),
                behavior: "smooth"
            });
        });
    });
}

// ------ 3. TELEVISIÓN RETRO: DETECCIÓN DINÁMICA DE FrameTv{n}.jpg ------ //
function comprobarImagen(src) {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => resolve(null);
        img.src = src;
    });
}

async function descubrirFramesTv() {
    const encontrados = [];
    for (let i = 1; i <= MAX_FRAMES_TV; i++) {
        const ruta = `${RUTA_FRAMES_TV}/FrameTv${i}.jpg`;
        const valida = await comprobarImagen(ruta);
        if (!valida) break;
        encontrados.push(valida);
    }
    return encontrados.length ? encontrados : [`${RUTA_FRAMES_TV}/FrameTv1.jpg`];
}

async function inicializarTelevisionRetro() {
    const tvElemento = document.getElementById("retro-tv");
    const tvImg = document.getElementById("tv-screen-img");
    const canalLabel = document.getElementById("tv-channel-label");
    const dialPrincipal = document.getElementById("tv-dial-main");

    if (!tvElemento || !tvImg) return;

    const framesTv = await descubrirFramesTv();
    let indiceActual = 0;

    function actualizarEtiquetaCanal() {
        if (!canalLabel) return;
        const numeroFormateado = String(indiceActual + 1).padStart(2, "0");
        canalLabel.textContent = `CH ${numeroFormateado} / ${TRADUCCIONES[idiomaActual].tvChannelSuffix}`;
    }

    tvImg.src = framesTv[0];
    actualizarEtiquetaCanal();

    if (framesTv.length <= 1) return;

    function cambiarCanal(siguienteIndice) {
        indiceActual = siguienteIndice % framesTv.length;
        tvImg.classList.add("is-switching");

        setTimeout(() => {
            tvImg.src = framesTv[indiceActual];
            actualizarEtiquetaCanal();
            if (dialPrincipal) {
                dialPrincipal.style.transform = `rotate(${indiceActual * 55}deg)`;
            }
            tvImg.classList.remove("is-switching");
        }, 160);
    }

    let intervaloTv = setInterval(() => {
        if (!document.hidden) cambiarCanal(indiceActual + 1);
    }, 3200);

    tvElemento.addEventListener("click", () => {
        clearInterval(intervaloTv);
        cambiarCanal(indiceActual + 1);
        intervaloTv = setInterval(() => {
            if (!document.hidden) cambiarCanal(indiceActual + 1);
        }, 3200);
    });
}

// ------ 4. PROYECTOS DESDE data/demos.json ------ //
function renderProyectos() {
    if (!gridDemos || !Array.isArray(demosData)) return;
    const dict = TRADUCCIONES[idiomaActual];

    gridDemos.innerHTML = demosData.map(demo => {
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
    if (!gridDemos) return;
    try {
        const res = await fetch(RUTAS_DATOS.demos);
        if (!res.ok) throw new Error("Error cargando demos.json");
        demosData = await res.json();
        renderProyectos();
    } catch (err) {
        console.error(err);
        gridDemos.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1; text-align: center; padding: 2rem;">No se pudieron cargar los proyectos.</p>`;
    }
}

// ------ 5. TRAYECTORIA DESDE data/trayectoria.json ------ //
function renderColumnaTrayectoria(tituloColumna, items) {
    const dict = TRADUCCIONES[idiomaActual];
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
    if (!gridTrayectoria) return;
    const dict = TRADUCCIONES[idiomaActual];
    const expHtml = renderColumnaTrayectoria(dict.colExperiencia, trayectoriaData.experiencia || []);
    const formHtml = renderColumnaTrayectoria(dict.colFormacion, trayectoriaData.formacion || []);
    gridTrayectoria.innerHTML = expHtml + formHtml;
}

async function cargarTrayectoria() {
    if (!gridTrayectoria) return;
    try {
        const res = await fetch(RUTAS_DATOS.trayectoria);
        if (!res.ok) throw new Error("Error cargando trayectoria.json");
        trayectoriaData = await res.json();
        renderTrayectoria();
    } catch (err) {
        console.error(err);
        gridTrayectoria.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1; text-align: center; padding: 2rem;">No se pudo cargar la trayectoria.</p>`;
    }
}

// ------ 6. TÍTULOS + MODAL DE PDF DESDE data/titulos.json ------ //
function abrirModalPdf(index) {
    const tituloItem = titulosData[index];
    const modal = document.getElementById("pdf-modal");
    const iframe = document.getElementById("pdf-iframe");
    const modalTitle = document.getElementById("pdf-modal-title");
    const modalMeta = document.getElementById("pdf-modal-meta");
    const externalLink = document.getElementById("pdf-external-link");

    if (!tituloItem || !modal || !iframe) return;

    const pdfRuta = t(tituloItem.pdf);
    modalMeta.textContent = `${t(tituloItem.institucion) || "ACREDITACIÓN"} · ${tituloItem.anio || ""}`;
    modalTitle.textContent = t(tituloItem.titulo);
    iframe.src = pdfRuta;
    if (externalLink) {
        externalLink.href = pdfRuta;
        externalLink.textContent = TRADUCCIONES[idiomaActual].abrirPdf;
    }

    modal.hidden = false;
    document.body.style.overflow = "hidden";
}

function cerrarModalPdf() {
    const modal = document.getElementById("pdf-modal");
    const iframe = document.getElementById("pdf-iframe");
    if (!modal) return;

    modal.hidden = true;
    if (iframe) iframe.src = "";
    document.body.style.overflow = "";
}

function inicializarModalPdf() {
    const modal = document.getElementById("pdf-modal");
    const closeBtn = document.getElementById("pdf-modal-close");
    const backdrop = document.getElementById("pdf-modal-backdrop");

    if (!modal) return;

    closeBtn?.addEventListener("click", cerrarModalPdf);
    backdrop?.addEventListener("click", cerrarModalPdf);

    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && !modal.hidden) {
            cerrarModalPdf();
        }
    });
}

function renderTitulos() {
    if (!gridTitulos || !Array.isArray(titulosData)) return;
    const dict = TRADUCCIONES[idiomaActual];

    gridTitulos.innerHTML = titulosData.map((item, idx) => {
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

    gridTitulos.querySelectorAll(".diploma-card").forEach(btn => {
        btn.addEventListener("click", () => {
            abrirModalPdf(Number(btn.getAttribute("data-pdf-index")));
        });
    });
}

async function cargarTitulos() {
    if (!gridTitulos) return;
    try {
        const res = await fetch(RUTAS_DATOS.titulos);
        if (!res.ok) throw new Error("Error cargando titulos.json");
        titulosData = await res.json();
        renderTitulos();
    } catch (err) {
        console.error(err);
        gridTitulos.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1; text-align: center; padding: 2rem;">No se pudieron cargar los títulos.</p>`;
    }
}

// ------ 7. EFECTO DE LUZ EN TARJETAS (DESKTOP) ------ //
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

// ------ INICIALIZACIÓN ------ //
document.addEventListener("DOMContentLoaded", () => {
    inicializarScrollSuave();
    inicializarTelevisionRetro();
    inicializarModalPdf();

    const btnLang = document.getElementById("btn-lang-toggle");
    btnLang?.addEventListener("click", () => {
        aplicarIdioma(idiomaActual === "es" ? "en" : "es");
    });

    aplicarIdioma(idiomaActual);
    cargarProyectos();
    cargarTrayectoria();
    cargarTitulos();
});