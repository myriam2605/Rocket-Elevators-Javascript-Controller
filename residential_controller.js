const { isNull } = require("lodash");

class Column {
    constructor(id, amountOfFloors, amountOfElevators) {
        this.ID = id;
        this.status = "_status"; // online
        this.elevatorList = [];
        this.callButtonList = [];
        this.createElevators(amountOfFloors, amountOfElevators);
        this.createCallButtons(amountOfFloors);

        //console.log("Elevatorlist: ", this.elevatorList);
        //console.log("callButtonList: ", this.callButtonList);
    }

    createCallButtons(amountOfFloors) {
        var buttonFloor = 1;
        let callbuttonID = 0;
        for (let i = 1; i <= amountOfFloors; i++) {
            if (buttonFloor < amountOfFloors) {
                //let callbuttonID = i + 1;
                var callButton = new CallButton(callbuttonID, "OFF", buttonFloor, "Up");
                this.callButtonList.push(callButton);
                callbuttonID++;
            }

            if (buttonFloor > 1) {
                //let callbuttonID = i + 1;
                var callButton = new CallButton(callbuttonID, "OFF", buttonFloor, "Down");
                //callbuttonID--;
                // return this.callButtonList.push(callButton);
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

    requestElevator(floor, direction) {
        let elevator = this.findElevator(floor, direction);
        console.log(elevator);
        elevator.floorRequestList.push(floor);
        elevator.move();
        elevator.operateDoors();
        return elevator;
    }

    findElevator(requestedFloor, requestedDirection) {
        let bestScore = 5;
        let referenceGap = 10000000;
        let bestElevator;
        let bestElevatorInformations;

        //this.elevatorList.forEach(function (elevator)
        for (let i = 0; i < this.elevatorList.length; i++) {
            if (
                requestedFloor == this.elevatorList[i].currentFloor &&
                this.elevatorList[i].status == "Stopped" &&
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
            } else if (
                requestedFloor > this.elevatorList[i].currentFloor &&
                this.elevatorList[i].status == "Up" &&
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
                requestedFloor < this.elevatorList[i].currentFloor &&
                this.elevatorList[i].status == "Down" &&
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
            } else if (this.elevatorList[i].status == "idle") {
                bestElevatorInformations = this.checkIfElevatorIsBetter(
                    3,
                    this.elevatorList[i],
                    bestScore,
                    referenceGap,
                    bestElevator,
                    requestedFloor
                );
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
        } else if ((bestScore = scoreToCheck)) {
            let gap = Math.abs(newElevator.currentFloor - floor);
            if (referenceGap > gap) {
                bestElevator = newElevator;
                referenceGap = gap;
            }
        }
        let bestElevatorInformations = {
            bestElevator,
            bestScore,
            referenceGap,
        };
        return bestElevatorInformations;
    }
}

class Elevator {
    constructor(id, amountOfFloors) {
        this.ID = id;
        this.status = "online";
        this.door = new Door();
        this.floorRequestButtonList = [];
        this.floorRequestList = [];

        this.createFloorRequestButtons(amountOfFloors);
        console.log(this.floorRequestButtonList);
        // console.log("floorRequestButtonList: ", this.floorRequestButtonList);
        //console.log("floorRequestList: ", this.floorRequestList);
    }

    createFloorRequestButtons(amountOfFloors) {
        let buttonFloor = 1;
        for (let i = 0; i < amountOfFloors; i++) {
            let floorRequestButton = new FloorRequestButton(buttonFloor, buttonFloor);
            this.floorRequestButtonList.push(floorRequestButton);
            buttonFloor++;
        }
    }

    requestFloor(floor) {
        floor = this.requestList();
        this.move;
        this.operateDoors();
    }

    move() {
        while (this.floorRequestList != 0) {
            let destination = this.floorRequestList[0];
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
                while (this.currentFloor > destination) {
                    this.screenDisplay = this.currentFloor;
                }
            }

            this.status = "stopped";
            this.floorRequestList.shift();
        }
        this.status = "idle";
    }

    sortFloorList() {
        console.log(this.requestList, "sortfloorlist");
        if (this.direction == "Up") {
            this.requestList.sort();
        } else {
            this.requestList.sort();
            this.requestList.reverse();
        }
    }

    operateDoors() {
        this.door.status = "opened";
        //setTimeout(operateDoors(), 5000);
        this.door.status = "closed";
    }
}

class CallButton {
    constructor(id, floor, direction) {
        this.ID = id;
        this.status = ""; //"on, off"
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
// column.requestElevator(1, "up");
// //console.log(column);

// var elevator = new Elevator(1, 10);
// console.log(elevator);

// // '==================================Scenario 1=================================================
// var column = new Column(1, 10, 2); //id, status, amountOfFloors, amountOfElevators
// console.log(column);

// // // SET first elevator floor OF column elevatorsList TO 2
// // // SET second elevator floor OF column elevatorsList TO 6

// var elevator = new Elevator(3, "Up");
// console.log(elevator);
// // CALL elevator requestFloor WITH 7
// '==================================End Scenario 1=============================================

// '==================================Scenario 2=================================================
// SET column TO NEW Column WITH 1 AND online AND 10 AND 2 '//id, status, amountOfFloors, amountOfElevators
// SET first elevator floor OF column elevatorsList TO 10
// SET second elevator floor OF column elevatorsList TO 3

// '//Part 1
// SET elevator TO CALL column requestElevator WITH 1 AND Up RETURNING elevator
// CALL elevator requestFloor WITH 6

// '//Part 2
// SET elevator TO CALL column requestElevator WITH 3 AND Up RETURNING elevator
// CALL elevator requestFloor WITH 5

// '//Part 3
// SET elevator TO CALL column requestElevator WITH 9 AND Down RETURNING elevator
// CALL elevator requestFloor WITH 2
// '==================================End Scenario 2=============================================

// '==================================Scenario 3=================================================
// SET column TO NEW Column WITH 1 AND online AND 10 AND 2 '//id, status, amountOfFloors, amountOfElevators
// SET first elevator floor OF column elevatorsList TO 10
// SET second elevator floor OF column elevatorsList TO 3
// SET second elevator status OF column elevatorsList TO moving
// ADD 6 TO second elevator floorRequestList OF column elevatorsList

// '//Part 1
// SET elevator TO CALL column requestElevator WITH 3 AND Down RETURNING elevator
// CALL elevator requestFloor WITH 2

// '//Part 2
// SET elevator TO CALL column requestElevator WITH 10 AND Down RETURNING elevator
// CALL elevator requestFloor WITH 3
// '==================================End Scenario 3=============================================

module.exports = { Column, Elevator, CallButton, FloorRequestButton, Door };
