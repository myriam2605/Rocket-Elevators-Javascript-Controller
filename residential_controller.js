class Column {
    constructor(_id, _amountOfFloors, _amountOfElevators) {
        console.log(_id);
    }
}

class Elevator {
    constructor(_id, _amountOfFloors) {}
}

class CallButton {
    constructor(_id, _floor, _direction) {}
}

class FloorRequestButton {
    constructor(_id, _floor) {}
}

class Door {
    constructor(_id) {}
}

module.exports = { Column, Elevator, CallButton, FloorRequestButton, Door };
