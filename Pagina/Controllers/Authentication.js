import { loginvalidation } from "./Global.js";

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById("loginbtn");
    const forgotPasswordLink = document.querySelector('.forgot-password a'); // Selector para el enlace "Olvidé mi contraseña"
    const registerLink = document.querySelector(".register a")

    loginBtn.addEventListener('click', async (event) => {
        event.preventDefault(); // Evitar el comportamiento predeterminado del botón submit

        const email = document.getElementById("edtuser").value;
        const password = document.getElementById("edtpassword").value;

        try {
            // Llamar a la función de validación de inicio de sesión
            const validation = await loginvalidation(email, password);

            if (validation != null) {
                alert('Autenticación exitosa ' + email);
                // Redirigir a Home.html en la carpeta Templates
                window.location.href = '../Templates/Home.html';
            } else {
                throw new Error('Error en la autenticación');
            }
        } catch (error) {
            alert(error.message);
            console.log('Error de autenticación:', error);
        }
    });

    // Agregar evento al hacer clic en "Olvidé mi contraseña"
    forgotPasswordLink.addEventListener('click', (event) => {
        event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
        console.log("Clic en 'Olvidé mi contraseña'");
        // Redirigir a Resetpass.html en la carpeta Templates
        window.location.href = '../Templates/Resetpass.html';
    });    

    registerLink.addEventListener('click', (event) => {
        event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
        console.log("Clic en 'Registrate'");
        // Redirigir a Register.html en la carpeta Templates
        window.location.href = '../Templates/Register.html';
    });  
});
