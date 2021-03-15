const startGame = document.getElementById('startGame')
const gameWrapper = document.getElementById('wrapper')
const gameTime = document.getElementById('game-time')
const timeHeader = document.getElementById('time-header')
const time = document.getElementById('time')
const arrRandom = []
const COUNT_GREEN_ELEMENTS = 10

let squareGreen = 0
let isGameStarted = false

const findCells = () => {
    setGameTime()
    isGameStarted = true
    startGame.setAttribute('disabled', 'true')
    gameTime.setAttribute('disabled', 'true')

    let interval = setInterval(function () {
        let timeGame = parseFloat(time.textContent)

        if (timeGame <= 0) {
            clearInterval(interval)
            alert('Вы проиграли')
            startGame.removeAttribute('disabled')
            gameTime.removeAttribute('disabled')
            isGameStarted = false
        } else {
            time.textContent = (timeGame - 1).toString()
        }
    }, 1000)
}

startGame.addEventListener('click', findCells)

const setGameTime = () => {
    let timeValue = +gameTime.value * 60

    time.textContent = timeValue.toString()
}

gameTime.addEventListener('input', setGameTime)

const getRandom = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min + 1)) + min
}

while (arrRandom.length < COUNT_GREEN_ELEMENTS) {
    const randomCells = getRandom(1, 100)

    if (arrRandom.indexOf(randomCells) === -1) {
        arrRandom.push(randomCells)
    }
}

const cellClick = (e) => {
    if (!isGameStarted) {
        return
    }

    const targetDiv = e.target

    if (arrRandom.includes(+targetDiv.innerHTML)) {
        targetDiv.style.backgroundColor = 'green'
        squareGreen++
    } else {
        targetDiv.style.backgroundColor = 'red'
    }

    if (squareGreen === COUNT_GREEN_ELEMENTS) {
        setTimeout(() => {
            alert('Вы победили!')
            document.location.reload()
        }, 1)
    }
}

const generateGameField = () => {
    for (let i = 1; i < 101; i++) {
        let div = document.createElement('div')
        div.className = 'item'
        div.innerHTML = i.toString()
        gameWrapper.append(div)

        div.addEventListener('click', cellClick)
    }
}

generateGameField()

console.log(arrRandom)
