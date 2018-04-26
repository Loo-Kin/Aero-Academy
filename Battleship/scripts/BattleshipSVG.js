// Александр Лукин, 26.04.2018.

// Визуальное представление игрового поля в формате SVG
class FieldSVG {
    constructor(field, model) {
        this._field = field;
        this._model = model;
    }

    // Очищает старое поле и заполняет заново согласно актуальному состоянию модели
    updateSVG() {
        while (this._field.firstChild) {
            this._field.removeChild(this._field.firstChild);
        }
        this._field.setAttribute("width", this._model._width * 30);
        this._field.setAttribute("height", this._model._height * 30);
        this.drawField();
    }

    // Рисует поле
    drawField() {
        this.drawBackground();
        for(let i = 0; i < this._model._width; i++) {
            for(let j = 0; j < this._model._height; j++) {
                if(this._model._cells[i][j].state === STATES[1]) {
                    this.drawShipCell(j, i);
                } else {
                    this.drawEmptyCell(j, i);
                }
            }
        }
    }

    // Рисует фон
    drawBackground() {
        let background = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        background.setAttribute("x", 0);
        background.setAttribute("y", 0);
        background.setAttribute("width", this._model._width * 30);
        background.setAttribute("height", this._model._height * 30);
        background.setAttribute("stroke", "black");
        background.setAttribute("stroke-width", "1");
        background.setAttribute("fill", "rgb(234,234,234)");
        this._field.appendChild(background);
    }

    // Рисует пустую клетку
    drawEmptyCell(x = 0, y = 0) {
        let cell = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        cell.setAttribute("x", x * 30 + 2);
        cell.setAttribute("y", y * 30 + 2);
        cell.setAttribute("width", 26);
        cell.setAttribute("height", 26);
        cell.setAttribute("stroke", "black");
        cell.setAttribute("stroke-width", "1");
        cell.setAttribute("fill", "rgb(245,245,245)");
        this._field.appendChild(cell);
    }

    // рисует клетку, занятую кораблём
    drawShipCell(x = 0, y = 0) {
        let cell = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        cell.setAttribute("x", x * 30 + 2);
        cell.setAttribute("y", y * 30 + 2);
        cell.setAttribute("width", 26);
        cell.setAttribute("height", 26);
        cell.setAttribute("stroke", "black");
        cell.setAttribute("stroke-width", "1");
        cell.setAttribute("fill", "blue");
        this._field.appendChild(cell);
    }
}