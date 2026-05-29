const form = document.getElementById('cadastroForm');
const corpoTabela = document.getElementById('corpoTabela');
const msgJulia = document.querySelector('.balao-fala p');

document.addEventListener('DOMContentLoaded', carregarLista);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const cpfInformado = document.getElementById('cpf').value.trim();
    
    // --- LÓGICA DE BLOQUEIO ESTRITO ---
    // Verificamos se o CPF já existe na lista, independente de qualquer outro dado
    const baseDeDados = JSON.parse(localStorage.getItem('banco_clientes') || '[]');
    const cpfJaExiste = baseDeDados.find(cliente => cliente.cpf === cpfInformado);

    if (cpfJaExiste) {
        // Bloqueio imediato
        msgJulia.innerText = "Parece que este CPF já pertence ao(à) cliente " + cpfJaExiste.nome + ". Não posso cadastrar de novo!";
        msgJulia.parentElement.style.backgroundColor = "#ffcccc"; 
        
        alert(`ERRO DE DUPLICIDADE:\nO CPF ${cpfInformado} já está vinculado ao nome: ${cpfJaExiste.nome}.\nO cadastro não será realizado.`);
        return; // Encerra a função e impede o salvamento
    }
    // ----------------------------------

    // Se o CPF for inédito, prossegue:
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
    
    // Feedback positivo
    msgJulia.parentElement.style.backgroundColor = "#fff";
    msgJulia.innerText = "Excelente! CPF verificado e cliente salvo com sucesso.";
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
    msgJulia.innerText = "Registro removido. O CPF está livre para uso novamente!";
}

function limparTudo() {
    if(confirm("Deseja apagar TODOS os registros?")) {
        localStorage.removeItem('banco_clientes');
        carregarLista();
    }
}