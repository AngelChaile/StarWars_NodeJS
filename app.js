document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('anterior').addEventListener('click', () => cambiarPagina(-1));
    document.getElementById('siguiente').addEventListener('click', () => cambiarPagina(1));
    obtenerPersonajes();
});

let currentPage = 1;

function cambiarPagina(direccion) {
    if (currentPage + direccion > 0) {
        currentPage += direccion;
        obtenerPersonajes();
    }
}

function mostrarPersonajes(personajes) {
    const personajesList = document.getElementById('personajes-list');
    personajesList.innerHTML = '';

    // Itera sobre los personajes y crea elementos <li> para mostrarlos
    personajes.forEach(personaje => {
        const listItem = document.createElement('li');
        listItem.textContent = personaje.name;

        // Agrega un evento clic para mostrar información del planeta
        listItem.addEventListener('click', async () => {
            const planetId = obtenerIdDelPlaneta(personaje.homeworld);
            if (planetId) {
                const planeta = await obtenerInformacionPlaneta(planetId);
                mostrarInformacionPlaneta(planeta);
            }
        });

        personajesList.appendChild(listItem);
    });

    actualizarPaginacion();
}

function obtenerIdDelPlaneta(url) {
    const matches = url.match(/(\d+)\/$/);
    return matches ? matches[1] : null;
}

async function obtenerInformacionPlaneta(planetId) {
    try {
        const response = await fetch(`/planeta/${planetId}`);
        if (!response.ok) throw new Error('Error al obtener información del planeta');

        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

function mostrarInformacionPlaneta(planeta) {
    document.getElementById('planeta-info').innerHTML = `<h2>Planeta de origen:</h2><p>${planeta.name}</p>`;
}

function actualizarPaginacion() {
    document.getElementById('page-number').textContent = `Página ${currentPage}`;
}

async function obtenerPersonajes() {
// Solicitud al backend para obtener personajes paginados
    try {
        const response = await fetch(`/personajes?page=${currentPage}`);
        if (!response.ok) throw new Error('Error al obtener personajes');

        const data = await response.json();
        mostrarPersonajes(data);
        actualizarPaginacion();
    } catch (error) {
        console.error(error);
    }
}
