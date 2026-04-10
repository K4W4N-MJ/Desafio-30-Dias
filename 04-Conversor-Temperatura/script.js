const inputTemp = document.getElementById('temp')
const tipo = document.getElementById('tipo')
const botao = document.getElementById('btn')
const resultado = document.getElementById('resultado')

// função principal
function converterTemperatura() {
    const valor = inputTemp.value
    const tipoSelecionado = tipo.value
    const valorNumero = Number(valor)

    // validação
    if (!valor || isNaN(valorNumero)) {
        resultado.innerText = '⚠️ Digite um número válido'
        return
    }

    let resultadoFinal

    if (tipoSelecionado === 'c-f') {
        resultadoFinal = (valorNumero * 9/5) + 32
        resultado.innerText = `${valorNumero}°C = ${resultadoFinal.toFixed(2)}°F`
    } else {
        resultadoFinal = (valorNumero - 32) * 5/9
        resultado.innerText = `${valorNumero}°F = ${resultadoFinal.toFixed(2)}°C`
    }
}

// clique no botão
botao.addEventListener('click', converterTemperatura)

// ENTER também converte (nível a mais 🔥)
inputTemp.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        converterTemperatura()
    }
})