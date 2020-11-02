import { Game, Grid } from './game.js';

const colors = ['red', 'blue'];

function getPoint(cell, size) { // TODO: Fix distance
    let cell2 = -cell[1] - cell[0];
    let distance = size / 12;
    let x = (size / 2) + (distance * Math.sqrt(3) * (cell[0] + cell2 / 2));
    let y = (size / 2) + (distance * 3 / 2 * cell2);
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
function getCells(game, size) {
    return Grid.cells.map(cell => {
        cell.push(...getPoint([cell[0], cell[1]], size));
        let itemsIndex = game.findItem(cell);
        if (itemsIndex != -1) {
            let itemIndex = itemsIndex == -1 ? itemsIndex : game.findItemIndex(cell, itemsIndex);
            return [...cell, itemsIndex, itemIndex];
        }
        return cell;
    });

}
function showCells(cells, context, cellRadius) {
    for (const cell of cells) {
        showCell(cell, context, cellRadius);
    }
}
function showCell(cell, context, cellRadius) {
    let point = [cell[2], cell[3]];
    context.beginPath();
    context.arc(...point, cellRadius, 0, 2 * Math.PI);
    context.closePath();
    if (typeof cell[4] !== 'undefined') {
        context.fillStyle = colors[cell[4]];
        context.fill();
    } else {
        context.strokeStyle = 'lightgray'
        context.stroke();
    }
    context.fillStyle = 'black';
    context.font = '10px Arial';
    context.fillText(`${cell[0]}, ${cell[1]}, ${-cell[0] - cell[1]}`, ...point);
    if (typeof cell[5] !== 'undefined') {
        context.fillText(`id: ${cell[5]}`, point[0], point[1] + 12);
    }
}
function getPairs(game, size) { // TODO: Implement // !!! game.items attach item[2] /:
    //let cell = [game.items[0][pair[0]], game.items[1][pair[1]]];
    let res = game.pairs.map((pair) => {
        let c0 = game.items[0][pair[0]];
        let p0 = getPoint(c0, size);
        return [pair[0], pair[1], ...p0];
    });
    return res;
}
function showPairs(pairs, context, clickRadius) { // TODO: Implement
    for (const pair of pairs) {
        showPair(pair, context, clickRadius);
    }
}
function showPair(pair, context, clickRadius) { // TODO: Implement
    console.log(`${pair[0]}, ${pair[1]}, ${pair[2]}, ${pair[3]}`)
    // ...
}
class Paradox {
    constructor(container) {
        this.container = container;
    }
    playHotSeat() {
        this.game = new Game();
        this.size = getSize(this.container);
        this.clickRadius = this.size / 20;
        this.cellRadius = this.size / 18;
        this.canvas = createCanvas(this.size);
        this.context = this.canvas.getContext('2d');
        this.canvas.addEventListener('click', (event) => canvasClick(event, this.canvas, this.game), false);
        this.container.innerHTML = '';
        this.container.prepend(this.canvas);
        this.game.state = new State(this.game, this.size);
        showCells(this.game.state.cells, this.context, this.cellRadius);
        showPairs(this.game.state.pairs, this.context, this.clickRadius);
    }
    playWithRobot(playerColor) { // TODO: Implement
    }
    playOnline() { // TODO: Implement
    }
}
class State {
    constructor(game, size) {
        this.cells = getCells(game, size);
        this.pairs = getPairs(game, size);
    }
}

export default Paradox;