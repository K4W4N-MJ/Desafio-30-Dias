const numero = document.querySelector('#numero');
const somar = document.querySelector('#mais');
const menos = document.querySelector('#menos');
const reset = document.querySelector('#reset');
let zero = 0;
let intervalo = null


function somarr() {
    numero.innerHTML = ++zero
    if (zero < 0) {
        numero.classList.add('vermelho')
    } else {
        numero.classList.remove('vermelho')
    }
}

function diminuirr() {
    numero.innerHTML = --zero
    if (zero < 0) {
        numero.classList.add('vermelho')
    } else {
        numero.classList.remove('vermelho')
    }
}

somar.addEventListener('click', somarr);
somar.addEventListener('mousedown', () => {
    intervalo = setInterval(somarr, 100)
})
somar.addEventListener('mouseup', () => {
    clearInterval(intervalo)
})

menos.addEventListener('click', diminuirr);
menos.addEventListener('mousedown', () => {
    intervalo = setInterval(diminuirr, 100)
})
menos.addEventListener('mouseup', () => {
    clearInterval(intervalo)
})

reset.addEventListener('click', (e) => {
    e.preventDefault()
    numero.innerHTML = 0
    zero = 0
})

    
//Melhor forma pra fazer
/*
function atualizar(valor) {
    zero += valor
    numero.innerHTML = zero

    if (zero < 0) {
        numero.classList.add('vermelho')
    } else {
        numero.classList.remove('vermelho')
    }
}
somar.addEventListener('click', () => atualizar(1))
menos.addEventListener('click', () => atualizar(-1))


*/



























// somar.addEventListener('click', (e) => {
//         e.preventDefault()
//         numero.innerHTML = ++zero
//         if (zero < 0) {
//             numero.classList.add('vermelho')
//         } else {
//             numero.classList.remove('vermelho')
//         }
//     })
    
//     menos.addEventListener('click', (e) => {
//         e.preventDefault()
//         numero.innerHTML = --zero
//         if (zero < 0) {
//             numero.classList.add('vermelho')
//         } else {
//             numero.classList.remove('vermelho')
//         }
//     })