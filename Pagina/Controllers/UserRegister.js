import { UserRegister, everification, auth, saveUserData } from "./Global.js";
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js';

function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasSpecialChar;
}

document.getElementById('registerbtn').addEventListener('click', async (event) => {
    event.preventDefault();

    const email = document.getElementById('newuser').value;
    const password = document.getElementById('newpassword').value;

    if (!validatePassword(password)) {
        alert('La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y caracteres especiales.');
        return;
    }

    try {
        const userCredential = await UserRegister(email, password);
        const user = userCredential.user;
        await everification();

        const userData = {
            email,
            cedula: document.getElementById('cedula').value,
            nombreCompleto: document.getElementById('nombreCompleto').value,
            fechaNacimiento: document.getElementById('fechaNacimiento').value,
            direccion: document.getElementById('direccion').value,
            telefono: document.getElementById('telefono').value,
        };

        await saveUserData(user, userData);
        alert('Registro Exitoso! ' + email);
        window.location.href = 'login.html';
    } catch (error) {
        alert('Error, autenticación fallida: ' + error.message);
        console.log('sesión ' + email + ' no validada', error);
    }
});

// Función para el registro con Google
const registerWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        await everification();
        const userData = {
            email: user.email,
            cedula: '',
            nombreCompleto: user.displayName,
            fechaNacimiento: '',
            direccion: '',
            telefono: user.phoneNumber || ''
        };
        await saveUserData(user, userData);
        alert('Registro con Google exitoso');
        window.location.href = 'login.html';
    } catch (error) {
        alert('Error al registrar con Google: ' + error.message);
    }
};

document.getElementById('googleSignUp').addEventListener('click', registerWithGoogle);

// Función para el registro con Facebook
const registerWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        await everification();
        const userData = {
            email: user.email,
            cedula: '',
            nombreCompleto: user.displayName,
            fechaNacimiento: '',
            direccion: '',
            telefono: user.phoneNumber || ''
        };
        await saveUserData(user, userData);
        alert('Registro con Facebook exitoso');
        window.location.href = 'login.html';
    } catch (error) {
        alert('Error al registrar con Facebook: ' + error.message);
    }
};

document.getElementById('facebookSignUp').addEventListener('click', registerWithFacebook);
