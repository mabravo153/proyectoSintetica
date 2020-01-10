import {enviarDatos, envioLogin, notificacion, close} from '../modules/modulos.js'
(function(){
    'use strict'
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
    
                    enviarDatos(form)
    
                }
                
                formulario.reset()
    
            })
            
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


        /*Salir*/

       if(document.querySelector('#salir')){
            let salir = document.querySelector('#salir');

            salir.addEventListener('click', function(e) {
                e.preventDefault();

                let cerrar = new FormData()
                cerrar.set('accion', 'cerrar')

                close(cerrar)

            });
        }


    


        

    });
})();