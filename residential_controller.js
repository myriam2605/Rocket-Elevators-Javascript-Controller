class Column {
    constructor(_id, _status, _amountOfFloors, _amountOfElevators) {
        this.ID = _id;
        this.status = "online";
        this.elevatorList = [];
        this.callButtonList = [];
        this.createElevators(_amountOfFloors, _amountOfElevators);
        this.createCallButtons();
    }

    // createCallButtons(_amountOfFloors) {
    //     console.log(createCallButtons);
    //     // for (var i = 1; i <= 10; i++) {

    //     // }
    // }
    // if (buttonFloor > 1) {
    //     callButtonList.push(i); //sans les parametres
    // }
    // }

    createElevators(_amountOfFloors, _amountOfElevators) {
        for (let i = 0; i <= this.elevatorList.length; i++) {
            let elevatorID = i + 1;
            let elevator = new Elevator(elevatorID, "idle", _amountOfFloors, 1);
            return this.elevatorList.push(elevator);
        }
    }

    //  requestElevator(requestedFloor, direction) {
    //       Find the best elevator
    //       Make the elevator move to the user
    //       Operate the doors
    //         Return the chosen elevator, to be used by the elevator requestFloor method
    // }
}

class Elevator {
    constructor(_id, _amountOfFloors, _status, _currentFloor) {
        this.ID = _id;
        this.status = _status;
        this.direction = _amountOfFloors;
        this.currentFloor = _currentFloor;
        this.door = new Door(_id, "closed");
        this.floorRequestButtonList = [];
        this.floorRequestList = [];
        this.createFloorRequestButtons = _amountOfFloors;
    }
}

class CallButton {
    constructor(_id, _floor, _direction) {
        this.ID = _id;
        this.status = "on, off";
        this.floor = _floor;
        this.direction = "up, down";
    }
}

class FloorRequestButton {
    constructor(_id, _floor) {
        this.ID = _id;
        this.status = "on, off";
        this.floor = _floor;
    }
}

class Door {
    constructor(_id) {
        this.ID = _id;
        this.status = "opened, closed";
    }
}

var column = new Column(1, 10, 2);
console.log(column);

// var elevator = new Elevator(1, 10);
// console.log(elevator);

module.exports = { Column, Elevator, CallButton, FloorRequestButton, Door };
