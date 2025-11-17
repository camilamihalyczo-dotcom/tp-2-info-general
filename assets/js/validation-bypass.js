// assets/js/validation-bypass.js

document.addEventListener('DOMContentLoaded', () => {

    // --- FRASE SECRETA ---
    // (La frase completa del Easter Egg. En minúscula)
    const secretPassphrase = "el clitoris es una linea directa a la matriz";

    // 1. Selecciona todos los elementos que necesitamos
    const loginForm = document.getElementById('login-form');
    const passphraseInput = document.getElementById('passphrase');
    const errorMessage = document.getElementById('error-message');
    const developerInfo = document.getElementById('developer-info');

    // Nos aseguramos de que el script solo corra si estamos en la página correcta
    // (es decir, la página de credenciales)
    if (loginForm && passphraseInput && errorMessage && developerInfo) {

        // 2. Evento 'submit' del formulario
        loginForm.addEventListener('submit', (event) => {
            
            // Para que la página se recargue (comportamiento por defecto)
            event.preventDefault(); 

            // 3. El valor del input, se limpia y se pasa a minúscula
            const userInput = passphraseInput.value.trim().toLowerCase();

            // 4. Compara el input del usuario con la frase secreta
            if (userInput === secretPassphrase) {
                // ¡ÉXITO!
                
                // Oculta el mensaje de error (si estaba visible)
                errorMessage.classList.add('hidden');
                
                // Oculta el formulario
                loginForm.classList.add('hidden');
                
                // Div con tus datos y la bibliografía
                developerInfo.classList.remove('hidden');
                
            } else {
                // ¡ERROR!
                
                // El mensaje de "ACCESO DENEGADO"
                errorMessage.classList.remove('hidden');
                
                // Borra el contenido del input para que intente de nuevo
                passphraseInput.value = "";
            }
        });
    }
});