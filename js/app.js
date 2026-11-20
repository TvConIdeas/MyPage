// ------ CARGA DE DEMOS Y CONFIGURACIÓN DE INTERFAZ ------ //
const RUTA_JSON = "./data/demos.json";
const gridDemos = document.getElementById("grid-demos");

// ------ FUNCIÓN PARA CARGAR EL CATÁLOGO DE PROYECTOS ------ //
async function cargarConstelacionDemos() {
    try {
        const respuesta = await fetch(RUTA_JSON);
        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el catálogo de proyectos.");
        }
        const demos = await respuesta.json();

        gridDemos.innerHTML = demos.map((demo, index) => {
            const bloqueImagen = demo.imagen
                ? `<div class="project-thumb">
                       <img src="${demo.imagen}" alt="Vista previa de ${demo.titulo}" loading="lazy" onerror="this.parentElement.style.display='none'">
                   </div>`
                : "";

            return `
            <div class="star-card-wrapper" style="animation-delay: ${0.09 * (index + 1)}s;">
                <article class="star-card">
                    <div class="star-card-top">
                        ${bloqueImagen}
                        <div class="star-card-header">
                            <span class="star-tag">${demo.estrella}</span>
                            <span>${demo.etiqueta}</span>
                        </div>
                        <h4>${demo.titulo}</h4>
                        <p>${demo.descripcion}</p>
                    </div>
                    <a href="${demo.linkDemo}" target="_blank" rel="noopener noreferrer" class="btn-star-link">
                        Explorar proyecto
                    </a>
                </article>
            </div>
        `;
        }).join("");

        inicializarEfectoTarjetas();

    } catch (error) {
        console.error("Error al cargar los proyectos:", error);
        gridDemos.innerHTML = `<p style="color: var(--accent-gold); grid-column: 1/-1; text-align: center; padding: 2rem;">Interferencia temporal en la señal. Por favor, recargá la página.</p>`;
    }
}

// ------ EFECTO INTERACTIVO DE LUZ SUAVE EN TARJETAS ------ //
function inicializarEfectoTarjetas() {
    const tarjetas = document.querySelectorAll(".star-card");
    tarjetas.forEach(tarjeta => {
        tarjeta.addEventListener("mousemove", e => {
            const rect = tarjeta.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            tarjeta.style.setProperty("--mouse-x", `${x}px`);
            tarjeta.style.setProperty("--mouse-y", `${y}px`);
        });
    });
}

// ------ INICIALIZACIÓN DEL SISTEMA ------ //
document.addEventListener("DOMContentLoaded", () => {
    cargarConstelacionDemos();
});