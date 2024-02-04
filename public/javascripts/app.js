const enviarBtn = document.getElementById('enviarBtn');

function deleteFruit(id) {
    console.log(id)
}

function updateFruit(id) {
    console.log(id)
}

enviarBtn.addEventListener('click', (event) => {
    event.preventDefault();
    // Obtener los valores de los campos del formulario
    const nombre = document.getElementById('nombre').value;
    const edad = document.getElementById('edad').value;
    // Hacer algo con los datos (por ejemplo, imprimir en la consola)
    const api = 'http://127.0.0.1:3000/api/users'
    // Ejemplo de método GET
    const data = {
        nombre: nombre,
        edad: edad
    }
    fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzA3MDI5NDI1LCJleHAiOjE3MDcwMzMwMjV9.1gXaTeAEruKAVLo30v06Ey5vucBNnG81mP_K0rYZzQc'
            // Puedes añadir más cabeceras según sea necesario
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
})