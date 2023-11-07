const novaNota = document.getElementById('nova-nota');
const adicionarNota = document.getElementById('adicionar-nota');
const limparNota = document.getElementById('limpar-nota');
const notasSalvas = document.getElementById('notas-salvas');

// Verifica notas no armazenamento local
if (localStorage.getItem("notas")) {
    const notas = JSON.parse(localStorage.getItem("notas"));

    notas.forEach(function (nota, index) {
        criarNota(nota.texto, index, nota.cor);
    });
}

// Fazer o botão de adicionar funcionar
adicionarNota.addEventListener("click", function () {
    const textoNota = novaNota.value.trim();
    if (textoNota !== '') {
        criarNota(textoNota);
        salvarNota();
        novaNota.value = '';
    }
});

// Fazer o botão de limpar funcionar
limparNota.addEventListener("click", function () {
    notasSalvas.innerHTML = '';
    localStorage.removeItem('notas');
});

// Função para criar notas
function criarNota(texto, index, cor) {
    const div = document.createElement("div");
    const p = document.createElement("p");
    const botaoEditar = document.createElement("button");
    const botaoExcluir = document.createElement("button");
    const inputCor = document.createElement("input");
    const inputCortext = document.createElement('input');

    inputCor.type = "color";
    inputCortext.type = 'color';
    p.textContent = texto;
    botaoEditar.textContent = "Editar";
    botaoExcluir.textContent = "Excluir";

    div.appendChild(p);
    div.appendChild(botaoEditar);
    div.appendChild(botaoExcluir);
    div.appendChild(inputCor);
    div.appendChild(inputCortext);
    

    div.className = "nota";
    if (index !== undefined) {
        const notas =JSON.parse(localStorage.getItem("notas"))
        inputCor.value = notas[index].cor;
        div.style.backgroundColor = notas[index].cor;
        
        inputCortext.value = notas[index].corTexto;
        p.style.color = inputCortext.value;
    }
    notasSalvas.appendChild(div);

    // Função para editar as notas
    botaoEditar.addEventListener("click", function () {
        editarNota(p, div, inputCor, inputCortext);
    });

    botaoExcluir.addEventListener("click", function () {
        if (confirm("Tem certeza que deseja excluir a nota?")) {
            div.remove();
            salvarNota();
        }
    });
}

function editarNota(p, div, inputCor, inputCortext) {
    const textareaEdicao = document.createElement("textarea");
    textareaEdicao.value = p.textContent;
    div.replaceChild(textareaEdicao, p);
    const botaoSalvar = document.createElement("button");
    botaoSalvar.textContent = "Salvar";
    div.appendChild(botaoSalvar);
    const p = p.querySelector('p');
    p.style.color = inputCortext.value ;


    botaoSalvar.addEventListener("click", function () {
        p.textContent = textareaEdicao.value;
        div.replaceChild(p, textareaEdicao);
        div.removeChild(botaoSalvar);
        div.style.backgroundColor = inputCor.value;
        salvarNota();
        p.style.color = inputCortext;

        
    });
}

function salvarNota() {
    const notas = [];
    const divsNotas = notasSalvas.querySelectorAll(".nota");
    

    divsNotas.forEach(function (div) {
        const p = div.querySelector('p');
        const inputCor = div.querySelector("input");
        const inputCortext = div.querySelector("input");
        notas.push({
            texto: p.textContent,
            cor: inputCor.value,
            corTexto:inputCortext.value,
        });
    });
    localStorage.setItem("notas", JSON.stringify(notas));
}

