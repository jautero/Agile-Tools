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
    tracker.initState();
    equal(tracker.currentState,"test","If everything works, write failing unit test next");
    tracker.mockResult=false;
    tracker.initState();
    equal(tracker.currentState,"implement","If it doesn't, fix unit tests.");
});

function checkTDDState(testtracker, trackerelement, expectedstatename) {
    var expectedState = TDDStates[expectedstatename];
    equal(testtracker.currentState,expectedstatename,"tracker.currentState should be " + expectedstatename);
    ok(trackerelement.hasClass(expectedState.className),"tracker should update element class to " + expectedState.className);
    equal(trackerelement.html(),expectedState.desc,"tracker should update element content to \"" + expectedState.desc+"\".");
};

test("test - implement - refactor -cycle", function() {
	tracker.mockResult=true;
    tracker.initState();
    checkTDDState(tracker,testElement,"test");
	tracker.mockResult=false; 
    tracker.update();
    checkTDDState(tracker,testElement,"implement");
	tracker.mockResult=true;
    tracker.update();
    checkTDDState(tracker,testElement,"refactor");
    tracker.update();
    checkTDDState(tracker,testElement,"test");
});

test("state is loaded from store", function() {
   testStore.TDDState="refactor";
   tracker.mockResult=true;
   tracker.initState();
   checkTDDState(tracker,testElement,"refactor");
});
test("state is stored to store after update",function () {
    tracker.mockResult=false;
    tracker.initState();
    checkTDDState(tracker,testElement,"implement");
    tracker.mockResult=true;
    tracker.update();
    checkTDDState(tracker,testElement,"refactor");
    equal(testStore.TDDState,"refactor", "New state is stored to store"); 
});
