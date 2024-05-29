import { observador,logout } from "./Global";

observador()
const cerrar = document.getElementById('logout-Btn')

async function sesion (){
    const validar = logout()
    const verificar = await validar

    then ((verificar) => {
        alert('Sesion Cerrada')
        window.location.href = "../Index.html"
    }).catch((error) => {
        alert('Sesion no Cerrada')
    })
}

window.addEventListener('DOMContentLoaded', async()=>{
    cerrar.addEventListener('click',sesion)
})