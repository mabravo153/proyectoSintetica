(function(){
    
    document.addEventListener('DOMContentLoaded',function() {
       
        let formulario = document.querySelector('#formularioRegistro');
        


        formulario.addEventListener('submit', function(e) {
            e.preventDefault()

            let nombre = document.querySelector('#name').value

            console.log(nombre);
            


        })
        


    });
})();