const form = document.getElementById('cadastroForm');
const corpoTabela = document.getElementById('corpoTabela');
const msgJulia = document.querySelector('.balao-fala p');

// Inicia carregando os dados salvos
document.addEventListener('DOMContentLoaded', carregarLista);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const cliente = {
        id: Date.now(),
        nome: document.getElementById('nome').value,
        idade: document.getElementById('idade').value,
        estadoCivil: document.getElementById('estadoCivil').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value,
        endereco: document.getElementById('endereco').value
    };

    salvarNoStorage(cliente);
    form.reset();
    carregarLista();
    
    msgJulia.innerText = "Prontinho! O cliente já apareceu ali na lista embaixo!";
    setTimeout(() => msgJulia.innerText = "Pode cadastrar o próximo se quiser!", 3000);
});

function salvarNoStorage(cliente) {
    const clientes = JSON.parse(localStorage.getItem('banco_clientes') || '[]');
    clientes.push(cliente);
    localStorage.setItem('banco_clientes', JSON.stringify(clientes));
}

function carregarLista() {
    const clientes = JSON.parse(localStorage.getItem('banco_clientes') || '[]');
    corpoTabela.innerHTML = '';

    clientes.forEach(c => {
        corpoTabela.innerHTML += `
            <tr>
                <td>${c.nome}</td>
                <td>${c.idade}</td>
                <td>${c.cpf}</td>
                <td>${c.telefone}</td>
                <td>${c.endereco}</td>
                <td><button class="btn-excluir" onclick="remover(${c.id})">Remover</button></td>
            </tr>
        `;
    });
}

function remover(id) {
    let clientes = JSON.parse(localStorage.getItem('banco_clientes'));
    clientes = clientes.filter(c => c.id !== id);
    localStorage.setItem('banco_clientes', JSON.stringify(clientes));
    carregarLista();
}

function limparTudo() {
    if(confirm("Deseja apagar TODOS os dados da lista?")) {
        localStorage.removeItem('banco_clientes');
        carregarLista();
    }
}