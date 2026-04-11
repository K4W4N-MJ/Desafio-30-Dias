const resultEl = document.getElementById('result');
const minEl = document.getElementById('min');
const maxEl = document.getElementById('max');
const generateBtn = document.getElementById('generateBtn');
const clearBtn = document.getElementById('clearBtn');
const historyList = document.getElementById('historyList');

const history = [];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function animateRoll(finalNumber) {
  generateBtn.disabled = true;
  resultEl.classList.add('rolling');

  let ticks = 0;
  const maxTicks = 18;
  const interval = setInterval(() => {
    const min = parseInt(minEl.value);
    const max = parseInt(maxEl.value);
    resultEl.textContent = randomInt(min, max);
    ticks++;
    if (ticks >= maxTicks) {
      clearInterval(interval);
      resultEl.textContent = finalNumber;
      resultEl.classList.remove('rolling');
      resultEl.classList.add('pop');
      setTimeout(() => resultEl.classList.remove('pop'), 250);
      generateBtn.disabled = false;
    }
  }, 55);
}

function addToHistory(number) {
  history.unshift(number);
  if (history.length > 15) history.pop();

  historyList.innerHTML = '';
  history.forEach((num, index) => {
    const tag = document.createElement('span');
    tag.className = 'history-tag' + (index === 0 ? ' latest' : '');
    tag.textContent = num;
    historyList.appendChild(tag);
  });
}

function generate() {
  const min = parseInt(minEl.value);
  const max = parseInt(maxEl.value);

  if (isNaN(min) || isNaN(max)) {
    alert('Preencha os dois campos com números válidos.');
    return;
  }
  if (min >= max) {
    alert('O valor mínimo deve ser menor que o máximo.');
    return;
  }

  const number = randomInt(min, max);
  animateRoll(number);
  addToHistory(number);
}

generateBtn.addEventListener('click', generate);

clearBtn.addEventListener('click', () => {
  history.length = 0;
  historyList.innerHTML = '<span class="empty-history">Nenhum número gerado ainda</span>';
  resultEl.textContent = '?';
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !generateBtn.disabled) generate();
});