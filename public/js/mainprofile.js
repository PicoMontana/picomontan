const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const tab = $$('.box_content .myStt .details')
const first = $('.idea .dashboard.first')
console.log(first)

const content = tab.forEach(function(item, index) {
    item.onclick = function() {
        $('.box_content .myStt .details.active').classList.remove('active')
        this.classList.add('active')

        first.style.marginLeft = -100 * index + '%'
    }
})

function getImg() {
    const input = $('.box .box_info .avatar input[type="file"]')
    const img = $('.box .box_info .avatar img')
    input.addEventListener('change', function() {
        img.src = URL.createObjectURL(input.files[0])
    })
}

getImg()

document.addEventListener('DOMContentLoaded', function() {
    const editButton = document.getElementById('editButton');
    const modal = document.getElementById('editModal');
    const closeModal = document.getElementById('closeModal');
    const profilePic = document.getElementById('profilePic');
    const userName = document.getElementById('userName');
    const editProfileForm = document.getElementById('editProfileForm');

    // Mostrar el modal al hacer clic en el botón de editar
    editButton.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    // Cerrar el modal al hacer clic en el botón de cerrar
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Cerrar el modal al hacer clic fuera del contenido del modal
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Actualizar la información del perfil al enviar el formulario
    editProfileForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const newName = document.getElementById('editName').value;
        const newPassword = document.getElementById('editPassword').value;
        const newProfilePic = document.getElementById('editProfilePic').files[0];

        if (newName) {
            userName.textContent = newName;
        }

        if (newProfilePic) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePic.src = e.target.result;
            }
            reader.readAsDataURL(newProfilePic);
        }

        modal.style.display = 'none';
    });

    // Simular obtener el nombre del usuario automáticamente (por ejemplo, desde la base de datos o API)
    const user = {
        name: 'UsuarioEjemplo',
        // Otros detalles del usuario...
    };
    userName.textContent = user.name;
});

$(document).ready(function() {
    var modal = $('#myModal');

    // Al hacer clic en el botón de editar perfil
    $('#edit-profile').click(function() {
        modal.css('display', 'block');
    });

    // Al hacer clic en el botón de cerrar
    $('.close-button').click(function() {
        modal.css('display', 'none');
    });

    // Al hacer clic fuera del modal
    $(window).click(function(event) {
        if ($(event.target).is(modal)) {
            modal.css('display', 'none');
        }
    });
});


//eliminacion de tarjetas

