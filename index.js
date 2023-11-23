document.addEventListener("DOMContentLoaded", async () => {
    const URLPlugin = "http://localhost:8000"; // Si el plugin no está en local, coloca la IP. Por ejemplo 192.168.1.76:8000

    const $btnImprimir = document.querySelector("#btnImprimir"),
        $impresora = document.querySelector("#impresora");

    $btnImprimir.addEventListener("click", () => {
        const direccionMacDeLaImpresora = $impresora.value;
        if (!direccionMacDeLaImpresora) {
            return alert("Por favor escribe la MAC de la impresora")
        }
        demostrarCapacidades(direccionMacDeLaImpresora);
    });

    const demostrarCapacidades = async (macImpresora) => {
        const conector = new ConectorEscposAndroid(URLPlugin);
        conector
            .Iniciar()
            .EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
            .DescargarImagenDeInternetEImprimir("http://assets.stickpng.com/thumbs/587e32259686194a55adab73.png", 0, 216)
            .Iniciar() // En mi impresora debo invocar a "Iniciar" después de imprimir una imagen
            .EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
            .Feed(1)
            .EscribirTexto("Parzibyte's blog\n")
            .EscribirTexto("Blog de un programador\n")
            .EscribirTexto("Teléfono: 123456798\n")
            .EscribirTexto("Fecha y hora: " + (new Intl.DateTimeFormat("es-MX").format(new Date())))
            .Feed(1)
            .EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_IZQUIERDA)
            .EscribirTexto("____________________\n")
            .EscribirTexto("Venta de plugin para impresoras térmicas Bluetooth con Android (1 mes)\n")
            .EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_DERECHA)
            .EscribirTexto("$7.00\n")
            .EscribirTexto("____________________\n")
            .EscribirTexto("TOTAL: $7.00\n")
            .EscribirTexto("____________________\n")
            .EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
            .EstablecerEnfatizado(true)
            .EstablecerTamañoFuente(1, 1)
            .EscribirTexto("¡Gracias por su compra!\n")
            .Feed(1)
            .ImprimirCodigoDeBarras("qr", "https://parzibyte.me/blog", ConectorEscposAndroid.TAMAÑO_IMAGEN_NORMAL, 160, 160)
            .Iniciar()
            .EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
            .Feed(1)
            .ImprimirCodigoDeBarras("code128", "parzibyte.me", ConectorEscposAndroid.TAMAÑO_IMAGEN_NORMAL, 320, 50)
            .Iniciar()
            .EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
            .Feed(1)
            .EstablecerTamañoFuente(1, 1)
            .EscribirTexto("parzibyte.me\n")
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


// document.addEventListener("DOMContentLoaded", async () => {
//     const URLPlugin = "http://localhost:8000";// Si el plugin no está en local, coloca la IP. Por ejemplo 192.168.1.76:8000

//     const $btnImprimir = document.querySelector("#btnImprimir"),
//         $impresora = document.querySelector("#impresora");

//     $btnImprimir.addEventListener("click", () => {
//         const direccionMacDeLaImpresora = $impresora.value;
//         if (!direccionMacDeLaImpresora) {
//             return alert("Por favor escribe la MAC de la impresora")
//         }
//         var mensaje = document.getElementById("mensaje").value;
//         demostrarCapacidades(direccionMacDeLaImpresora, mensaje);
//     });

//     const demostrarCapacidades = async (macImpresora, mensaje) => {
//         const conector = new ConectorEscposAndroid(mensaje, URLPlugin);
//         conector
//             .Iniciar()
//             .EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
//             .DescargarImagenDeInternetEImprimir("https://i.pinimg.com/originals/d6/27/d9/d627d9cda385317de4812a4f7bd922e9.png", 0, 216)
//             .Iniciar() // En mi impresora debo invocar a "Iniciar" después de imprimir una imagen
//             .EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
//             .Feed(1)
//             .EscribirTexto(mensaje)
//             .EscribirTexto("Fecha y hora: " + (new Intl.DateTimeFormat("es-GT").format(new Date())))
//             .Feed(1)
//             .EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_IZQUIERDA)
//             .EscribirTexto("____________________\n")
//             .EscribirTexto("Prueba de impresión del hijo más guapo (1 minuto)\n")
//             .EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
//             .EstablecerEnfatizado(true)
//             .EstablecerTamañoFuente(1, 1)
//             .EscribirTexto("¡Gracias por su fe!\n")
//             .Feed(1)
//             .EstablecerTamañoFuente(1, 1)
//             .EscribirTexto("guapo.yo\n")
//             .Feed(2)
//             .Corte(1)
//             .Pulso(48, 60, 120)

//         try {
//             const respuesta = await conector.imprimirEn(macImpresora);
//             if (respuesta === true) {
//                 alert("Impreso correctamente");
//             } else {
//                 alert("Error: " + respuesta);
//             }
//         } catch (e) {
//             alert("Error imprimiendo: " + e.message);
//         }
//     }
// });