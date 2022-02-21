class Column {
    constructor(_id, _amountOfFloors, _amountOfElevators) {
        this.id = id;
        this.amountOfFloors = _amountOfFloors;
        this.amountOfElevators = _amountOfElevators;
    }
}

class Elevator {
    constructor(_id, _amountOfFloors) {
        this.id = id;
        this.amountOfFloors = amountOfFloors;
    }
}

class CallButton {
    constructor(_id, _floor, _direction) {
        this.id = _id;
        this.floor = _floor;
        this.direction = _direction;
    }
}

class FloorRequestButton {
    constructor(_id, _floor) {
        this.id = _id;
        this.floor = _floor;
    }
}

class Door {
    constructor(_id) {
        this.id = _id;
    }
}

// var Column = new Column(1, 10, 2);
// console.log(Column);

module.exports = { Column, Elevator, CallButton, FloorRequestButton, Door };
