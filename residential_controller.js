const { isNull } = require("lodash");

class Column {
    constructor(id, amountOfFloors, amountOfElevators) {
        this.ID = id;
        this.status = "online"; // online
        this.elevatorList = [];
        this.callButtonList = [];
        this.createElevators(amountOfFloors, amountOfElevators);
        this.createCallButtons(amountOfFloors);
    }

    createCallButtons(amountOfFloors) {
        var buttonFloor = 1;
        let callbuttonID = 1;

        for (let i = 1; i <= amountOfFloors; i++) {
            if (buttonFloor < amountOfFloors) {
                //If it's not the last floor
                //If it's not the last floor
                var callButton = new CallButton(callbuttonID, "OFF", buttonFloor, "Up");
                this.callButtonList.push(callButton);
                callbuttonID++;
            }

            if (buttonFloor > 1) {
                //If it's not the first floor
                var callButton = new CallButton(callbuttonID, "OFF", buttonFloor, "Down");
                this.callButtonList.push(callButton);
                callbuttonID++;
            }
            buttonFloor++;
        }
    }

    createElevators(amountOfFloors, amountOfElevators) {
        for (let i = 0; i < amountOfElevators; i++) {
            let elevatorID = i + 1;
            let elevator = new Elevator(elevatorID, amountOfFloors);
            this.elevatorList.push(elevator);
        }
    }

    //Simulate when a user press a button outside the elevator
    requestElevator(floor, direction) {
        let elevator = this.findElevator(floor, direction);
        elevator.floorRequestList.push(floor);
        elevator.move();
        elevator.operateDoors();
        return elevator;
    }

    //We use a score system depending on the current elevators state. Since the bestScore and the referenceGap are
    //higher values than what could be possibly calculated, the first elevator will always become the default bestElevator,
    //before being compared with to other elevators. If two elevators get the same score, the nearest one is prioritized.
    findElevator(requestedFloor, requestedDirection) {
        let bestScore = 5;
        let referenceGap = 10000000;
        let bestElevator;
        let bestElevatorInformations;

        for (let i = 0; i < this.elevatorList.length; i++) {
            //The elevator is at my floor and going in the direction I want
            if (
                requestedFloor == this.elevatorList[i].currentFloor &&
                this.elevatorList[i].status == "idle" &&
                requestedDirection == this.elevatorList[i].direction
            ) {
                bestElevatorInformations = this.checkIfElevatorIsBetter(
                    1,
                    this.elevatorList[i],
                    bestScore,
                    referenceGap,
                    bestElevator,
                    requestedFloor
                );
                //The elevator is lower than me, is coming up and I want to go up
            } else if (
                requestedFloor > this.elevatorList[i].currentFloor &&
                this.elevatorList[i].status == "up" &&
                requestedDirection == this.elevatorList[i].direction
            ) {
                bestElevatorInformations = this.checkIfElevatorIsBetter(
                    2,
                    this.elevatorList[i],
                    bestScore,
                    referenceGap,
                    bestElevator,
                    requestedFloor
                );
            } else if (
                //The elevator is higher than me, is coming down and I want to go down
                requestedFloor < this.elevatorList[i].currentFloor &&
                this.elevatorList[i].status == "down" &&
                requestedDirection == this.elevatorList[i].direction
            ) {
                bestElevatorInformations = this.checkIfElevatorIsBetter(
                    2,
                    this.elevatorList[i],
                    bestScore,
                    referenceGap,
                    bestElevator,
                    requestedFloor
                );
                //The elevator is idle
            } else if (this.elevatorList[i].status == "idle") {
                bestElevatorInformations = this.checkIfElevatorIsBetter(
                    3,
                    this.elevatorList[i],
                    bestScore,
                    referenceGap,
                    bestElevator,
                    requestedFloor
                );
                //The elevator is not available, but still could take the call if nothing better is found
            } else {
                bestElevatorInformations = this.checkIfElevatorIsBetter(
                    4,
                    this.elevatorList[i],
                    bestScore,
                    referenceGap,
                    bestElevator,
                    requestedFloor
                );
            }
            bestElevator = bestElevatorInformations.bestElevator;
            bestScore = bestElevatorInformations.bestScore;
            referenceGap = bestElevatorInformations.referenceGap;
        }

        return bestElevator;
    }

    checkIfElevatorIsBetter(scoreToCheck, newElevator, bestScore, referenceGap, bestElevator, floor) {
        if (scoreToCheck < bestScore) {
            bestScore = scoreToCheck;
            bestElevator = newElevator;
            referenceGap = Math.abs(newElevator.currentFloor - floor);
        } else if (bestScore == scoreToCheck) {
            let gap = Math.abs(newElevator.currentFloor - floor);
            if (referenceGap > gap) {
                bestElevator = newElevator;
                referenceGap = gap;
            }
        }
        return {
            bestElevator,
            bestScore,
            referenceGap,
        };
    }
}

class Elevator {
    constructor(id, amountOfFloors) {
        this.ID = id;
        this.status = "idle";
        this.currentFloor = 1;
        this.door = new Door();
        this.floorRequestButtonList = [];
        this.floorRequestList = [];
        this.screenDisplay;

        this.createFloorRequestButtons(amountOfFloors);
    }

    createFloorRequestButtons(amountOfFloors) {
        let buttonFloor = 1;
        for (let i = 0; i < amountOfFloors; i++) {
            let floorRequestButton = new FloorRequestButton(buttonFloor, buttonFloor);
            this.floorRequestButtonList.push(floorRequestButton);
            buttonFloor++;
        }
    }

    //Simulate when a user press a button inside the elevator
    requestFloor(floor) {
        this.floorRequestList.push(floor);
        this.move();
        this.operateDoors();
    }

    move() {
        while (this.floorRequestList.length != 0) {
            let destination = this.floorRequestList[0];
            this.status = "moving";
            if (this.currentFloor < destination) {
                this.direction = "up";
                this.sortFloorList();

                while (this.currentFloor < destination) {
                    this.currentFloor++;
                    this.screenDisplay = this.currentFloor;
                    // console.log("elevator going up", this.currentFloor);
                }
            } else if (this.currentFloor > destination) {
                this.direction = "down";
                this.sortFloorList();
                while (this.currentFloor > destination) {
                    this.currentFloor--;
                    this.screenDisplay = this.currentFloor;
                    // console.log("elevator going down", this.currentFloor);
                }
            }

            this.status = "stopped";
            this.floorRequestList.shift();
            // console.log("elevator stopped", this.currentFloor);
        }
        this.status = "idle";
    }

    sortFloorList() {
        if ((this.direction = "up")) {
            this.floorRequestList.sort();
        } else {
            this.floorRequestList.reverse();
        }
        return this.floorRequestList;
    }

    operateDoors() {
        this.door.status = "opened";
        this.door.status = "closed";
    }
}

class CallButton {
    constructor(id, floor, direction) {
        this.ID = id;
        this.status = "on"; //"on, off"
        this.floor = floor;
        this.direction = direction; //"up, down"
    }
}

class FloorRequestButton {
    constructor(id, floor) {
        this.ID = id;
        this.status = "OFF";
        this.floor = floor;
    }
}

class Door {
    constructor(id, status) {
        this.ID = id;
        this.status = status; //"opened, closed";
    }
}

// var column = new Column(1, 10, 2);
// column.elevatorList[0].currentFloor = 2;
// column.elevatorList[0].status = "idle";
// column.elevatorList[1].currentFloor = 6;
// column.elevatorList[1].status = "idle";
// let bestElevator = column.requestElevator(3, "up");
// bestElevator.requestFloor(7);
// console.log(column);

module.exports = { Column, Elevator, CallButton, FloorRequestButton, Door };
