document.querySelector('#boton').addEventListener('click', traerDatos);

function traerDatos() {

    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'texto.txt', true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.querySelector('#respuesta').innerHTML = this.responseText;
        }
    }

}