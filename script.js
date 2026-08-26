let playerCoords = [0, 0]

const moves = {
    ArrowUp: [0, -1],
    ArrowRight: [1, 0],
    ArrowDown: [0, 1],
    ArrowLeft: [-1, 0],
}
const mapState = {
    '0, 0': false
}
const cellSize = 50
const probability = 0.5

showMap()
onkeydown = handleKeys

function handleKeys(e) {
    const key = e.key
    const targetCoords = [playerCoords[0] + moves[key][0], playerCoords[1] + moves[key][1]]
    const empty = !mapState[`${targetCoords[0]}, ${targetCoords[1]}`]

    if (key in moves && empty) {
        playerCoords = targetCoords
    }

    showMap()
}

function showMap() {
    const { colCount, rowCount } = calculateDimensions()
    const visibleAreaData = getVisibleArea(colCount, rowCount)

    renderMap(visibleAreaData)
}

function calculateDimensions() {
    const colCount = Math.floor(innerWidth / cellSize)
    const rowCount = Math.floor(innerHeight / cellSize)

    return { colCount, rowCount }
}

function getVisibleArea(colCount, rowCount) {
    const data = []

    const xMax = playerCoords[0] + Math.floor(colCount / 2)
    const xMin = xMax - colCount
    const yMax = playerCoords[1] + Math.floor(rowCount / 2)
    const yMin = yMax - rowCount

    for (let y = yMin; y < yMax; y++) {
        const row = []

        for (let x = xMin; x < xMax; x++) {
            if (x == playerCoords[0] && y == playerCoords[1]) {
                row.push(null)
                continue
            }

            cell = mapState[`${x}, ${y}`]

            if (cell === undefined) {
                cell = Math.random() < probability

                mapState[`${x}, ${y}`] = cell
            }

            row.push(cell)
        }

        data.push(row)
    }

    return data
}

function renderMap(visibleAreaData) {
    const table = document.querySelector('table')
    let html = ''

    for (const row of visibleAreaData) {
        html += '<tr>'

        for (const cell of row) {
            html += `<td ${cell ? 'class="block"' : ''}>${cell === null ? '<img src="images/pixel_hero.png">' : ''
                }</td>`
        }
        html += '</tr>'
    }

    table.innerHTML = html
}