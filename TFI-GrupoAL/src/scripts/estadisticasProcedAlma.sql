--------- comienzo salones mas reservados ---------
DELIMITER $$
CREATE PROCEDURE sp_salones_mas_reservados()
BEGIN
    SELECT 
        s.salon_id,
        s.titulo,
        COUNT(r.reserva_id) as cantidad_reservas,
        SUM(r.importe_total) as ingresos_totales
    FROM salones s
    INNER JOIN reservas r ON s.salon_id = r.salon_id
    WHERE s.activo = 1 AND r.activo = 1
    GROUP BY s.salon_id
    ORDER BY cantidad_reservas DESC;
END$$

--------- comienzo servicios mas solicitados ---------
CREATE PROCEDURE sp_servicios_mas_solicitados()
BEGIN
    SELECT 
        s.servicio_id,
        s.descripcion,
        COUNT(rs.reserva_servicio_id) as veces_solicitado,
        SUM(rs.importe) as ingresos_generados
    FROM servicios s
    INNER JOIN reservas_servicios rs ON s.servicio_id = rs.servicio_id
    WHERE s.activo = 1
    GROUP BY s.servicio_id
    ORDER BY veces_solicitado DESC;
END$$

--------- cominezo turnos más reservados ---------
CREATE PROCEDURE sp_turnos_mas_reservados()
BEGIN
    SELECT 
        t.turno_id,
        t.hora_desde,
        t.hora_hasta,
        COUNT(r.reserva_id) as cantidad_reservas
    FROM turnos t
    INNER JOIN reservas r ON t.turno_id = r.turno_id
    WHERE t.activo = 1 AND r.activo = 1
    GROUP BY t.turno_id
    ORDER BY cantidad_reservas DESC;
END$$

DELIMITER ;