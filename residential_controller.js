class Column {
    constructor(_id, _status, _amountOfFloors, _amountOfElevators) {
        this.ID = _id;
        this.status = "online";
        this.elevatorList = [];
        this.callButtonList = [];
        this.createElevators(_amountOfFloors, _amountOfElevators);
        this.createCallButtons();
    }

    createCallButtons(_amountOfFloors) {
        let buttonFloor = 1;
        for (let i = 1; i <= 10; i++) {
            if (buttonFloor < _amountOfFloors) {
                let callbuttonID = i + 1;
                let CallButton = new this.callButtonList(callbuttonID, "OFF", buttonFloor, "Up");
            }
            if (buttonFloor > 1) {
                let callbuttonID = i + 1;
                let CallButton = new this.callButtonList(callbuttonID, "OFF", buttonFloor, "Down");
            }
        }
    }

    createElevators(_amountOfFloors, _amountOfElevators) {
        for (let i = 0; i <= this.elevatorList.length; i++) {
            let elevatorID = i + 1;
            let elevator = new Elevator(elevatorID, "idle", _amountOfFloors, 1);
            return this.elevatorList.push(elevator);
        }
    }

    requestElevator(_floor, _direction) {
        let elevator = this.findElevator(_floor, _direction);
        return this.elevatorList.push(elevator);
        elevator.move();
        elevetor.operateDoors();
        return elevator;
    }

    findElevator(requestedFloor, requestedDirection) {
        let bestScore = 5;
        let referenceGap = 10000000;
        let bestElevator;
        let bestElevatorInformations;
        let checkIfElevatorIsBetter;
        ////////////////////////////////il faut faire un forEach a la place du For
        for (; elevator < this.elevatorList; elevator++) {
            if (requestedFloor == currentFloor && _status == "Stopped" && requestedDirection == direction) {
                bestElevatorInformations = this.checkIfElevatorIsBetter(1, elevator, bestScore, referenceGap, bestElevator, requestedFloor);
                return bestElevatorInformations;
            } else if (requestedFloor > currentFloor && _status == "Up" && requestedDirection == direction) {
                bestElevatorInformations = this.checkIfElevatorIsBetter(2, elevator, bestScore, referenceGap, bestElevator, requestedFloor);
                return bestElevatorInformations;
            } else if (requestedFloor < currentFloor && _status == "Down" && requestedDirection == direction) {
                bestElevatorInformations = this.checkIfElevatorIsBetter(2, elevator, bestScore, referenceGap, bestElevator, requestedFloor);
                return bestElevatorInformations;
            } else if (_status == "idle") {
                bestElevatorInformations = this.checkIfElevatorIsBetter(3, elevator, bestScore, referenceGap, bestElevator, requestedFloor);
                return bestElevatorInformations;
            } else {
                bestElevatorInformations = this.checkIfElevatorIsBetter(4, elevator, bestScore, referenceGap, bestElevator, requestedFloor);
                return bestElevatorInformations;
            }

            let bestElevator = bestElevatorInformations;
            let bestScore = bestElevatorInformations;
            let referenceGap = bestElevatorInformations;
        }
        return bestElevator;
    }

    checkIfElevatorIsBetter(scoreToCheck, newElevator, bestScore, referenceGap, bestElevator, floor) {
        if (scoreToCheck < bestScore) {
            let bestScore = scoreToCheck;
            let bestElevator = newElevator;
            let newElevator = Math.abs(currentFloor - floor);
            let referenceGap = newElevator;
        } else if ((bestScore = scoreToCheck)) {
            let gap = newElevator;
        }
        if (referenceGap > gap) {
            let bestElevator = newElevator;
            let referenceGap = gap;
        }
        return bestElevatorInformations(bestElevator, bestScore, referenceGap);
    }
}

class Elevator {
    constructor(_id, _amountOfFloors, _status, _currentFloor) {
        this.ID = _id;
        this.status = _status;
        this.amountOfFloors = _amountOfFloors;
        this.currentFloor = _currentFloor;
        this.direction == null;
        this.door = new Door(_id, "closed");
        this.floorRequestButtonList = [];
        this.floorRequestList = [];

        this.createFloorRequestButtons = _amountOfFloors;
    }

    createFloorRequestButtons(_amountOfFloors) {
        let buttonFloor = 1;
        for (; _amountOfFloors; ) {
            let floorRequestButton = new FloorRequestButton(FloorRequestButtonID, "OFF", buttonFloor);
            floorRequestButton = this.floorButtonList;
            let floorRequestButtonID = FloorRequestButton.ID + 1;
            let buttonFloor = 1;
            buttonFloor++;
        }
    }

    requestFloor(floor) {
        floor = this.requestList();

        this.move();
        this.operateDoors();
    }

    move() {
        while (this.requestList != 0) {
            let destination = requestList[0];
            this.status = "moving";
            if (this.currentFloor < destination) {
                this.direction = "Up";
                this.sortFloorList();
                while (this.currentFloor < destination) {
                    this.currentFloor++;
                    this.screenDisplay = this.currentFloor;
                }
            } else if (this.currentFloor > destination) {
                this.direction = "Down";
                this.sortFloorList();
            }
            while (this.currentFloor > destination) {
                this.screenDisplay = this.currentFloor;
            }
            this.status = "stopped";
            this.requestList++;
        }
        this.status = "idle";
    }

    sortFloorList() {
        if (this.direction == "Up") {
            this.requestList.sort();
        } else {
            this.requestList.sort();
            this.requestList.reverse();
        }
    }

    operateDoors() {
        this.Door.status = "opened";
        setTimeout(operateDoors(), 5000);
        if ()
    }
}

class CallButton {
    constructor(_id, _status, _floor, _direction) {
        this.ID = _id;
        this.status = "on, off";
        this.floor = _floor;
        this.direction = "up, down";
    }
}

class FloorRequestButton {
    constructor(_id, _status, _floor) {
        this.ID = _id;
        this.status = "on, off";
        this.floor = _floor;
    }
}

class Door {
    constructor(_id, _status) {
        this.ID = _id;
        this.status = "opened, closed";
    }
}

var column = new Column(1, 10, 2);
console.log(column);

// var elevator = new Elevator(1, 10);
// console.log(elevator);

module.exports = { Column, Elevator, CallButton, FloorRequestButton, Door };
