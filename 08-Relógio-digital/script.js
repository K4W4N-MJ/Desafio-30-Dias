// ===============================
// CLOCK MODULE
// ===============================

const Clock = (() => {
  // Seletores (centralizado = boa prática)
  const elements = {
    time: document.getElementById('time'),
    date: document.getElementById('date')
  };

  // Formatar números (ex: 9 -> 09)
  const formatNumber = (num) => String(num).padStart(2, '0');

  // Formatar horário
  const getTime = (date) => {
    const hours = formatNumber(date.getHours());
    const minutes = formatNumber(date.getMinutes());
    const seconds = formatNumber(date.getSeconds());

    return `${hours}:${minutes}:${seconds}`;
  };

  // Formatar data (pt-BR)
  const getDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Atualizar DOM
  const update = () => {
    const now = new Date();

    elements.time.textContent = getTime(now);
    elements.date.textContent = getDate(now);

    // Atualiza atributo semântico <time>
    elements.time.setAttribute('datetime', now.toISOString());
  };

  // Inicializar relógio
  const init = () => {
    update(); // roda imediatamente
    setInterval(update, 1000); // atualiza a cada 1s
  };

  // API pública
  return {
    init
  };
})();

// ===============================
// INIT APP
// ===============================
document.addEventListener('DOMContentLoaded', Clock.init);