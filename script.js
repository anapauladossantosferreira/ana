const formulario = document.getElementById('cadastroForm');
const corpoTabela = document.getElementById('corpoTabela');

// Carregar dados ao iniciar a página
document.addEventListener('DOMContentLoaded', exibirClientes);

formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const novoCliente = {
        id: Date.now(), // ID único para exclusão
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value
    };

    salvarCliente(novoCliente);
    this.reset();
    exibirClientes();
    
    // Feedback da Julia
    document.querySelector('.balao-fala p').innerText = "Ótimo! Salvei os dados na lista abaixo.";
});

function salvarCliente(cliente) {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes.push(cliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));
}

function exibirClientes() {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    corpoTabela.innerHTML = "";

    clientes.forEach(cliente => {
        const linha = `
            <tr>
                <td>${cliente.nome}</td>
                <td>${cliente.cpf}</td>
                <td>${cliente.telefone}</td>
                <td><button class="btn-excluir" onclick="removerCliente(${cliente.id})">Excluir</button></td>
            </tr>
        `;
        corpoTabela.innerHTML += linha;
    });
}

function removerCliente(id) {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes = clientes.filter(c => c.id !== id);
    localStorage.setItem('clientes', JSON.stringify(clientes));
    exibirClientes();
}

function limparTudo() {
    if(confirm("Deseja apagar todos os registros?")) {
        localStorage.removeItem('clientes');
        exibirClientes();
    }
}