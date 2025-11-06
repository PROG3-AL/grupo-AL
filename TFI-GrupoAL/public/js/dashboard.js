const ENDPOINT_ESTADISTICAS = '/api/v1/estadisticas/dashboard';

        // salones más reservados
        async function cargarSalones() {
            try {
                const response = await fetch(`${ENDPOINT_ESTADISTICAS}/salones`);
                const data = await response.json();
                
                const container = document.getElementById('salones-content');
                
                if (data.estado === true && data.datos && data.datos.length > 0) {
                    container.innerHTML = `
                        <table class="estadisticas-table">
                            <thead>
                                <tr>
                                    <th>Salón</th>
                                    <th>Reservas</th>
                                    <th>Ingresos</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${data.datos.map(salon => `
                                    <tr>
                                        <td>${salon.titulo}</td>
                                        <td><span class="badge">${salon.cantidad_reservas}</span></td>
                                        <td>$${parseFloat(salon.ingresos_totales).toLocaleString('es-AR')}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    `;
                } else {
                    container.innerHTML = '<div class="no-data">No hay datos disponibles</div>';
                }
            } catch (error) {
                document.getElementById('salones-content').innerHTML = 
                    `<div class="error">Error al cargar los datos: ${error.message}</div>`;
            }
        }

        // servicios más solicitados
        async function cargarServicios() {
            try {
                const response = await fetch(`${ENDPOINT_ESTADISTICAS}/servicios`);
                const data = await response.json();
                
                const container = document.getElementById('servicios-content');
                
                if (data.estado === true && data.datos && data.datos.length > 0) {
                    container.innerHTML = `
                        <table class="estadisticas-table">
                            <thead>
                                <tr>
                                    <th>Servicio</th>
                                    <th>Solicitudes</th>
                                    <th>Ingresos</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${data.datos.map(servicio => `
                                    <tr>
                                        <td>${servicio.descripcion}</td>
                                        <td><span class="badge">${servicio.veces_solicitado}</span></td>
                                        <td>$${parseFloat(servicio.ingresos_generados).toLocaleString('es-AR')}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    `;
                } else {
                    container.innerHTML = '<div class="no-data">No hay datos disponibles</div>';
                }
            } catch (error) {
                document.getElementById('servicios-content').innerHTML = 
                    `<div class="error">Error al cargar los datos: ${error.message}</div>`;
            }
        }

        // turnos más reservados
        async function cargarTurnos() {
            try {
                const response = await fetch(`${ENDPOINT_ESTADISTICAS}/turnos`);
                const data = await response.json();
                
                const container = document.getElementById('turnos-content');
                
                if (data.estado === true && data.datos && data.datos.length > 0) {
                    container.innerHTML = `
                        <table class="estadisticas-table">
                            <thead>
                                <tr>
                                    <th>Turno</th>
                                    <th>Reservas</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${data.datos.map(turno => `
                                    <tr>
                                        <td>${turno.hora_desde} - ${turno.hora_hasta}</td>
                                        <td><span class="badge">${turno.cantidad_reservas}</span></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    `;
                } else {
                    container.innerHTML = '<div class="no-data">No hay datos disponibles</div>';
                }
            } catch (error) {
                document.getElementById('turnos-content').innerHTML = 
                    `<div class="error">Error al cargar los datos: ${error.message}</div>`;
            }
        }

        // cargar los datos al inicio
        window.addEventListener('DOMContentLoaded', () => {
            cargarSalones();
            cargarServicios();
            cargarTurnos();
        });