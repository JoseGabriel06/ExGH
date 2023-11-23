function imprimir(nombre){
    var texto = document.getElementById("info").value;
    if (texto.length < 1) {
        alert("Es necesario un texto.");
    }else{
        var ficha = document.getElementById(nombre);
        var ventimp = window.open(' ', 'popimpr');
        ventimp.document.write( ficha.innerHTML );
        ventimp.document.close();
        ventimp.print( );
        ventimp.close();
    }
}