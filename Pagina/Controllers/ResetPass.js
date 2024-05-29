import { resetPassword } from "./Global";

const agregar = document.getElementById('submitbtn')

async function resetPassword (){

    const correo = document.getElementById('currentuser')

    const verificar = resetPassword(email)
    const validation = await verificar

    if(validation != null){
        everification()
        alert('Correo enviado a '+email)
        window.location.href = 'Resetpass.html'
    }else{
        alert('Error, correo no registrado')
        console.log('sesion '+email+' no validada')
    }

}

window.addEventListener('DOMContentLoaded',async()=>{
    agregar.addEventListener('click',resetPassword)
})