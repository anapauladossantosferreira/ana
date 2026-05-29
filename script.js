const form = document.getElementById('cadastroForm');
const corpoTabela = document.getElementById('corpoTabela');
const msgJulia = document.querySelector('.balao-fala p');

// Inicia carregando os dados salvos
document.addEventListener('DOMContentLoaded', carregarLista);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const cpfInformado = document.getElementById('cpf').value;
    
    // 1. VERIFICAÇÃO DE CPF DUPLICADO
    if (verificarCpfExistente(cpfInformado)) {
        msgJulia.innerText = "Ops! Este CPF já está cadastrado em nosso sistema.";
        msgJulia.parentElement.style.backgroundColor = "#ffe3e3"; // Muda a cor do balão para alerta
        alert("Erro: Já existe um cliente cadastrado com este CPF.");
        return; // Para a execução aqui e não salva
    }

    // Se passou na verificação, cria o objeto
    const cliente = {
        id: Date.now(),
        nome: document.getElementById('nome').value,
        idade: document.getElementById('idade').value,
        estadoCivil: document.getElementById('estadoCivil').value,
        cpf: cpfInformado,
        telefone: document.getElementById('telefone').value,
        endereco: document.getElementById('endereco').value
    };

    salvarNoStorage(cliente);
    form.reset();
    carregarLista();
    
    // Reset do balão da Julia
    msgJulia.parentElement.style.backgroundColor = "#fff";
    msgJulia.innerText = "Prontinho! Cadastro realizado com sucesso.";
});

// Função que checa se o CPF já consta na lista
function verificarCpfExistente(cpf) {
    const clientes = JSON.parse(localStorage.getItem('banco_clientes') || '[]');
    // .some() retorna true se encontrar qualquer registro com o mesmo CPF
    return clientes.some(cliente => cliente.cpf === cpf);
}

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
                <td><strong>${c.cpf}</strong></td>
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