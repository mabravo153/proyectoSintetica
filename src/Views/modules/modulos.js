export async function enviarDatos(form){

    let response = await fetch('Controllers/userController.php',{method: 'POST', body: form})

    if(response.ok){
        let json = await response.json()

        if (json.code == 202) {
            notificacion('correcto', `${json.mensaje}`)
        }else{
            notificacion('error', `Usuario duplicado u otro error: ${json.mensaje}`)
        }
        
    }else{
        notificacion('error', `Error:${response.status}, ${response.statusText}`)
    }
}

export async function envioLogin(data){
        let response = await fetch('Controllers/userController.php', {method: 'POST', body: data})

        if(response.ok){
            let json = await response.json()
           
            if(json.code == 200){
                
                let promesa = new Promise(function(resolve,reject) {
                    resolve(notificacion('correcto', 'Credenciales validas'))
                    let userInfo = JSON.stringify(json.mensaje)
                    localStorage.setItem('userInfo', userInfo)
                });
                    
                promesa.then(
                    result => window.location.href = 'index.php'
                )
                
            }else{
                notificacion('error', `${json.mensaje}`)
            }
            
        }else{
            notificacion('error', `${response.status}: ${response.statusText} `)
        }
}

export async function close(datos) {
    let cerrarF = await fetch('Controllers/userController.php', {method: 'POST', body: datos})

    if (cerrarF.ok) {
        localStorage.clear()
        window.location.href = 'index.php?accion=login'
    }

}

export function notificacion(type, content){
            
        let anuncio = document.createElement('div');
        anuncio.classList.add('anuncio')
        anuncio.classList.add(type)
        anuncio.innerHTML = `<p> ${content} </p>`
        document.body.appendChild(anuncio)

        setTimeout(() => {
            anuncio.remove()
        }, 3000);

}




export class funciones {

    static ventanaModal(dataset) {
        let contenedorModal = document.createElement('div')
        let contenidoModal = document.createElement('div')
        contenidoModal.classList.add('contenido-modal')
        contenedorModal.classList.add('contenedor-mod')

        contenidoModal.innerHTML = `<form >
                                        <input type="hidden" id="idUsuario" value="${dataset}" >
                                        <div class="campo campo-login">
                                            <label for="notaUsuario">Ingesa la nota</label>
                                            <input type="text" id="notaUsuario" placeholder="calificacion del 0 a 50">
                                        </div>
                                        <a href="#" class="btn btn-enviar" id="formularioModal">Agregar nota </a>
                                    </form>`
        
        contenedorModal.append(contenidoModal)
        document.body.append(contenedorModal)
    }


    static validarlogin(user) {
        let auth;
        let validar = new RegExp()
        validar = /^[0-9A-Z]+$/gi;
    
        if (!validar.test(user)) {
            auth = false 
        }else if(/\s/g.test(user)) {
            auth = false
        }else{
            auth = true
        }
        return auth
    }

    static validarNota(idUser, nota) {
        let auth;
        let validar = new RegExp()
        validar = /\d/g;
        
    
        if (!validar.test(idUser) || !validar.test(nota)) {
            auth = false 
        }else if(/\s/g.test(idUser) || /\s/g.test(nota)){
            auth = false
        }else{
            auth = true
        }
        return auth
    }

    static async listarUsuarios() {
    
        let consulta = await fetch('Controllers/userController.php?accion=retornar')
    
        let areaPrincipal = document.querySelector('.area-usuario')
    
        if(consulta.ok){
            let respuesta = await consulta.json();       
    
            respuesta.forEach(element => {
                let contenidoUsuario = document.createElement('div')
                contenidoUsuario.classList.add('contenido-usuarios')
                contenidoUsuario.innerHTML = `<div class="campo-tabla">
                                                <p>${element.id}</p>
                                            </div>
                                            <div class="campo-tabla">
                                                <p>${element.nombre} ${element.apellido}</p>
                                            </div>
                                            <div class="campo-tabla">
                                                <p>${element.nombreUsuario}</p>
                                            </div>
                                            <div class="campo-tabla opciones-panel">
                                                <button class="btn-nota" id="btnAgregar" data-set="${element.id}" title="Agregar notas para este usuario">Agregar</button>
                                                <button class="btn-listarN" id="btnListarNota" data-list="${element.id}" title="Listar notas para este usuario">Listar</button>
                                            </div>`
    
                areaPrincipal.append(contenidoUsuario) 
            });
    
        }else{
            console.log(consulta.status);
        }
    
                                                
        
    }

    static async manipularmModal(id, nota){

        let formDat = new FormData()
        formDat.set('accion', 'agregarNota')
        formDat.set('idUsuario', id)
        formDat.set('nota', nota)

        let envioNotas = await fetch('Controllers/notasController.php', {method: 'POST', body: formDat})

        if (envioNotas.ok) {
            let respuesta = await envioNotas.json()

            if(respuesta.code == 202){
                
                
               let promise = new Promise(function (resolve, reject) {
                   resolve(notificacion('correcto', `${respuesta.mensaje}`))
               })

               promise.then(
                   result => document.querySelector('.contenedor-mod').remove()
               )

            }else{
                notificacion('error', `${respuesta.mensaje}`)
            }
           
            
        }else{
            notificacion('error', `Ocurrio un error ${envioNotas.status}  ${envioNotas.statusText}` )
        }




    }

   ventanaLista() {

        let contenedorModal = document.createElement('div')
        let contenidoModal = document.createElement('div')
        contenidoModal.classList.add('contenido-modal')
        contenedorModal.classList.add('contenedor-mod')

        contenedorModal.append(contenidoModal)
        document.body.append(contenedorModal)
    }

    static async mostrarNotas(data){

        let consulta = await fetch(`Controllers/notasController.php?accion=notas&datos=${data}`)

        if (consulta.ok) {
            let respuesta = await consulta.text()

            console.log(respuesta);
            
        }


    }

    
}

