const cambiar = document.querySelector('.switch');


cambiar.addEventListener('click', function(e){
    cambiar.classList.toggle('active');
    document.body.classList.toggle('active');
})