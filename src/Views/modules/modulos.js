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

    


export async function envioLogin(data) {
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

export function notificacion(type, content) {
            
        let anuncio = document.createElement('div');
        anuncio.classList.add('anuncio')
        anuncio.classList.add(type)
        anuncio.innerHTML = `<p> ${content} </p>`
        document.body.appendChild(anuncio)

        setTimeout(() => {
            anuncio.remove()
        }, 3000);

    }


