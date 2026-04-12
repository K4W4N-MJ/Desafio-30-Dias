const entrada  = document.getElementById('entrada');
const badge    = document.getElementById('badge');
const bignum   = document.getElementById('bignum');
const histLista = document.getElementById('hist-lista');
const histWrap  = document.getElementById('hist-wrap');
const divHist   = document.getElementById('div-hist');

// Enter também aciona a verificação
entrada.addEventListener('keydown', e => {
  if (e.key === 'Enter') verificar();
});

function verificar() {
  const val = entrada.value.trim();

  // campo vazio: volta ao estado inicial
  if (!val) { setIdle(); return; }

  const n = Number(val);

  // valida se é inteiro
  if (!Number.isInteger(n)) {
    setBadge('erro', '!', 'Digite um número inteiro válido.');
    bignum.textContent = '?';
    bignum.style.color = '#E24B4A';
    return;
  }

  // % → resto da divisão por 2
  const tipo  = n % 2 === 0 ? 'par' : 'impar';
  const label = tipo === 'par' ? 'par' : 'ímpar';

  setBadge(tipo, tipo === 'par' ? '2' : '1', `${n} é ${label}`);

  bignum.textContent = n;
  bignum.style.color = tipo === 'par' ? '#3B6D11' : '#185FA5';

  addHistorico(n, tipo, label);
  entrada.value = '';
  entrada.focus();
}

function setBadge(tipo, iconTxt, texto) {
  badge.className = 'badge ' + tipo;
  badge.innerHTML = `<span class="icon ${tipo}">${iconTxt}</span><span>${texto}</span>`;
}

function setIdle() {
  badge.className = 'badge idle';
  badge.innerHTML = '<span>Aguardando...</span>';
  bignum.textContent = '—';
  bignum.style.color = '';
}

function addHistorico(n, tipo, label) {
  const pill = document.createElement('span');
  pill.className = 'pill ' + tipo;
  pill.title = label;
  pill.textContent = n;
  histLista.prepend(pill); // mais recente aparece primeiro

  // limite de 12 itens no histórico
  if (histLista.children.length > 12) {
    histLista.removeChild(histLista.lastChild);
  }

  // mostra o histórico na primeira verificação
  histWrap.style.display = 'block';
  divHist.style.display = 'block';
}