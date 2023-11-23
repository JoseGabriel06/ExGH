document.addEventListener("DOMContentLoaded", async () => {
    const URLPlugin = "http://localhost:8000"; // Si el plugin no está en local, coloca la IP. Por ejemplo 192.168.1.76:8000

    const $btnImprimir = document.querySelector("#btnImprimir"),
        $licencia = document.querySelector("#licencia"),
        $impresora = document.querySelector("#impresora"),
        $mensaje = document.querySelector("#mensaje");
    $btnImprimir.addEventListener("click", () => {
        const direccionMacDeLaImpresora = $impresora.value;
        const licencia = $licencia.value;
        const mensaje = $mensaje.value;
        if (!direccionMacDeLaImpresora) {
            return alert("Por favor escribe la MAC de la impresora")
        }
        demostrarCapacidades(direccionMacDeLaImpresora, licencia, mensaje);
    });

    const demostrarCapacidades = async (macImpresora, licencia, mensaje) => {
        const conector = new ConectorEscposAndroid(licencia, URLPlugin);
        conector
        .Iniciar()
        .EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
        .DescargarImagenDeInternetEImprimir("https://i.pinimg.com/originals/d6/27/d9/d627d9cda385317de4812a4f7bd922e9.png", 0, 216)
        .Iniciar() // En mi impresora debo invocar a "Iniciar" después de imprimir una imagen
        .EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
        .Feed(1)
        .EscribirTexto(mensaje)
        .EscribirTexto("Fecha y hora: " + (new Intl.DateTimeFormat("es-MX").format(new Date())))
        .Feed(1)
        .EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_IZQUIERDA)
        .EscribirTexto("________\n")
        .EscribirTexto("Prueba de impresión del hijo más guapo (1 minuto)\n")
        .EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
        .EstablecerEnfatizado(true)
        .EstablecerTamañoFuente(1, 1)
        .EscribirTexto("¡Gracias por su fe!\n")
        .Feed(1)
        .EstablecerTamañoFuente(1, 1)
        .EscribirTexto("guapo.yo\n")
        .Feed(2)
        .Corte(1)
        .Pulso(48, 60, 120)

    try {
        const respuesta = await conector.imprimirEn(macImpresora);
        if (respuesta === true) {
            alert("Impreso correctamente");
        } else {
            alert("Error: " + respuesta);
        }
    } catch (e) {
        alert("Error imprimiendo: " + e.message);
    }
}
});
