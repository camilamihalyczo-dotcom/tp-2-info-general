// Espera a que todo el HTML esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // 1. Selecciona todos los elementos necesarios
    const contactForm = document.getElementById('contact-form');
    
    // Inputs
    const callsignInput = document.getElementById('callsign');
    const emailInput = document.getElementById('email');
    const dobInput = document.getElementById('dob');
    const priorityInput = document.getElementById('priority');
    const messageInput = document.getElementById('message');
    const termsInput = document.getElementById('terms');

    // Mensajes de Error
    const callsignError = document.getElementById('callsign-error');
    const emailError = document.getElementById('email-error');
    const dobError = document.getElementById('dob-error');
    const priorityError = document.getElementById('priority-error');
    const msgError = document.getElementById('msg-error');
    const termsError = document.getElementById('terms-error');
    
    // Mensaje de Éxito
    const successMessage = document.getElementById('success-message');
    
    // Botón de envío
    const submitButton = contactForm.querySelector('button[type="submit"]');

    // 2. RegEx
    const emailRegex = /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/;
    const dobRegex = /^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/;

    // 3. Función principal de validación
    const validateForm = () => {
        let isValid = true; // Asumiendo que el formulario es válido
        
        // Oculta todos los mensajes de error al empezar
        callsignError.classList.add('hidden');
        emailError.classList.add('hidden');
        dobError.classList.add('hidden');
        priorityError.classList.add('hidden');
        msgError.classList.add('hidden');
        termsError.classList.add('hidden');

        // --- INICIO DE VALIDACIONES ---

        // Validar Callsign (Alias)
        if (callsignInput.value.trim().length < 2) {
            callsignError.classList.remove('hidden');
            isValid = false;
        }

        // Validar Email
        if (!emailRegex.test(emailInput.value)) {
            emailError.classList.remove('hidden');
            isValid = false;
        }

        // Validar Fecha de Nacimiento
        if (!dobRegex.test(dobInput.value)) {
            dobError.classList.remove('hidden');
            isValid = false;
        }

        // Validar Prioridad (Dropdown)
        if (priorityInput.value === "") {
            priorityError.classList.remove('hidden');
            isValid = false;
        }

        // Validar Mensaje
        if (messageInput.value.trim().length < 10) {
            msgError.classList.remove('hidden');
            isValid = false;
        }

        // Validar Checkbox (Términos)
        if (!termsInput.checked) {
            termsError.classList.remove('hidden');
            isValid = false;
        }

        // --- FIN DE VALIDACIONES ---

        return isValid; // true o false
    };

    // 4. Evento 'submit' del formulario
    contactForm.addEventListener('submit', (event) => {
        
        event.preventDefault(); // Para que que la página no se recargue
        
        if (validateForm()) {
            // Si el formulario es válido...
            
            // Cambia el texto del botón
            submitButton.innerText = "[ ENVIANDO... ]";
            submitButton.disabled = true; // Deshabilita el botón

            // 1. Objeto FormData con los datos del formulario
            const formData = new FormData(contactForm);
            
            // 2. Datos a un objeto JSON
            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });
            const json = JSON.stringify(object);

            // 3. Usa fetch para enviar el JSON a Web3Forms
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let jsonResponse = await response.json();
                if (response.status == 200) {
                   // Éxito
                    successMessage.classList.remove('hidden');
                    contactForm.reset(); // Limpia el formulario
                } else {
                    // Hubo un error en el servidor
                    console.log(response);
                    alert(`Error: ${jsonResponse.message}`);
                }
            })
            .catch(error => {
                // Hubo un error de red u otro
                console.log(error);
                alert("Error al enviar la transmisión. Intente de nuevo.");
            })
            .finally(() => {
                // Pase lo que pase, volvemos a habilitar el botón
                submitButton.innerText = "[ Enviar Transmisión ]";
                submitButton.disabled = false;
                
                // Ocultamos el mensaje de éxito después de 3 seg
                setTimeout(() => {
                    successMessage.classList.add('hidden');
                }, 3000);
            });
            
        } else {
            // Si hay errores de validación...
            console.log('Formulario inválido, por favor revise los errores.');
        }
    });
});