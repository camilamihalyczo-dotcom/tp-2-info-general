document.addEventListener('DOMContentLoaded', () => {

    // --- FRASES SECRETAS (Array con opciones) ---
    // Agregamos todas las combinaciones válidas (con y sin tildes)
    const secretPassphrases = [
        "el clitoris es una linea directa a la matriz", // Sin tildes
        "el clítoris es una linea directa a la matriz", // Con tilde en clítoris
        "el clitoris es una línea directa a la matriz", // Con tilde en línea
        "el clítoris es una línea directa a la matriz"  // Con ambas tildes
    ];

    // 1. Seleccionamos todos los elementos que necesitamos
    const loginForm = document.getElementById('login-form');
    const passphraseInput = document.getElementById('passphrase');
    const errorMessage = document.getElementById('error-message');
    const developerInfo = document.getElementById('developer-info');
    const showPassToggle = document.getElementById('show-pass-toggle'); // Checkbox

    // Nos aseguramos de que el script solo corra si estamos en la página correcta
    if (loginForm && passphraseInput && errorMessage && developerInfo) {

        // 2. Lógica del "submit" del formulario
        loginForm.addEventListener('submit', (event) => {
            
            // Prevenimos que la página se recargue
            event.preventDefault(); 

            // 3. Obtenemos el valor del input, lo limpiamos y lo pasamos a minúscula
            const userInput = passphraseInput.value.trim().toLowerCase();

            // 4. Comparamos (Revisamos si el input está INCLUIDO en el array)
            if (secretPassphrases.includes(userInput)) {
                // ¡ÉXITO!
                
                // Ocultamos el mensaje de error (si estaba visible)
                errorMessage.classList.add('hidden');
                
                // Ocultamos el formulario
                loginForm.classList.add('hidden');
                
                // Mostramos el div con tus datos y la bibliografía
                developerInfo.classList.remove('hidden');
                
            } else {
                // ¡ERROR!
                
                // Mostramos el mensaje de "ACCESO DENEGADO"
                errorMessage.classList.remove('hidden');
                
                // Borramos el contenido del input para que intente de nuevo
                passphraseInput.value = "";
            }
        });

        // 3. LÓGICA DEL CHECKBOX "MOSTRAR FRASE"
        if (showPassToggle) {
            showPassToggle.addEventListener('change', () => {
                if (showPassToggle.checked) {
                    // Si está tildado, mostrar texto
                    passphraseInput.type = 'text';
                } else {
                    // Si no, volver a password
                    passphraseInput.type = 'password';
                }
            });
        }
    }
});
