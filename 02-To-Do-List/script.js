    const form = document.querySelector('.formulario');
    const ul = document.querySelector('.lista');
    const input = document.querySelector('.input');

    const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefasSalvas.forEach(tarefa => criarElementoTarefa(tarefa));


    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!input.value.trim()) return;

        const textoTarefa = input.value;
        criarElementoTarefa(textoTarefa);
        salvarTarefas();
        
        input.value = '';
        input.focus();
    });

    function criarElementoTarefa(texto) {
        const li = document.createElement('li');
        li.innerText = texto;
        
        const botaoApagar = document.createElement('button');
        botaoApagar.innerText = 'Apagar';
        botaoApagar.classList.add('btn-apagar');
        
        botaoApagar.addEventListener('click', () => {
            li.remove();
            salvarTarefas();
        });

        li.appendChild(botaoApagar);
        ul.appendChild(li);
    }
    function salvarTarefas() {
        const liTarefas = ul.querySelectorAll('li');
        const listaDeTarefas = [];

        for (let tarefa of liTarefas) {
            let tarefaTexto = tarefa.innerText.replace('Apagar', '').trim();
            listaDeTarefas.push(tarefaTexto);
        }

        localStorage.setItem('tarefas', JSON.stringify(listaDeTarefas));
    }