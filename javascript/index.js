const btnDerecha = document.querySelector("#botonDerecha");
const btnIzquierda = document.querySelector("#botonIzquierda");

const contenedor =  document.querySelector(".carrusel");

btnDerecha.addEventListener("click", () =>{
    contenedor.scrollLeft -= 800;
});

btnIzquierda.addEventListener("click", () =>{
    contenedor.scrollLeft += 800;
});