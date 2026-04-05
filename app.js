'use strict';

const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? []; //Se o localStorage estiver vazio, retorna um array vazio para evitar erros.
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco)); //Salvar o array de tarefas no localStorage, convertendo-o para string.

const criarItem = (tarefa, status, indice, prazo) => { //Criar um novo item na lista de tarefas
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="date" value="${prazo || ''}">
        <input type="button" value="X"  data-indice=${indice}>
                                        `
    document.getElementById('todoList').appendChild(item);
}

const limparTarefas = () => { //Remover o último item sempre que o arquivo atualizar, para que eles não fiquem duplicados
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const atualizarTela = () => {
    limparTarefas();
    const banco = getBanco();
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice, item.prazo)); 
}   //Percorrer o array de tarefas e criar um item para cada tarefa

const inserirItem = (evento) => {
    if (evento.key !== 'Enter') return;
    let texto = evento.target.value.trim();
    if (texto === '') return;
    
    let partes = texto.split(/\s+/); 
    let prazo = partes.pop(); // último pedaço
    let tarefa = partes.join(" "); 
    // valida se o prazo é formato YYYY-MM-DD
    if (!prazo.match(/^\d{4}-\d{2}-\d{2}$/)) {
        alert("Use o formato: tarefa AAAA-MM-DD");
        return;
    }
    const banco = getBanco();
    banco.push({ tarefa: tarefa, status: '', prazo: prazo });
    setBanco(banco);
    evento.target.value = '';
    atualizarTela();
}

const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1); //Remover o item do array de tarefas, usando o índice para identificar qual item deve ser removido
    setBanco(banco);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : ''; //Atualizar o status do item, alternando entre '' 
    setBanco(banco);                                                     //e 'checked' para marcar ou desmarcar a tarefa
    atualizarTela();
}
const clickItem = (evento) => {
    const elemento = evento.target;     //Identificar qual elemento foi clicado, para determinar se é um botão de 
    if (elemento.type === 'button') {    //remoção ou uma caixa de seleção para marcar a tarefa como concluída
        const indice = elemento.dataset.indice;
        removerItem(indice)
    }   if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem); 

atualizarTela();
