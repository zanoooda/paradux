import { Game, Grid } from './game.js';

const colors = ['red', 'blue'];

function getPoint(cell, size) { // TODO: Fix distance
    cell.push(-cell[1] - cell[0]);
    let distance = size / 12;
    let x = (size / 2) + (distance * Math.sqrt(3) * (cell[0] + cell[2] / 2));
    let y = (size / 2) + (distance * 3 / 2 * cell[2]);
    return [x, y];
}
function getSize(container) {
    let containerRect = container.getBoundingClientRect();
    return Math.min(containerRect.width, containerRect.height);
}
function createCanvas(size) {
    let canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    return canvas;
}
function canvasClick(event, canvas, game) { // TODO: Implement
    let point = [
        event.pageX - canvas.offsetLeft - canvas.clientLeft, 
        event.pageY - canvas.offsetTop - canvas.clientTop
    ];
    console.log(`${point[0]}, ${point[1]}`);
}
function getCells(game) {
    return Grid.cells.map(cell => {
        let itemsIndex = game.findItem(cell);
        if(itemsIndex != -1) {
            let itemIndex = itemsIndex == -1 ? itemsIndex : game.findItemIndex(cell, itemsIndex);
            return [...cell, itemsIndex, itemIndex];
        }
        return cell;
    });
    
}
function showCells(cells, context, size, cellRadius) {
    for (const cell of cells) {
        showCell(cell, context, size, cellRadius);
    }
}
function showCell(cell, context, size, cellRadius) {
    let point = getPoint([cell[0], cell[1]], size);
    context.beginPath();
    context.arc(...point, cellRadius, 0, 2 * Math.PI);
    context.closePath();
    if (typeof cell[2] !== 'undefined') {
        context.fillStyle = colors[cell[2]];
        context.fill();
    } else {
        context.strokeStyle = 'lightgray'
        context.stroke();
    }
    context.fillStyle = 'black';
    context.font = '10px Arial';
    context.fillText(`${cell[0]}, ${cell[1]}, ${-cell[0] - cell[1]}`, ...point);
    if(typeof cell[3] !== 'undefined') {
        context.fillText(`id: ${cell[3]}`, point[0], point[1] + 12);
    }
}
function getPairs(game) {

}
function showPairs(pairs, context, size) {

}
function showPair(pair, context, size) {
    
}
class Paradox {
    constructor(container) {
        this.container = container;
    }
    playHotSeat() {
        this.game = new Game();
        this.size = getSize(this.container);
        this.cellRadius = this.size / 18;
        this.canvas = createCanvas(this.size);
        this.context = this.canvas.getContext('2d');
        this.canvas.addEventListener('click', (event) => canvasClick(event, this.canvas, this.game), false);
        this.container.innerHTML = '';
        this.container.prepend(this.canvas);
        showCells(getCells(this.game), this.context, this.size, this.cellRadius);
        showPairs(getPairs(this.game), this.context, this.size);
    }
    playWithRobot(playerColor) { // TODO: Implement
    }
    playOnline() { // TODO: Implement
    }
}

export default Paradox;