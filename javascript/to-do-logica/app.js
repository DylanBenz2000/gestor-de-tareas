document.addEventListener('DOMContentLoaded', () =>{
    const buttonAgregar = document.querySelector('.agregar');
    const inputItem = document.querySelector('#taskInput');
    const listaPendientes = document.querySelector('.task-list .list-container');
    const listaCompletadas = document.querySelector('.task-list-done .list-container');
    const titlePendientes = document.querySelector('.task-list .container-title .title span');
    const titleCompletadas = document.querySelector('.task-list-done .container-title .title span');

    cargarTareas();
    actualizarTitulos();

    buttonAgregar.addEventListener('click', () =>{
        const valorInput = inputItem.value.trim();
        if(valorInput !== ''){
            const nuevoItem = crearTarea(valorInput);
            listaPendientes.appendChild(nuevoItem);
            guardarTareaPendiente(valorInput);
            inputItem.value = '';
            actualizarTitulos();
        }
    });

    function cargarTareas() {
        const tareasPendientes = JSON.parse(localStorage.getItem('tareasPendientes')) || [];
        const tareasCompletadas = JSON.parse(localStorage.getItem('tareasCompletadas')) || [];

        tareasPendientes.forEach(tarea => {
            const nuevoItem = crearTarea(tarea);
            listaPendientes.appendChild(nuevoItem);
        });

        tareasCompletadas.forEach(tarea => {
            const nuevoItem = crearTareaCompletada(tarea);
            listaCompletadas.appendChild(nuevoItem);
        });
    }

    function crearTarea(texto) {
        const nuevoItem = document.createElement('li');
        nuevoItem.classList.add('task');

        const divText = document.createElement('div');
        divText.classList.add('container-text');

        const label = document.createElement('label');
        label.classList.add('label-style');
        label.textContent = texto;

        const divIcons = document.createElement('div');
        divIcons.classList.add('icons');

        const iconCheck = document.createElement('i');
        iconCheck.classList.add('fa-solid', 'fa-check');
        iconCheck.addEventListener('click', () => marcarComoHecho(nuevoItem, texto));

        const iconDelete = document.createElement('i');
        iconDelete.classList.add('fa-solid', 'fa-trash');
        iconDelete.addEventListener('click', () => eliminarTarea(nuevoItem, texto));

        divText.appendChild(label);

        divIcons.appendChild(iconCheck);
        divIcons.appendChild(iconDelete);

        nuevoItem.appendChild(divText);
        nuevoItem.appendChild(divIcons);

        return nuevoItem;
    }

    function crearTareaCompletada(texto) {
        const nuevoItem = crearTarea(texto);
        nuevoItem.querySelector('.fa-check').classList.add('completada');
        return nuevoItem;
    }

    function marcarComoHecho(item, texto) {
        listaPendientes.removeChild(item);
        const nuevoItem = crearTareaCompletada(texto);
        listaCompletadas.appendChild(nuevoItem);
        guardarTareaCompletada(texto);
        actualizarTitulos();
    }

    function eliminarTarea(item, texto) {
        listaPendientes.removeChild(item);
        eliminarTareaPendiente(texto);
        actualizarTitulos();
    }

    function guardarTareaPendiente(tarea) {
        let tareasPendientes = JSON.parse(localStorage.getItem('tareasPendientes')) || [];
        tareasPendientes.push(tarea);
        localStorage.setItem('tareasPendientes', JSON.stringify(tareasPendientes));
    }

    function guardarTareaCompletada(tarea) {
        // Eliminar la tarea completada de la lista de tareas pendientes
        let tareasPendientes = JSON.parse(localStorage.getItem('tareasPendientes')) || [];
        const index = tareasPendientes.indexOf(tarea);
        if (index !== -1) {
            tareasPendientes.splice(index, 1);
            localStorage.setItem('tareasPendientes', JSON.stringify(tareasPendientes));
        }

        // Agregar la tarea completada a la lista de tareas completadas
        let tareasCompletadas = JSON.parse(localStorage.getItem('tareasCompletadas')) || [];
        tareasCompletadas.push(tarea);
        localStorage.setItem('tareasCompletadas', JSON.stringify(tareasCompletadas));
    }

    function eliminarTareaPendiente(tarea) {
        let tareasPendientes = JSON.parse(localStorage.getItem('tareasPendientes')) || [];
        tareasPendientes = tareasPendientes.filter(item => item !== tarea);
        localStorage.setItem('tareasPendientes', JSON.stringify(tareasPendientes));
    }

        function actualizarTitulos() {
        const numTareasPendientes = listaPendientes.children.length;
        const numTareasCompletadas = listaCompletadas.children.length;

        titlePendientes.textContent = numTareasPendientes;
        titleCompletadas.textContent = numTareasCompletadas;
    }

});
