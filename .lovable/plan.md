# Proyección anual en la calculadora de horas

## Objetivo
Añadir una segunda pestaña, **Proyección anual**, dentro de `/calculadora-horas`, reutilizando exactamente la semana configurada en **Semana** y sin alterar su comportamiento actual.

## Implementación
- Crear un fichero independiente con los festivos oficiales de 2026 incluidos en el documento, organizado por año y comunidad para poder añadir 2027 sin cambiar los cálculos.
- Añadir las pestañas **Semana** y **Proyección anual**, conservando los datos introducidos al cambiar entre ellas.
- Incorporar los campos anuales: comunidad, isla de Canarias, Val d'Aran, dos festivos locales, festivos activables, vacaciones, permisos y jornada anual del convenio.
- Calcular el año día a día según las horas de cada día de la semana, descontando únicamente festivos laborables, vacaciones y permisos.
- Mostrar horas anuales en ambos formatos, recuentos de días, comparación con el convenio, promedio semanal legal y desglose mensual.
- Añadir el calendario anual plegable, la fuente oficial del BOE y el aviso orientativo.
- Exportar un PDF anual con calendario y resumen, y un CSV con una fila por fecha, sin enviar datos fuera del navegador.
- Mostrar la llamada a la acción específica de la proyección anual.

## Comprobaciones
- Validar el estado vacío y la conversión de vacaciones naturales a laborables.
- Comprobar festivos autonómicos, festivo insular canario, excepción de Val d'Aran y festivos locales.
- Verificar totales anuales, meses, comparación con convenio, aviso de más de 40 horas y ambos archivos exportables.
- Revisar la herramienta completa en móvil y escritorio, sin cambios en la pestaña Semana ni en otras páginas.

## Detalles técnicos
- Separar datos, cálculo anual y presentación para que próximos años puedan añadirse sin reescribir la herramienta.
- Mantener todo el cálculo local en el navegador y reutilizar la lógica semanal actual como fuente de horas por día.
