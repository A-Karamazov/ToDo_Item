'use strict';

let banco = [
    {'tarefa' : 'Estudar JS', 'status' : ''},
    {'tarefa' : 'diddy party', 'status' : 'checked'},
    {'tarefa' : 'epstein island', 'status' : ''}
]

const criarItem = (tarefa, status) => {
    const item = document.createElement('label');
    item.classList.add('todo_item');
    item.innerHTML = `
        <input type="checkbox" ${status}>
        <div>${tarefa}</div>
        <input type="button" value="X">
    `
    document.getElementById('todoList').appendChild(item);
}

const limparTarefas = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const atualizarTela = () => {
    limparTarefas();
    banco.forEach (item => criarItem (item.tarefa, item.status));
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);

atualizarTela();
