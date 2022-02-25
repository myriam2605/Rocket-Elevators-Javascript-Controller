This is the template to use for the javascript residential controller. You will find the classes that should be used along with some methods.
The necessary files to run some tests are also present. With Node JS and NPM installed, first run:

`npm install`

and then, to run the tests:

`npm test`

With a fully completed project, you should get an output like:

![Screenshot from 2021-06-10 16-31-36](https://user-images.githubusercontent.com/28630658/121592985-5edd2600-ca09-11eb-9ff0-38215b74c67c.png)

you can also use a new terminal with node .\residential_controller.js to execute my Scenario
'==================================Scenario 1=================================================
SET column TO NEW Column WITH 1 AND online AND 10 AND 2 '//id, status, amountOfFloors, amountOfElevators
SET first elevator floor OF column elevatorsList TO 2
SET second elevator floor OF column elevatorsList TO 6

SET elevator TO CALL column requestElevator WITH 3 AND Up RETURNING elevator
CALL elevator requestFloor WITH 7
'==================================End Scenario 1=============================================

the result will be explain in the video link :
