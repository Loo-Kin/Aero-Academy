// Александр Лукин, 26.04.2018.

// Состояния клеток: "Свободно", "Занято кораблём", "Соседняя с кораблём"
const STATES = ["free", "ship", "near ship"];

// Игровое поле
class Field {
    constructor(width, height) {
        this._width = width;
        this._height = height;
        this._cells = new Array(this._width);
        for(let i = 0; i < this._width; i++) {
            this._cells[i] = new Array(this._height);
            for(let j = 0; j < this._height; j++) {
                this._cells[i][j] = new Cell();
            }
        }
    }

    // Размещает корабль на игровом поле с координатой левой верхней клетки корабля и указанным направлением
    putShip(x, y, decks = 1, isVertical = false) {
        for(let i = 0, j = 0; i < decks && j < decks; isVertical ? i++ : j++) {
            if(!(this.isInsideField(x + i, y + j) && this._cells[x + i][y + j].state === STATES[0])) {
                return false;
            }
        }
        for(let i = 0, j = 0; i < decks && j < decks; isVertical ? i++ : j++) {
            this.putShipCell(x + i, y + j);
        }
        for(let i = 0, j = 0; i < decks && j < decks; isVertical ? i++ : j++) {
            this.putNearShipCells(x + i, y + j);
        }
        return true;
    }

    // Отмечает клетку с координатами (x, y) как занятую кораблём
    putShipCell(x, y) {
        this._cells[x][y].state = STATES[1];
    }

    // Отмечает клетку с координатами (x, y) и всех её соседей как клетки соседние с кораблём
    putNearShipCells(x, y) {
        for(let i = -1; i <= 1; i++) {
            for(let j = -1; j <= 1; j++) {
                if(this.isInsideField(x + i, y + j)) {
                    if(this._cells[x + i][y + j].state === STATES[0]) {
                        this._cells[x + i][y + j].state = STATES[2];
                    }
                }
            }
        }
    }

    // Находится ли клетка с указанными координатами внутри поля
    isInsideField(x, y) {
        if(x >= 0 && x < this._width && y >= 0 && y < this._height) {
            return true;
        } else {
            return false;
        }
    }
}

// Клетка
class Cell {
    constructor() {
        this._state = STATES[0];
    }

    get state() {
        return this._state;
    }

    set state(value) {
        this._state = value;
    }
}