document.getElementById('anterior').addEventListener('click', async () => {
    cambiarPagina(-1);
});

document.getElementById('siguiente').addEventListener('click', async () => {
    cambiarPagina(1);
});

let currentPage = 1;

function cambiarPagina(direccion) {
    currentPage += direccion;
    if (currentPage < 1) {
        currentPage = 1;
    }
    obtenerPersonajes();
}

function mostrarPersonajes(personajes) {
    const personajesList = document.getElementById('personajes-list');
    // Limpia la lista actual antes de agregar nuevos elementos
    personajesList.innerHTML = '';

    // Itera sobre los personajes y crea elementos <li> para mostrarlos
    personajes.forEach((personaje) => {
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
    if (matches && matches[1]) {
        return matches[1];
    }
    return null;
}

async function obtenerInformacionPlaneta(planetId) {
    try {
        const response = await fetch(`/planeta/${planetId}`);
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Error al obtener información del planeta');
        }
    } catch (error) {
        console.error(error);
    }
}

function mostrarInformacionPlaneta(planeta) {
    const planetaInfo = document.getElementById('planeta-info');
    // Actualiza el contenido de la sección con la información del planeta
    planetaInfo.innerHTML = `<h2>Planeta de origen:</h2><p>${planeta.name}</p>`;
}

function actualizarPaginacion() {
    document.getElementById('page-number').textContent = `Página ${currentPage}`;
    obtenerPersonajes();
}

async function obtenerPersonajes() {
    // Solicitud al backend para obtener personajes paginados
    try {
        const response = await fetch(`/personajes?page=${currentPage}`);
        if (response.ok) {
            const data = await response.json();
            mostrarPersonajes(data);
        } else {
            console.error('Error al obtener personajes');
        }
    } catch (error) {
        console.error(error);
    }
}

obtenerPersonajes();
