const container = document.getElementById('container-exemplo');

function prepararContainer(titulo) {
  container.innerHTML = `<h2>${titulo}</h2>`;
}

function mostrarCalculoMedia() {
  prepararContainer('Calculadora de Média');

  const html = `
    <p>Quantas notas você deseja calcular?</p>
    <input type="number" id="numNotas" min="1" placeholder="Ex: 4">
    <button onclick="gerarCamposDeNota()">Gerar Campos</button>
    <div id="camposContainer"></div>
    <div id="resultadoMedia"></div>
  `;
  container.innerHTML += html;
}

function gerarCamposDeNota() {
  const num = document.getElementById('numNotas').value;
  const camposContainer = document.getElementById('camposContainer');
  const resultadoDiv = document.getElementById('resultadoMedia');

  resultadoDiv.innerHTML = '';

  if (num > 0) {
    let camposHTML = '<h3>Digite as notas:</h3>';
    for (let i = 0; i < num; i++) {
      camposHTML += `<input type="number" class="nota-input" placeholder="Nota ${i + 1}">`;
    }
    camposHTML += `<button onclick="calcularMediaFinal()">Calcular Média</button>`;
    camposContainer.innerHTML = camposHTML;
  } else {
    camposContainer.innerHTML = '<p style="color: red;">Por favor, insira um número válido e maior que zero.</p>';
  }
}

function calcularMediaFinal() {
  const inputs = document.querySelectorAll('.nota-input');
  let soma = 0;
  let totalValidos = 0;

  inputs.forEach(input => {
    const valor = parseFloat(input.value);
    if (!isNaN(valor)) {
      soma += valor;
      totalValidos++;
    }
  });

  const resultadoDiv = document.getElementById('resultadoMedia');
  if (totalValidos > 0 && totalValidos === inputs.length) {
    const media = soma / totalValidos;
    resultadoDiv.innerHTML = `A média das ${totalValidos} notas é: <strong>${media.toFixed(2)}</strong>`;
  } else {
    resultadoDiv.innerHTML = '<p style="color: red;">Por favor, preencha todas as notas com valores numéricos.</p>';
  }
}

function mostrarFormulario() {
  prepararContainer('Formulário com Download de .txt');

  const html = `
    <form onsubmit="baixarFormularioTxt(event)">
      <label for="formNome">Nome:</label>
      <input type="text" id="formNome" placeholder="Seu nome completo" required>

      <label for="formEmail">Email:</label>
      <input type="email" id="formEmail" placeholder="seu@email.com" required>
      
      <label for="formIdade">Idade:</label>
      <input type="number" id="formIdade" placeholder="Sua idade">

      <label for="formTrabalho">Trabalho:</label>
      <input type="text" id="formTrabalho" placeholder="Sua profissão">

      <label for="formLazer">Lazer:</label>
      <input type="text" id="formLazer" placeholder="Um hobby ou atividade de lazer">

      <button type="submit">Baixar Informações em .txt</button>
    </form>
  `;
  container.innerHTML += html;
}

function baixarFormularioTxt(event) {
  event.preventDefault();

  const nome = document.getElementById('formNome').value;
  const email = document.getElementById('formEmail').value;
  const idade = document.getElementById('formIdade').value;
  const trabalho = document.getElementById('formTrabalho').value;
  const lazer = document.getElementById('formLazer').value;

  const conteudoDoTxt = `
Dados do Formulário
===================
Nome: ${nome}
Email: ${email}
Idade: ${idade}
Trabalho: ${trabalho}
Lazer: ${lazer}
  `;

  const blob = new Blob([conteudoDoTxt], { type: 'text/plain;charset=utf-8' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'dados_formulario.txt';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

let frutas = [];

function mostrarListaFrutas() {
  frutas = ['maçã', 'banana', 'laranja'];
  prepararContainer('Manipulando Frutas com Arrays');

  const html = `
    <input type="text" id="frutaInput" placeholder="Digite uma fruta" />
    <button onclick="adicionarFruta()">Adicionar</button>
    <h3>Frutas Atuais:</h3>
    <p id="listaFrutas">[ ]</p>
    <div class="botoes-frutas">
      <button onclick="metodoFruta('push')">Push</button>
      <button onclick="metodoFruta('pop')">Pop</button>
      <button onclick="metodoFruta('shift')">Shift</button>
      <button onclick="metodoFruta('unshift')">Unshift</button>
      <button onclick="verificarBanana()">Includes('banana')</button>
      <button onclick="mostrarIndexFruta('uva')">IndexOf('uva')</button>
      <button onclick="mostrarJoinFruta()">Join(', ')</button>
      <button onclick="mostrarSliceFruta()">Slice(1, 3)</button>
      <button onclick="fazerSpliceFruta()">Splice(1, 1)</button>
      <button onclick="mapMaiusculasFruta()">Map (MAIÚSCULAS)</button>
      <button onclick="filtrarGrandesFruta()">Filter (nome > 4 letras)</button>
    </div>
    <pre id="saida"></pre>
  `;
  container.innerHTML += html;
  atualizarListaFrutas();
}

function atualizarListaFrutas() {
  document.getElementById('listaFrutas').textContent = JSON.stringify(frutas);
}

function adicionarFruta() {
  const input = document.getElementById('frutaInput');
  if (input.value.trim()) {
    frutas.push(input.value.trim());
    input.value = "";
    atualizarListaFrutas();
  }
}

function metodoFruta(acao) {
  if (acao === 'push') {
    const fruta = prompt("Digite uma fruta para adicionar no final:");
    if (fruta) frutas.push(fruta);
  } else if (acao === 'pop') {
    frutas.pop();
  } else if (acao === 'shift') {
    frutas.shift();
  } else if (acao === 'unshift') {
    const fruta = prompt("Digite uma fruta para adicionar no início:");
    if (fruta) frutas.unshift(fruta);
  }
  atualizarListaFrutas();
  document.getElementById('saida').textContent = `Método '${acao}' executado.`;
}

function verificarBanana() {
  const resultado = frutas.includes('banana')
    ? "🍌 Banana está no array!"
    : "🚫 Banana NÃO está no array.";
  document.getElementById('saida').textContent = resultado;
}

function mostrarIndexFruta(fruta) {
  const index = frutas.indexOf(fruta);
  const resultado = index !== -1
    ? `A fruta '${fruta}' está na posição ${index}.`
    : `'${fruta}' não foi encontrada.`;
  document.getElementById('saida').textContent = resultado;
}

function mostrarJoinFruta() {
  document.getElementById('saida').textContent = "join(', '): " + frutas.join(', ');
}

function mostrarSliceFruta() {
  const fatiado = frutas.slice(1, 3);
  document.getElementById('saida').textContent = "slice(1, 3): " + JSON.stringify(fatiado);
}

function fazerSpliceFruta() {
  frutas.splice(1, 1);
  atualizarListaFrutas();
  document.getElementById('saida').textContent = "splice(1, 1) aplicado.";
}

function mapMaiusculasFruta() {
  const maiusculas = frutas.map(f => f.toUpperCase());
  document.getElementById('saida').textContent = "map (toUpperCase): " + JSON.stringify(maiusculas);
}

function filtrarGrandesFruta() {
  const grandes = frutas.filter(f => f.length > 4);
  document.getElementById('saida').textContent = "filter (length > 4): " + JSON.stringify(grandes);
}
