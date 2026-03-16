// Executa assim que a página carrega
document.addEventListener('DOMContentLoaded', carregarClientes);

const form = document.getElementById('form-cadastro');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const cliente = {
        id: Date.now(), // Geramos um ID único baseado no tempo
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value
    };

    salvarCliente(cliente);
    adicionarLinhaTabela(cliente);
    this.reset();
});

function salvarCliente(cliente) {
    // Busca a lista atual ou cria uma vazia se for o primeiro acesso
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes.push(cliente);
    // Salva de volta no localStorage convertendo para String
    localStorage.setItem('clientes', JSON.stringify(clientes));
}

function carregarClientes() {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes.forEach(cliente => adicionarLinhaTabela(cliente));
}

function adicionarLinhaTabela(cliente) {
    const tabela = document.getElementById('tabela-clientes').querySelector('tbody');
    const novaLinha = tabela.insertRow();

    novaLinha.innerHTML = `
        <td>${cliente.nome}</td>
        <td>${cliente.email}</td>
        <td>
            <button class="btn-excluir" onclick="removerCliente(${cliente.id}, this)">Excluir</button>
        </td>
    `;
}

function removerCliente(id, botao) {
    // 1. Remove do LocalStorage
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes = clientes.filter(c => c.id !== id);
    localStorage.setItem('clientes', JSON.stringify(clientes));

    // 2. Remove da interface (DOM)
    const linha = botao.parentNode.parentNode;
    linha.remove();
}
