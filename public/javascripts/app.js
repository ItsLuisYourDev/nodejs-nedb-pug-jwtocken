const enviarBtn = document.getElementById('enviarBtn');

function deleteFruit(id) {
    console.log(id)
}

function updateFruit(id) {
    console.log(id)
}

enviarBtn.addEventListener('click', (event) => {
    // Obtener los valores de los campos del formulario
    const nombre = document.getElementById('nombre').value;
    const edad = document.getElementById('edad').value;
    // Hacer algo con los datos (por ejemplo, imprimir en la consola)
    const api = 'http://127.0.0.1:3000/api/users'
    // Ejemplo de método GET
    const data={
        nombre:nombre,
        edad:edad
    }
    fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // Puedes añadir más cabeceras según sea necesario
        },
        body:JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
})