module("TDDStateTracker",{
	setup: function() {
		testElement = $("#test-tddtracker");
        testStore = {};
		tracker = new TDDStateTracker(testElement,mockCheck,testStore);
	}
});
test("create tdd state tracker", function() {
    expect(0);
});

function mockCheck () {
	return this.mockResult;
};

test("Get current state", function() {
    tracker.mockResult=true;
    equal(tracker.initState(),TDDStates["test"],"If everything works, write failing unit test next");
    tracker.mockResult=false;
    equal(tracker.initState(),TDDStates["implement"],"If it doesn't, fix unit tests.");
});

test("test - implement - refactor -cycle", function() {
	tracker.mockResult=true;
	equal(tracker.initState(),TDDStates["test"],"init state to test state");
	tracker.mockResult=false; 
	equal(tracker.update(),TDDStates["implement"],"Test fails -> implement state");
	tracker.mockResult=true;
	equal(tracker.update(),TDDStates["refactor"], "Test succeeds -> refactor state");
	equal(tracker.update(),TDDStates["test"], "Tests still succeed -> back to test state");
});

test("initState also updates element", function() {
	tracker.mockResult=true;
	equal(tracker.initState(),TDDStates["test"],"init state to test state");
	var dummy = $("<div/>");
	dummy.css("background-color",TDDStates["test"].color);
	equal(testElement.css("background-color"),dummy.css("background-color"),"Test element background color is state color");
	equal(testElement.html(),TDDStates["test"].desc,"Test element contents is state description");
});

test("update state also updates element", function() {
	tracker.mockResult=true;
	equal(tracker.initState(),TDDStates["test"],"init state to test state");
	var dummy = $("<div/>");
	dummy.css("background-color",TDDStates["test"].color);
	equal(testElement.css("background-color"),dummy.css("background-color"),"Test element background color is state color");
	equal(testElement.html(),TDDStates["test"].desc,"Test element contents is state description");
	tracker.mockResult=false;
	equal(tracker.update(),TDDStates["implement"],"test fails -> implement state");
	dummy.css("background-color",TDDStates["implement"].color);
	equal(testElement.css("background-color"),dummy.css("background-color"),"Test element background color is state color");
	equal(testElement.html(),TDDStates["implement"].desc,"Test element contents is state description");
});
test("state is loaded from store", function() {
   testStore.TDDState="refactor";
   tracker.mockResult=true;
   equal(tracker.initState(),TDDStates["refactor"],"initState loads from store"); 
});
test("state is stored to store after update",function () {
    tracker.mockResult=false;
    equal(tracker.initState(), TDDStates["implement"], "initState set current state to implement since tests fail.");
    tracker.mockResult=true;
    equal(tracker.update(), TDDStates["refactor"], "Next state is refactor");
    equal(testStore.TDDState,"refactor", "New state is stored to store"); 
});