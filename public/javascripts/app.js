// const enviarBtn = document.getElementById('enviarBtn');

// function deleteFruit(id) {
//     console.log(id)
// }

// function updateFruit(id) {
//     console.log(id)
// }

// enviarBtn.addEventListener('click', (event) => {
//     event.preventDefault();
//     // Obtener los valores de los campos del formulario
//     const nombre = document.getElementById('nombre').value;
//     const edad = document.getElementById('edad').value;
//     // Hacer algo con los datos (por ejemplo, imprimir en la consola)
//     const api = 'http://127.0.0.1:3000/api/users'
//     // Ejemplo de método GET
//     const data = {
//         nombre: nombre,
//         edad: edad
//     }
//     fetch(api, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzA3MDI5NDI1LCJleHAiOjE3MDcwMzMwMjV9.1gXaTeAEruKAVLo30v06Ey5vucBNnG81mP_K0rYZzQc'
//             // Puedes añadir más cabeceras según sea necesario
//         },
//         body: JSON.stringify(data)
//     })
//         .then(response => response.json())
//         .then(data => console.log(data))
//         .catch(error => console.error('Error:', error));
// })

// chat
const list_categorias = document.querySelectorAll(".categoria")
const list_contenido = document.getElementById("contenido_lista")
const contenct_input = document.getElementById('Container_input_texto')
const api = "http://127.0.0.1:3000/api/chats/"

txtHtml(list_contenido, "eesre es el fej")

list_categorias.forEach(categoria => {
    console.log("clip")
    categoria.addEventListener("click", () => {
        const id_categoria = categoria.getAttribute("id")
        let url = api.concat(id_categoria)

        fetch(url)
            .then(response => {
                if (!response) {
                    throw new Error(' la solicitud fallo ')
                }
                return response.json();

            })
            .then(data => {
                console.log(data)
                txtHtml(list_contenido, '')
                txtHtml(contenct_input, '')

                const cont = data.contenido;
                for (let i = 0; i < cont.length; i++) {
                    const hijo = document.createElement('div')
                    hijo.innerHTML = cont[i]
                    list_contenido.appendChild(hijo)
                }

                const imput = document.createElement('input')
                const summit = document.createElement('button')
                imput.setAttribute("id", "input_text")
                imput.setAttribute("onkeydown", `handleKeyPress(event,"${id_categoria}")`)
                summit.setAttribute("id", "buton_send_text")
                const send_data = `send_data("${id_categoria}")`
                summit.setAttribute("onclick", send_data)
                txtHtml(summit, "boton")
                contenct_input.appendChild(imput)
                contenct_input.appendChild(summit)
                list_contenido.scrollTop = list_contenido.scrollHeight;
            })
            .catch(erro => {
                console.error('error', erro);
            })
    })
})
function addHIjo(divPadre, cont) {
    const newHijo = document.createElement("div")
    newHijo.className = 'new-message';
    newHijo.innerHTML = cont
    divPadre.appendChild(newHijo)
    divPadre.scrollTop = divPadre.scrollHeight;
}

function txtHtml(elemento, txt) {
    elemento.innerHTML = txt
}

function send_data(id) {
    const texto = document.getElementById("input_text")
    addHIjo(list_contenido, texto.value)
    var datosParaEnviar = {
        dataTxt: texto.value
    };
    let url = `${api}${id}`
    texto.value = ''
    sendPut(url, datosParaEnviar)
}

function sendPut(url, datos) {
    console.log(datos)
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos) // Convierte los datos a una cadena JSON
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error('La solicitud no se pudo completar correctamente.');
            }
            return response.json(); // Analizar la respuesta JSON
        })
        .then(function (data) {
            console.log(data); // Hacer algo con los datos JSON recibidos del servidor
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
}


// Función para manejar la tecla Enter
function handleKeyPress(event, id) {
    if (event.key === 'Enter') {
        send_data(id)
    }
}