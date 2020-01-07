(function(){
    
    document.addEventListener('DOMContentLoaded',function() {
       
        /*Registro*/
        let formulario = document.querySelector('#formularioRegistro');

        if(formulario){
            formulario.addEventListener('submit', function(e) {
                e.preventDefault()
    
                let nombre = document.querySelector('#name').value
                let apellido = document.querySelector('#lastname').value
                let nombreUsuario = document.querySelector('#username').value
                let contrasena = document.querySelector('#password').value
    
                if (nombre == '' || apellido == '' || nombreUsuario == '' || contrasena == '' ) {
                    
                    notificacion('error', 'No deben estar vacios los campos');
    
                }else{
    
                    let form = new FormData()
                    form.append('accion', 'createUser')
                    form.append('name', nombre)
                    form.append('lastName', apellido)
                    form.append('userName', nombreUsuario)
                    form.append('password', contrasena)            
    
                    enviarDatos(form);
    
                }
                
                formulario.reset()
    
            })
            
        }
        
        async function enviarDatos(form){

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


        /*Login*/ 

        let formularioLogin = document.querySelector('#formularioLogin');

        if(formularioLogin){
            formularioLogin.addEventListener('submit',function(e) {
                e.preventDefault();
    
                let usuario = document.querySelector('#usernameL').value;
                let password = document.querySelector('#passwordL').value
    
                if (usuario == '' || password == '') {
                    notificacion('error', 'Los campos no pueden estar vacios')
                }else{
    
                    let login = new FormData();
                    login.set('accion', 'login')
                    login.set('username', usuario)
                    login.set('password', password)

                    envioLogin(login)

                    formularioLogin.reset()
    
                }
    
    
            });
        }

        

        async function envioLogin(data) {
            let response = await fetch('Controllers/userController.php', {method: 'POST', body: data})

            if(response.ok){
                let json = await response.json()
               
                if(json.code == 200){
                    
                    let promesa = new Promise(function(resolve,reject) {
                        resolve(notificacion('correcto', 'Credenciales validas'))

                        localStorage.setItem('key', json.mensaje)
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

        function notificacion(type, content) {
            
            let anuncio = document.createElement('div');
            anuncio.classList.add('anuncio')
            anuncio.classList.add(type)
            anuncio.innerHTML = `<p> ${content} </p>`
            document.body.appendChild(anuncio)

            setTimeout(() => {
                anuncio.remove()
            }, 3000);

        }


    });
})();