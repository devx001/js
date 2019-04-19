var contenido = document.querySelector('#contenido');

function traer() {
    fetch('https://randomuser.me/api/')
        .then(data => data.json())
        .then(data => {
            console.log(data.results['0']);
            contenido.innerHTML = `
                    <img src="${data.results['0'].picture.large}" width="100px" class="img-fluid rounded-circle">
                    <p>Nombre: ${data.results['0'].name.first} ${data.results['0'].name.last}</p>`;
        });
}