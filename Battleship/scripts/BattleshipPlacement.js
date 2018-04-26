// Александр Лукин, 26.04.2018.

// Алгоритм случайной расстановки кораблей на поле
class BattleshipPlacement {
    constructor(width = 10, height = 10) {
        this.field = new Field(width, height);
        this.svg = new FieldSVG(document.getElementById("field"), this.field);

        let quadDeckShips = 0, tripleDeckShips = 0, doubleDeckShips = 0, singleDeckShips = 0;

        while(quadDeckShips < 1) {
            if(this.field.putShip(Math.floor(Math.random() * this.field._width), Math.floor(Math.random() * this.field._height), 4, this.randomBoolean())) {
                quadDeckShips++;
            }
        }

        while(tripleDeckShips < 2) {
            if(this.field.putShip(Math.floor(Math.random() * this.field._width), Math.floor(Math.random() * this.field._height), 3, this.randomBoolean())) {
                tripleDeckShips++;
            }
        }

        while(doubleDeckShips < 3) {
            if(this.field.putShip(Math.floor(Math.random() * this.field._width), Math.floor(Math.random() * this.field._height), 2, this.randomBoolean())) {
                doubleDeckShips++;
            }
        }

        while(singleDeckShips < 4) {
            if(this.field.putShip(Math.floor(Math.random() * this.field._width), Math.floor(Math.random() * this.field._height), 1, false)) {
                singleDeckShips++;
            }
        }

        this.svg.updateSVG();
    }

    // Случайное булевое значение
    randomBoolean() {
        if(Math.round(Math.random()) === 1) {
            return true;
        } else {
            return false;
        }
    }
}

// Создание игрового поля при загрузке страницы
window.onload = function() {
    new BattleshipPlacement();
}