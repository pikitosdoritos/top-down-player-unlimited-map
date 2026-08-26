const mapState = {}
const playerCoords = [0, 0]
const cellSize = 50
const probability = 0.1

showMap()

function showMap() {
    const { colCount, rowCount } = calculateDimensions()
    const visibleAreaData = getVisibleArea(colCount, rowCount)

    renderBoard(visibleAreaData)
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

function renderBoard(visibleAreaData) {
    const table = document.querySelector('table')
    let html = ''

    for (const row of visibleAreaData) {
        html += '<tr>'

        for (const cell of row) {
            html += `<td ${cell ? 'class="block"' : ''}></td>`
        }
        html += '</tr>'
    }

    table.innerHTML = html
}