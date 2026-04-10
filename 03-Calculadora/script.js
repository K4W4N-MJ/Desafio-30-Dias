class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement
        this.currentOperandElement = currentOperandElement
        this.clear()
    }

    clear() {
        this.currentOperand = '0'
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        if (this.currentOperand === '0') return
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0'
        } else {
            this.currentOperand = this.currentOperand.slice(0, -1)
        }
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number
        } else {
            this.currentOperand += number
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        
        if (isNaN(prev) || isNaN(current)) return
        
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                if (current === 0) {
                    alert('Erro: Divisão por zero!')
                    this.clear()
                    return
                }
                computation = prev / current
                break
            default:
                return
        }
        
        this.currentOperand = computation.toString()
        this.operation = undefined
        this.previousOperand = ''
    }

    computePercentage() {
        const current = parseFloat(this.currentOperand)
        if (isNaN(current)) return
        this.currentOperand = (current / 100).toString()
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.currentOperand
        if (this.operation != null) {
            this.previousOperandElement.innerText = 
                `${this.previousOperand} ${this.operation}`
        } else {
            this.previousOperandElement.innerText = ''
        }
    }
}

// Inicialização
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.querySelector('[data-action="equals"]')
const deleteButton = document.querySelector('[data-action="delete"]')
const allClearButton = document.querySelector('[data-action="clear"]')
const percentButton = document.querySelector('[data-action="percent"]')
const previousOperandElement = document.getElementById('previousOperand')
const currentOperandElement = document.getElementById('currentOperand')

const calculator = new Calculator(previousOperandElement, currentOperandElement)

// Event Listeners
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.dataset.operator)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

percentButton.addEventListener('click', () => {
    calculator.computePercentage()
    calculator.updateDisplay()
})

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        calculator.appendNumber(e.key)
        calculator.updateDisplay()
    }
    if (e.key === '.') {
        calculator.appendNumber('.')
        calculator.updateDisplay()
    }
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        let operator = e.key === '*' ? '*' : e.key === '/' ? '/' : e.key
        calculator.chooseOperation(operator)
        calculator.updateDisplay()
    }
    if (e.key === 'Enter' || e.key === '=') {
        calculator.compute()
        calculator.updateDisplay()
    }
    if (e.key === 'Escape') {
        calculator.clear()
        calculator.updateDisplay()
    }
    if (e.key === 'Backspace') {
        calculator.delete()
        calculator.updateDisplay()
    }
    if (e.key === '%') {
        calculator.computePercentage()
        calculator.updateDisplay()
    }
})